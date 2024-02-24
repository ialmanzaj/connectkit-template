import "@/styles/globals.css"
import type { AppProps } from "next/app"

import { WalletProvider } from "@/components/connect-wallet"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WalletProvider>
        <Component {...pageProps} />
        <Toaster />
      </WalletProvider>
      <TailwindIndicator />
    </ThemeProvider>
  )
}
