import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getCsrfToken } from "next-auth/react"
import { SiweMessage } from "siwe"

import { routes } from "@/config/routes"
import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      async authorize(credentials, req) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))

          const nextAuthUrl = new URL(
            process.env.NEXTAUTH_URL ||
              process.env.VERCEL_URL ||
              `https://${process.env.VERCEL_URL}`
          )

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req: { headers: req.headers } }),
          })

          if (!result.success) {
            return null
          }

          const address = siwe.address

          // Check if user exists
          let user = await db.user.findUnique({
            where: {
              address: address,
            },
          })

          // Create new user if doesn't exist
          if (!user) {
            user = await db.user.create({
              data: {
                address: address,
              },
            })
            // create account
            await db.account.create({
              data: {
                userId: user.id,
                type: "credentials",
                provider: "Ethereum",
                providerAccountId: address,
              },
            })
          }

          return {
            // Pass user id instead of address
            // id: fields.address
            id: user?.id,
            address: address,
          }
        } catch (e) {
          return null
        }
      },
      credentials: {
        message: {
          label: "Message",
          placeholder: "0x0",
          type: "text",
        },
        signature: {
          label: "Signature",
          placeholder: "0x0",
          type: "text",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.user = {
        name: token.sub,
      }
      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }

        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        address: dbUser.address,
        email: dbUser.email,
      }
    },
  },
}

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string
      name: string
      username: string
      email: string
      address: string
    }
  } | null>
}
