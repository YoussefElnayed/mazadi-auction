"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

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

    try {
      setIsLoading(true)
      setError("")

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would call your authentication API here
      // const response = await signIn(formData.email, formData.password)

      // Redirect to dashboard on success
      router.push("/dashboard")
    } catch (err) {
      setError("فشل تسجيل الدخول. يرجى التحقق من بريدك الإلكتروني وكلمة المرور")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Blue background with illustration */}
      <div className="w-full md:w-2/5 bg-brand-blue flex flex-col items-center justify-center p-8 min-h-[200px] md:min-h-screen">
        <div className="max-w-xs">
          <Image
            src="/placeholder.svg?height=300&width=300"
            alt="مزادي"
            width={300}
            height={300}
            className="mb-8"
            priority
          />
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

          <h1 className="text-3xl font-bold mb-8 text-center">تسجيل الدخول</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md mb-6 text-right">{error}</div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="text-right">
              <label htmlFor="email" className="block text-gray-600 mb-1">
                البريد الالكتروني
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ادخل بريدك الالكتروني"
                className="text-right"
                disabled={isLoading}
                required
              />
            </div>

            <div className="text-right">
              <div className="flex justify-between mb-1">
                <Link href="/auth/reset-password" className="text-red-600 text-sm hover:underline">
                  نسيت كلمة المرور؟
                </Link>
                <label htmlFor="password" className="block text-gray-600">
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
                  className="text-right"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري تسجيل الدخول...
                </>
              ) : (
                "تسجيل الدخول"
              )}
            </Button>

            <div className="text-center">
              <p>
                ليس لديك حساب؟{" "}
                <Link href="/auth/register" className="text-brand-blue font-semibold hover:underline">
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

