"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <main>
      <Navbar />

      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-12">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">اتصل بنا</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">اتصل بنا</h3>
                <p className="text-gray-600">+20 123 456 7890</p>
                <p className="text-gray-600">+20 098 765 4321</p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">البريد الإلكتروني</h3>
                <p className="text-gray-600">info@mazadi.com</p>
                <p className="text-gray-600">support@mazadi.com</p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">العنوان</h3>
                <p className="text-gray-600">123 شارع التحرير، القاهرة</p>
                <p className="text-gray-600">جمهورية مصر العربية</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold mb-6">أرسل لنا رسالة</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-right">
                    <label className="block text-gray-600 mb-1">الاسم بالكامل</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="ادخل اسمك بالكامل"
                      className="text-right"
                      required
                    />
                  </div>

                  <div className="text-right">
                    <label className="block text-gray-600 mb-1">البريد الإلكتروني</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ادخل بريدك الإلكتروني"
                      className="text-right"
                      required
                    />
                  </div>

                  <div className="text-right">
                    <label className="block text-gray-600 mb-1">رقم الهاتف</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="ادخل رقم هاتفك"
                      className="text-right"
                    />
                  </div>

                  <div className="text-right">
                    <label className="block text-gray-600 mb-1">الموضوع</label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="ادخل موضوع الرسالة"
                      className="text-right"
                      required
                    />
                  </div>

                  <div className="text-right">
                    <label className="block text-gray-600 mb-1">الرسالة</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="اكتب رسالتك هنا..."
                      className="text-right min-h-[150px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    إرسال الرسالة
                  </Button>
                </form>
              </div>

              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold mb-6">موقعنا</h2>
                <div className="bg-gray-200 rounded-lg h-[400px] flex items-center justify-center">
                  <p className="text-gray-500">خريطة جوجل ستظهر هنا</p>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">ساعات العمل</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">السبت - الخميس:</span>
                      <span>9:00 صباحاً - 6:00 مساءً</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الجمعة:</span>
                      <span>مغلق</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

