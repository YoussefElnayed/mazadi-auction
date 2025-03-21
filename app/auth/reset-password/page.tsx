"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

type ResetStep = "email" | "verification" | "success"

export default function ResetPasswordPage() {
  const [step, setStep] = useState<ResetStep>("email")

  return (
    <div className="min-h-screen flex">
      <div className="w-2/5 bg-brand-blue flex flex-col items-center justify-center p-8">
        <div className="max-w-xs">
          <Image src="/placeholder.svg?height=300&width=300" alt="مزادي" width={300} height={300} className="mb-8" />
        </div>
      </div>

      <div className="w-3/5 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-left mb-4">
            <Link href="/" className="text-xl font-bold">
              مزادي
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-8 text-center">مزادي</h1>

          {step === "email" && (
            <>
              <h2 className="text-xl font-semibold mb-6 text-center">اعادة تعيين كلمة المرور</h2>
              <form className="space-y-4">
                <div className="text-right">
                  <label className="block text-gray-600 mb-1">ادخل البريد الالكتروني</label>
                  <Input type="email" placeholder="ادخل بريدك الالكتروني" className="text-right" />
                </div>

                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault()
                    setStep("verification")
                  }}
                >
                  ارسال رمز التأكيد
                </Button>
              </form>
            </>
          )}

          {step === "verification" && (
            <>
              <h2 className="text-xl font-semibold mb-6 text-center">اعادة تعيين كلمة المرور</h2>
              <p className="text-center mb-4">ادخل رمز التأكيد</p>
              <div className="flex justify-center gap-2 mb-6">
                {[...Array(6)].map((_, i) => (
                  <Input key={i} className="w-12 h-12 text-center text-lg" maxLength={1} />
                ))}
              </div>

              <Button className="w-full" onClick={() => setStep("success")}>
                تأكيد
              </Button>
            </>
          )}

          {step === "success" && (
            <>
              <h2 className="text-xl font-semibold mb-6 text-center">تم اعادة تعيين كلمة المرور بنجاح</h2>
              <div className="flex justify-center mb-6">
                <div className="bg-primary w-24 h-24 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <Button className="w-full" onClick={() => (window.location.href = "/auth/login")}>
                العوده الي الصفحة الرئيسية
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

