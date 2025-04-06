import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LP NFT Locker",
  description: "Free, open-source LP NFT locker with no fees. Lock your liquidity positions securely.",
  keywords: ["Uniswap", "V3", "LP", "NFT", "Locker", "DeFi", "Liquidity", "Ethereum"],
  authors: [{ name: "LP NFT Locker Team" }],
  creator: "LP NFT Locker Team",
  publisher: "LP NFT Locker",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://freelplocker.com/",
    title: "LP NFT Locker",
    description: "A free, open-source LP NFT locker with no fees. Lock your liquidity positions securely.",
    siteName: "LP NFT Locker",
    images: [
      {
        url: "https://freelplocker.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "LP NFT Locker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LP NFT Locker",
    description: "A free, open-source LP NFT locker with no fees. Lock your liquidity positions securely.",
    images: ["https://freelplocker.com/og-image.png"],
    creator: "@lpnftlocker",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
