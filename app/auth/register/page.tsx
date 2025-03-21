"use client"

import type React from "react"

import { useState } from "react"
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
  const [step, setStep] = useState<FormStep>(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)

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
        // Simulate API call to verify codes and complete registration
        await new Promise((resolve) => setTimeout(resolve, 1500))
        router.push("/auth/register/success")
      } catch (err) {
        setError("فشل التحقق من الرموز. يرجى التأكد من صحة الرموز المدخلة.")
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

      {/* Right side - Registration form */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-left mb-4">
            <Link href="/" className="text-xl font-bold">
              مزادي
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center">{step === 1 ? "انشاء حساب جديد" : "تأكيد البيانات"}</h1>

            {/* Step indicator */}
            <div className="flex items-center justify-center mt-6">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  1
                </div>
                <div className={`w-16 h-1 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  2
                </div>
                <div className={`w-16 h-1 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  3
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md mb-6 text-right">{error}</div>
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
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleNextStep}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري المعالجة...
                  </>
                ) : (
                  "التالي"
                )}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg mb-4">تأكيد البريد الالكتروني</h3>
                <p className="mb-6">ادخل الرمز المرسل الي بريدك الالكتروني {formData.email}</p>
                <div className="flex justify-center gap-2 mb-6 dir-ltr">
                  {[...Array(6)].map((_, i) => (
                    <Input
                      key={i}
                      id={`email-code-${i}`}
                      className="w-12 h-12 text-center text-lg"
                      maxLength={1}
                      value={formData.emailVerificationCode[i]}
                      onChange={(e) => handleVerificationCodeChange("email", i, e.target.value)}
                      disabled={isLoading}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg mb-4">ادخل الرمز المرسل الي رقم الهاتف {formData.phone}</h3>
                <div className="flex justify-center gap-2 mb-6 dir-ltr">
                  {[...Array(6)].map((_, i) => (
                    <Input
                      key={i}
                      id={`phone-code-${i}`}
                      className="w-12 h-12 text-center text-lg"
                      maxLength={1}
                      value={formData.phoneVerificationCode[i]}
                      onChange={(e) => handleVerificationCodeChange("phone", i, e.target.value)}
                      disabled={isLoading}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handlePrevStep}
                  disabled={isLoading}
                >
                  <ChevronRight className="ml-2 h-4 w-4" />
                  السابق
                </Button>

                <Button
                  type="button"
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={handleNextStep}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      جاري التحقق...
                    </>
                  ) : (
                    <>
                      التالي
                      <ChevronLeft className="mr-2 h-4 w-4" />
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

