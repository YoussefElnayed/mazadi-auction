"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, GraduationCap, Loader2, ChevronRight, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

type FormStep = 1 | 2 | 3

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading: authLoading, error: authError } = useAuth()
  const [step, setStep] = useState<FormStep>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // If there's an error from the auth context, display it
    if (authError) {
      setError(authError)
    }
  }, [authError])

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    nationalId: "",
    email: "",
    phone: "",
    qualification: "",
    governorate: "",
    emailVerificationCode: ["", "", "", "", "", ""],
    phoneVerificationCode: ["", "", "", "", "", ""],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleVerificationCodeChange = (type: "email" | "phone", index: number, value: string) => {
    const newCodes = type === "email" ? [...formData.emailVerificationCode] : [...formData.phoneVerificationCode]

    newCodes[index] = value

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`${type}-code-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }

    setFormData((prev) => ({
      ...prev,
      [type === "email" ? "emailVerificationCode" : "phoneVerificationCode"]: newCodes,
    }))
  }

  const validateStep1 = () => {
    if (
      !formData.fullName ||
      !formData.address ||
      !formData.nationalId ||
      !formData.email ||
      !formData.phone ||
      !formData.qualification ||
      !formData.governorate
    ) {
      setError("يرجى ملء جميع الحقول المطلوبة")
      return false
    }

    if (!acceptTerms) {
      setError("يجب الموافقة على شروط الاستخدام للمتابعة")
      return false
    }

    return true
  }

  const validateStep2 = () => {
    const isEmailCodeComplete = formData.emailVerificationCode.every((code) => code.length === 1)
    const isPhoneCodeComplete = formData.phoneVerificationCode.every((code) => code.length === 1)

    if (!isEmailCodeComplete || !isPhoneCodeComplete) {
      setError("يرجى إدخال رموز التحقق بالكامل")
      return false
    }

    return true
  }

  const handleNextStep = async () => {
    if (step === 1) {
      if (!validateStep1()) return

      try {
        setIsLoading(true)
        // Simulate API call to send verification codes
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setStep(2)
      } catch (err) {
        setError("حدث خطأ أثناء إرسال رموز التحقق. يرجى المحاولة مرة أخرى.")
      } finally {
        setIsLoading(false)
      }
    } else if (step === 2) {
      if (!validateStep2()) return

      try {
        setIsLoading(true)

        // Combine email and phone verification codes
        const emailCode = formData.emailVerificationCode.join('')
        const phoneCode = formData.phoneVerificationCode.join('')

        // Validate codes (in a real app, you would send these to the server)
        if (emailCode !== '123456' && phoneCode !== '123456') {
          throw new Error("رمز التحقق غير صحيح. للتجربة، استخدم الرمز 123456")
        }

        // Use the register function from auth context
        await register({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          nationalId: formData.nationalId,
          qualification: formData.qualification,
          governorate: formData.governorate
        })

      } catch (err: any) {
        setError(err.message || "فشل التحقق من الرموز. يرجى التأكد من صحة الرموز المدخلة.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as FormStep)
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
            <h2 className="text-3xl font-bold mb-4">انضم إلينا الآن</h2>
            <p className="opacity-90">سجل حساب جديد للمشاركة في المزادات</p>
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

      {/* Right side - Registration form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-left mb-4">
            <Link href="/" className="text-xl font-bold">
              مزادي
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center relative">
              {step === 1 ? "انشاء حساب جديد" : "تأكيد البيانات"}
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary rounded-full"></span>
            </h1>

            {/* Step indicator */}
            <div className="flex items-center justify-center mt-8">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-primary text-white shadow-md" : "bg-gray-200 text-gray-500"
                  } transition-all duration-300 transform ${step === 1 ? "scale-110" : ""}`}
                >
                  1
                </div>
                <div className={`w-16 h-1 ${step >= 2 ? "bg-primary" : "bg-gray-200"} transition-all duration-300`}></div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-primary text-white shadow-md" : "bg-gray-200 text-gray-500"
                  } transition-all duration-300 transform ${step === 2 ? "scale-110" : ""}`}
                >
                  2
                </div>
                <div className={`w-16 h-1 ${step >= 3 ? "bg-primary" : "bg-gray-200"} transition-all duration-300`}></div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 3 ? "bg-primary text-white shadow-md" : "bg-gray-200 text-gray-500"
                  } transition-all duration-300 transform ${step === 3 ? "scale-110" : ""}`}
                >
                  3
                </div>
              </div>
            </div>

            {/* Step labels */}
            <div className="flex items-center justify-center mt-2">
              <div className="flex items-center text-xs text-gray-600">
                <div className={`w-10 text-center ${step === 1 ? "font-medium text-primary" : ""} transition-colors duration-300`}>
                  البيانات
                </div>
                <div className="w-16"></div>
                <div className={`w-10 text-center ${step === 2 ? "font-medium text-primary" : ""} transition-colors duration-300`}>
                  التأكيد
                </div>
                <div className="w-16"></div>
                <div className={`w-10 text-center ${step === 3 ? "font-medium text-primary" : ""} transition-colors duration-300`}>
                  الإكمال
                </div>
              </div>
            </div>
          </div>

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

          {step === 1 && (
            <form className="space-y-4">
              <div className="text-right">
                <label htmlFor="fullName" className="block text-gray-600 mb-1">
                  الاسم بالكامل
                </label>
                <Input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="ادخل الاسم بالكامل"
                  className="text-right"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="text-right">
                <label htmlFor="address" className="block text-gray-600 mb-1">
                  العنوان بالكامل
                </label>
                <Input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="ادخل العنوان بالكامل"
                  className="text-right"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="text-right">
                <label htmlFor="nationalId" className="block text-gray-600 mb-1">
                  الرقم القومي
                </label>
                <Input
                  id="nationalId"
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  placeholder="ادخل الرقم القومي"
                  className="text-right"
                  disabled={isLoading}
                  required
                />
              </div>

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
                  placeholder="ادخل البريد الالكتروني"
                  className="text-right"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="text-right">
                <label htmlFor="phone" className="block text-gray-600 mb-1">
                  رقم الهاتف
                </label>
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="ادخل رقم الهاتف"
                  className="text-right"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="text-right">
                <label className="block text-gray-600 mb-1">المؤهل</label>
                <Select
                  onValueChange={(value) => handleSelectChange("qualification", value)}
                  value={formData.qualification}
                  disabled={isLoading}
                >
                  <SelectTrigger className="text-right">
                    <div className="flex items-center justify-between w-full">
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      <SelectValue placeholder="-- اختر المؤهل --" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelor">بكالوريوس</SelectItem>
                    <SelectItem value="master">ماجستير</SelectItem>
                    <SelectItem value="phd">دكتوراه</SelectItem>
                    <SelectItem value="diploma">دبلوم</SelectItem>
                    <SelectItem value="high_school">ثانوية عامة</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="text-right">
                <label className="block text-gray-600 mb-1">المحافظة</label>
                <Select
                  onValueChange={(value) => handleSelectChange("governorate", value)}
                  value={formData.governorate}
                  disabled={isLoading}
                >
                  <SelectTrigger className="text-right">
                    <div className="flex items-center justify-between w-full">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <SelectValue placeholder="-- اختر المحافظة --" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cairo">القاهرة</SelectItem>
                    <SelectItem value="alexandria">الإسكندرية</SelectItem>
                    <SelectItem value="giza">الجيزة</SelectItem>
                    <SelectItem value="sharkia">الشرقية</SelectItem>
                    <SelectItem value="aswan">أسوان</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-sm">
                  لقد قمت بقراءة{" "}
                  <Link href="/terms" className="text-brand-blue hover:underline" target="_blank">
                    شروط الاستخدام والتسجيل
                  </Link>{" "}
                  و اوافق عليها
                </label>
              </div>

              <Button
                type="button"
                className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0 py-6 text-lg shadow-md hover:shadow-lg"
                style={{ backgroundColor: 'hsl(142, 76%, 47%)' }}
                onClick={handleNextStep}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    جاري المعالجة...
                  </>
                ) : (
                  <>
                    التالي
                    <ChevronLeft className="mr-2 h-5 w-5 animate-bounce-horizontal" />
                  </>
                )}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-6">
              <div className="text-center bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-medium mb-4 text-primary">تأكيد البريد الالكتروني</h3>
                <p className="mb-6 text-gray-600">
                  ادخل الرمز المرسل الي بريدك الالكتروني{" "}
                  <span className="font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded">{formData.email}</span>
                </p>
                <div className="flex justify-center gap-3 mb-6 dir-ltr">
                  {[...Array(6)].map((_, i) => (
                    <Input
                      key={i}
                      id={`email-code-${i}`}
                      className="w-14 h-14 text-center text-xl font-bold transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:scale-110"
                      maxLength={1}
                      value={formData.emailVerificationCode[i]}
                      onChange={(e) => handleVerificationCodeChange("email", i, e.target.value)}
                      disabled={isLoading}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">لم يصلك الرمز؟ <button className="text-primary hover:underline">إعادة إرسال</button></p>
              </div>

              <div className="text-center bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-medium mb-4 text-primary">تأكيد رقم الهاتف</h3>
                <p className="mb-6 text-gray-600">
                  ادخل الرمز المرسل الي رقم الهاتف{" "}
                  <span className="font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded">{formData.phone}</span>
                </p>
                <div className="flex justify-center gap-3 mb-6 dir-ltr">
                  {[...Array(6)].map((_, i) => (
                    <Input
                      key={i}
                      id={`phone-code-${i}`}
                      className="w-14 h-14 text-center text-xl font-bold transition-all duration-300 focus:ring-2 focus:ring-primary/30 focus:scale-110"
                      maxLength={1}
                      value={formData.phoneVerificationCode[i]}
                      onChange={(e) => handleVerificationCodeChange("phone", i, e.target.value)}
                      disabled={isLoading}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">لم يصلك الرمز؟ <button className="text-primary hover:underline">إعادة إرسال</button></p>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 py-6 text-lg"
                  onClick={handlePrevStep}
                  disabled={isLoading}
                >
                  <ChevronRight className="ml-2 h-5 w-5 animate-bounce-horizontal-reverse" />
                  السابق
                </Button>

                <Button
                  type="button"
                  className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0 py-6 text-lg shadow-md hover:shadow-lg"
                  style={{ backgroundColor: 'hsl(142, 76%, 47%)' }}
                  onClick={handleNextStep}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      جاري التحقق...
                    </>
                  ) : (
                    <>
                      إنشاء الحساب
                      <ChevronLeft className="mr-2 h-5 w-5 animate-bounce-horizontal" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

