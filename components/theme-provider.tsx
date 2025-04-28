'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // After mounting, we have access to the theme
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by rendering a simple div until client-side
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <NextThemesProvider {...props} enableSystem={false} disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  )
}
