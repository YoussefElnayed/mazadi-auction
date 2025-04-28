import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./client-layout"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "مزادي - منصة المزادات الإلكترونية",
  description: "منصة مزادات إلكترونية توفر لك الشفافية والأمان",
  generator: 'v0.dev'
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen")} suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}

