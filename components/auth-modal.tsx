"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

type ModalType =
  | "login"
  | "register"
  | "login-options"
  | "reset-password"
  | "verification-code"
  | "success"
  | "email-login"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialView?: ModalType
}

export function AuthModal({ isOpen, onClose, initialView = "login-options" }: AuthModalProps) {
  const [view, setView] = useState<ModalType>(initialView)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute left-4 top-4 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">مزادي</h2>

          {view === "login-options" && (
            <>
              <div className="space-y-4 mt-8">
                <button className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 py-3 px-4 rounded-md">
                  <Image src="/placeholder.svg?height=24&width=24" alt="Google" width={24} height={24} />
                  <span>تسجيل الدخول باستخدام جوجل</span>
                </button>

                <div className="flex items-center gap-2">
                  <div className="h-px bg-gray-300 flex-1"></div>
                  <span className="text-gray-500">أو</span>
                  <div className="h-px bg-gray-300 flex-1"></div>
                </div>

                <button
                  className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 py-3 px-4 rounded-md"
                  onClick={() => setView("email-login")}
                >
                  <Image src="/placeholder.svg?height=24&width=24" alt="Email" width={24} height={24} />
                  <span>تسجيل الدخول باستخدام البريد الالكتروني</span>
                </button>

                <button className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 py-3 px-4 rounded-md">
                  <Image src="/placeholder.svg?height=24&width=24" alt="Phone" width={24} height={24} />
                  <span>تسجيل الدخول باستخدام رقم الهاتف</span>
                </button>
              </div>

              <p className="text-red-600 mt-8 text-sm">عدد جديد 5 تم بالتسجيل الان!</p>
            </>
          )}

          {view === "email-login" && (
            <>
              <h3 className="mt-4 mb-6">تسجيل الدخول باستخدام البريد الالكتروني</h3>
              <form className="space-y-4">
                <div className="text-right">
                  <label className="block text-gray-600 mb-1">البريد الالكتروني</label>
                  <Input type="email" placeholder="ادخل بريدك الالكتروني" className="text-right" />
                </div>

                <div className="text-right">
                  <div className="flex justify-between mb-1">
                    <button type="button" className="text-red-600 text-sm" onClick={() => setView("reset-password")}>
                      نسيت كلمة المرور؟
                    </button>
                    <label className="block text-gray-600">كلمة المرور</label>
                  </div>
                  <div className="relative">
                    <Input type="password" placeholder="ادخل كلمة المرور" className="text-right" />
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault()
                    // Handle login logic
                  }}
                >
                  تسجيل الدخول
                </Button>
              </form>

              <p className="text-red-600 mt-8 text-sm">عدد جديد 5 تم بالتسجيل الان!</p>
            </>
          )}

          {view === "reset-password" && (
            <>
              <h3 className="mt-4 mb-6">اعادة تعيين كلمة المرور</h3>
              <form className="space-y-4">
                <div className="text-right">
                  <label className="block text-gray-600 mb-1">ادخل البريد الالكتروني</label>
                  <Input type="email" placeholder="ادخل بريدك الالكتروني" className="text-right" />
                </div>

                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault()
                    setView("verification-code")
                  }}
                >
                  ارسال رمز التأكيد
                </Button>
              </form>

              <p className="text-red-600 mt-8 text-sm">عدد جديد 5 تم بالتسجيل الان!</p>
            </>
          )}

          {view === "verification-code" && (
            <>
              <h3 className="mt-4 mb-6">اعادة تعيين كلمة المرور</h3>
              <p className="mb-4">ادخل رمز التأكيد</p>
              <div className="flex justify-center gap-2 mb-6">
                {[...Array(6)].map((_, i) => (
                  <Input key={i} className="w-12 h-12 text-center text-lg" maxLength={1} />
                ))}
              </div>

              <Button className="w-full" onClick={() => setView("success")}>
                تأكيد
              </Button>

              <p className="text-red-600 mt-8 text-sm">عدد جديد 5 تم بالتسجيل الان!</p>
            </>
          )}

          {view === "success" && (
            <>
              <h3 className="mt-4 mb-6">تم اعادة تعيين كلمة المرور بنجاح</h3>
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

              <Button className="w-full" onClick={() => setView("email-login")}>
                اعادة تسجيل الدخول
              </Button>
            </>
          )}

          {view === "register" && (
            <>
              <h3 className="mt-4 mb-6">انشاء حساب جديد</h3>
              <form className="space-y-4">
                <div className="text-right">
                  <label className="block text-gray-600 mb-1">الاسم بالكامل</label>
                  <Input type="text" placeholder="ادخل اسم المستخدم" className="text-right" />
                </div>

                <div className="text-right">
                  <label className="block text-gray-600 mb-1">العنوان بالكامل</label>
                  <Input type="text" placeholder="ادخل العنوان" className="text-right" />
                </div>

                <div className="text-right">
                  <label className="block text-gray-600 mb-1">الرقم القومي</label>
                  <Input type="text" placeholder="ادخل الرقم القومي" className="text-right" />
                </div>

                <div className="text-right">
                  <label className="block text-gray-600 mb-1">البريد الالكتروني</label>
                  <Input type="email" placeholder="ادخل البريد الالكتروني" className="text-right" />
                </div>

                <div className="text-right">
                  <label className="block text-gray-600 mb-1">رقم الهاتف</label>
                  <Input type="tel" placeholder="ادخل رقم الهاتف" className="text-right" />
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm">
                    لقد قمت بقراءة شروط الاستخدام والتسجيل و اوافق عليها
                  </label>
                </div>

                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault()
                    // Handle registration
                  }}
                >
                  التالي
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

