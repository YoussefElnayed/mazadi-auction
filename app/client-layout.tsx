'use client'

import React, { useEffect, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/auth-context"
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AuthProvider>
        {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
      </AuthProvider>
    </ThemeProvider>
  )
}
