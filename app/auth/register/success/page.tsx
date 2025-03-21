import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check } from "lucide-react"

export default function RegisterSuccessPage() {
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

      {/* Right side - Success message */}
      <div className="w-full md:w-3/5 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-left mb-4">
            <Link href="/" className="text-xl font-bold">
              مزادي
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold mb-12">تم انشاء الحساب بنجاح</h1>

            <div className="flex justify-center mb-12">
              <div className="w-32 h-32 bg-primary rounded-lg flex items-center justify-center relative">
                <div
                  className="absolute inset-0 bg-primary rounded-lg"
                  style={{
                    clipPath: "polygon(50% 0%, 90% 20%, 100% 60%, 75% 100%, 25% 100%, 0% 60%, 10% 20%)",
                  }}
                ></div>
                <Check className="h-16 w-16 text-white z-10" />
              </div>
            </div>

            <p className="text-gray-600 mb-8">
              تم إنشاء حسابك بنجاح! يمكنك الآن استخدام منصة مزادي للمشاركة في المزادات وشراء وبيع المنتجات.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1 bg-primary hover:bg-primary/90 py-6 text-lg">
                <Link href="/auth/login">تسجيل الدخول</Link>
              </Button>

              <Button asChild variant="outline" className="flex-1 py-6 text-lg">
                <Link href="/">العودة إلى الصفحة الرئيسية</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

