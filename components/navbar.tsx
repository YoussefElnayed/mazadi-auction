import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function Navbar() {
  return (
    <nav className="w-full bg-brand-dark-blue text-white py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold">
            مزادي
          </Link>
          <div className="relative hidden md:block w-80">
            <Input className="pr-10 bg-white/10 border-0 text-white placeholder:text-gray-300" placeholder="البحث..." />
            <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-brand-blue border-brand-blue hover:bg-brand-blue/90 text-white">
            تسجيل الدخول
          </Button>
          <Button variant="outline" className="bg-green-600 border-green-600 hover:bg-green-600/90 text-white">
            مستخدم جديد
          </Button>
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-6 text-sm">
            <Link href="/" className="border-b-2 border-primary pb-1">
              الصفحة الرئيسية
            </Link>
            <Link href="/auctions" className="hover:text-primary">
              المزادات
            </Link>
            <Link href="/about" className="hover:text-primary">
              تعريف بالموقع
            </Link>
            <Link href="/terms" className="hover:text-primary">
              شروط الاستخدام
            </Link>
            <Link href="/contact" className="hover:text-primary">
              اتصل بنا
            </Link>
          </div>
          <div className="md:hidden">
            <Search className="h-5 w-5" />
          </div>
        </div>
      </div>
    </nav>
  )
}

