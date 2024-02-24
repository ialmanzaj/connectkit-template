import { configureServerSideSIWE } from "connectkit-next-siwe"

import { db } from "@/lib/db"

export const siweServer = configureServerSideSIWE({
  session: {
    cookieName: "connectkit-siwe",
    password: process.env.SESSION_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
})
