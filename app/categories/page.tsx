import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function CategoriesPage() {
  const categories = [
    {
      id: "electronics",
      name: "الإلكترونيات",
      image: "/placeholder.svg?height=200&width=200",
      count: 24
    },
    {
      id: "home-appliances",
      name: "الأجهزة المنزلية",
      image: "/placeholder.svg?height=200&width=200",
      count: 18
    },
    {
      id: "kitchen",
      name: "أجهزة المطبخ",
      image: "/placeholder.svg?height=200&width=200",
      count: 15
    },
    {
      id: "computers",
      name: "أجهزة الكمبيوتر",
      image: "/placeholder.svg?height=200&width=200",
      count: 12
    },
    {
      id: "mobile",
      name: "الهواتف المحمولة",
      image: "/placeholder.svg?height=200&width=200",
      count: 20
    },
    {
      id: "audio",
      name: "أجهزة الصوت",
      image: "/placeholder.svg?height=200&width=200",
      count: 8
    },
    {
      id: "tv",
      name: "التلفزيونات",
      image: "/placeholder.svg?height=200&width=200",
      count: 10
    },
    {
      id: "gaming",
      name: "أجهزة الألعاب",
      image: "/placeholder.svg?height=200&width=200",
      count: 6
    }
  ]

  return (
    <main>
      <Navbar />

      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">فئات المزادات</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.count} مزاد</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
