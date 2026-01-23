import "./globals.css"
import { Inter, Playfair_Display } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Lexassure - AI Compliance Made Clear",
  description: "Navigate the EU AI Act with confidence. Comprehensive compliance management, risk assessment, and documentation tools for AI systems.",
  keywords: ["AI compliance", "EU AI Act", "risk assessment", "AI governance", "compliance management"],
  authors: [{ name: "Lexassure" }],
  openGraph: {
    title: "Lexassure - AI Compliance Made Clear",
    description: "Navigate the EU AI Act with confidence.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
