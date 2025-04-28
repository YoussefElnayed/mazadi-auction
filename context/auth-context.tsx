'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Define user type
type User = {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

// Define auth context type
type AuthContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  error: string | null
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  error: null
})

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext)

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // Check if user is logged in on mount
  useEffect(() => {
    setMounted(true)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo purposes, we'll accept any email/password with basic validation
      if (!email || !password) {
        throw new Error('يرجى إدخال البريد الإلكتروني وكلمة المرور')
      }
      
      if (password.length < 6) {
        throw new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      }
      
      // Create mock user
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: 'user'
      }
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
      
      // Redirect to home page
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تسجيل الدخول')
    } finally {
      setIsLoading(false)
    }
  }

  // Register function
  const register = async (userData: any) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Basic validation
      if (!userData.email || !userData.fullName) {
        throw new Error('يرجى إدخال جميع البيانات المطلوبة')
      }
      
      // Create mock user
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: userData.fullName,
        email: userData.email,
        role: 'user'
      }
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(mockUser))
      setUser(mockUser)
      
      // Redirect to success page
      router.push('/auth/register/success')
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء إنشاء الحساب')
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/auth/login')
  }

  // Prevent hydration errors
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
