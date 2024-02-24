"use client"

import { useRouter } from "next/navigation"
import { siweClient } from "@/utils/siweClient"
import {
  ConnectKitButton,
  ConnectKitProvider,
  SIWESession,
  getDefaultConfig,
} from "connectkit"
import { WagmiConfig, createConfig, useDisconnect } from "wagmi"
import { arbitrum, baseSepolia, mainnet, polygonMumbai } from "wagmi/chains"

const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: "Connect-kit",
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    walletConnectProjectId: process.env
      .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    chains: [baseSepolia],
  })
)

export const WalletProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <WagmiConfig config={config}>
      <SiweClientProvider>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </SiweClientProvider>
    </WagmiConfig>
  )
}

const SiweClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { disconnect } = useDisconnect()
  const router = useRouter()

  const siweClientConfig = {
    enabled: true, // defaults true
    //nonceRefetchInterval: 300_000, // in milliseconds, defaults to 5 minutes
    //sessionRefetchInterval: 300_000, // in milliseconds, defaults to 5 minutes
    signOutOnDisconnect: true, // defaults true
    signOutOnAccountChange: false, // defaults true
    onSignIn: (session?: SIWESession) => {
      console.log("signing in")
      console.log("session", session?.address)
      // Check if user exists

      // refresh to update server session
      router.refresh()
    },
    onSignOut: () => {
      console.log("signing out")
      disconnect()
      // refresh to update server session
      router.refresh()
    },
  }
  return (
    <siweClient.Provider {...siweClientConfig}>{children}</siweClient.Provider>
  )
}

export const ConnectWallet: React.FC = () => {
  return <ConnectKitButton />
}
