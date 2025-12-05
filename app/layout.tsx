import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/contexts/CartContext"
import WhatsAppSidebar from "@/components/whatsapp-sidebar"
import "./globals.css"

export const metadata: Metadata = {
  title: "Retailians-website",
  description:
    "A 360° Retail Solution by the Retailians, for the Retailers. Manage multiple operations of your business using our ERP Software.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CartProvider>
          {children}
          <WhatsAppSidebar />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  )
}
