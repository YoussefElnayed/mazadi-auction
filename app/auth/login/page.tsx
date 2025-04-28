"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, error: authError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    setMounted(true)
    // If there's an error from the auth context, display it
    if (authError) {
      setError(authError)
    }
  }, [authError])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("") // Clear error when user types
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    // Use the login function from auth context
    try {
      await login(formData.email, formData.password)
    } catch (err: any) {
      setError(err.message || "فشل تسجيل الدخول. يرجى التحقق من بريدك الإلكتروني وكلمة المرور")
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Blue background with illustration */}
      <div
        className="w-full md:w-2/5 flex flex-col items-center justify-center p-8 min-h-[200px] md:min-h-screen relative overflow-hidden"
        style={{ backgroundColor: 'hsl(214, 100%, 50%)' }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] left-[10%] w-32 h-32 rounded-full bg-white opacity-10 animate-float-slow"></div>
          <div className="absolute top-[30%] right-[15%] w-24 h-24 rounded-full bg-white opacity-10 animate-float-medium"></div>
          <div className="absolute bottom-[20%] left-[20%] w-40 h-40 rounded-full bg-white opacity-10 animate-float-fast"></div>
          <div className="absolute bottom-[10%] right-[10%] w-20 h-20 rounded-full bg-white opacity-10 animate-float-slow"></div>
        </div>

        <div className="max-w-xs relative z-10">
          <div className="text-white text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">مرحباً بك في مزادي</h2>
            <p className="opacity-90">منصة المزادات الأولى في مصر</p>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="مزادي"
              width={300}
              height={300}
              className="mb-8 animate-pulse-slow rounded-lg shadow-xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-left mb-4">
            <Link href="/" className="text-xl font-bold">
              مزادي
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-center relative">
            تسجيل الدخول
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></span>
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mb-6 text-right animate-shake">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="text-right transform transition-all duration-300 hover:translate-y-[-2px]">
              <label htmlFor="email" className="block text-gray-600 mb-1 font-medium">
                البريد الالكتروني
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ادخل بريدك الالكتروني"
                className="text-right transition-all duration-300 focus:ring-2 focus:ring-primary/30"
                disabled={isLoading}
                required
              />
            </div>

            <div className="text-right transform transition-all duration-300 hover:translate-y-[-2px]">
              <div className="flex justify-between mb-1">
                <Link
                  href="/auth/reset-password"
                  className="text-red-600 text-sm hover:underline transition-all duration-300 hover:text-red-700"
                >
                  نسيت كلمة المرور؟
                </Link>
                <label htmlFor="password" className="block text-gray-600 font-medium">
                  كلمة المرور
                </label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="ادخل كلمة المرور"
                  className="text-right transition-all duration-300 focus:ring-2 focus:ring-primary/30"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-blue hover:bg-brand-blue/90 transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0 py-6 text-lg shadow-md hover:shadow-lg"
              style={{ backgroundColor: 'hsl(214, 100%, 50%)' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                "تسجيل الدخول"
              )}
            </Button>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                ليس لديك حساب؟{" "}
                <Link
                  href="/auth/register"
                  className="text-brand-blue font-semibold hover:underline transition-all duration-300 hover:text-blue-700"
                  style={{ color: 'hsl(214, 100%, 50%)' }}
                >
                  انشاء حساب جديد
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

