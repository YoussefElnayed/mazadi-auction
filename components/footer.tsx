import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-brand-dark-blue text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">مزادي</h3>
            <p className="text-gray-300 mb-4">
              منصة مزادات إلكترونية توفر لك الشفافية والأمان، حيث يمكنك بيع وشراء الأجهزة الكهربائية بأفضل الأسعار!
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  الصفحة الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/auctions" className="text-gray-300 hover:text-white">
                  المزادات
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  تعريف بالموقع
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  شروط الاستخدام
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">فئات المزادات</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auctions?category=cooling" className="text-gray-300 hover:text-white">
                  أجهزة تبريد
                </Link>
              </li>
              <li>
                <Link href="/auctions?category=tv" className="text-gray-300 hover:text-white">
                  تلفزيونات
                </Link>
              </li>
              <li>
                <Link href="/auctions?category=washing" className="text-gray-300 hover:text-white">
                  غسالات
                </Link>
              </li>
              <li>
                <Link href="/auctions?category=kitchen" className="text-gray-300 hover:text-white">
                  أجهزة مطبخ
                </Link>
              </li>
              <li>
                <Link href="/auctions?category=other" className="text-gray-300 hover:text-white">
                  أجهزة أخرى
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">اتصل بنا</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">123 شارع التحرير، القاهرة، مصر</li>
              <li className="text-gray-300">info@mazadi.com</li>
              <li className="text-gray-300">+20 123 456 7890</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2024 مزادي. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}

