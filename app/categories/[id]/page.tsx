"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuctionCard } from "@/components/auction-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState<any>(null)
  const [auctions, setAuctions] = useState<any[]>([])

  // Categories data
  const categories = {
    "electronics": {
      id: "electronics",
      name: "الإلكترونيات",
      description: "مزادات على أحدث الأجهزة الإلكترونية بأفضل الأسعار"
    },
    "home-appliances": {
      id: "home-appliances",
      name: "الأجهزة المنزلية",
      description: "مزادات على الأجهزة المنزلية المتنوعة"
    },
    "kitchen": {
      id: "kitchen",
      name: "أجهزة المطبخ",
      description: "مزادات على أجهزة المطبخ الحديثة"
    },
    "computers": {
      id: "computers",
      name: "أجهزة الكمبيوتر",
      description: "مزادات على أجهزة الكمبيوتر واللابتوب"
    },
    "mobile": {
      id: "mobile",
      name: "الهواتف المحمولة",
      description: "مزادات على أحدث الهواتف المحمولة"
    },
    "audio": {
      id: "audio",
      name: "أجهزة الصوت",
      description: "مزادات على أجهزة الصوت والسماعات"
    },
    "tv": {
      id: "tv",
      name: "التلفزيونات",
      description: "مزادات على أحدث أجهزة التلفزيون"
    },
    "gaming": {
      id: "gaming",
      name: "أجهزة الألعاب",
      description: "مزادات على أجهزة الألعاب والإكسسوارات"
    }
  }

  // Simulate data fetching
  useEffect(() => {
    // Get category data
    const categoryData = categories[params.id as keyof typeof categories] || {
      id: params.id,
      name: "فئة غير معروفة",
      description: "لا يوجد وصف متاح"
    }

    // Sample auction data
    const auctionsData = [
      {
        id: 1,
        title: "مروحة حائط بريكس مقاس 18 بوصة",
        description: "مروحة حائط بريكس مقاس 18 بوصة متاحة للمزايدة",
        specs: ["تتميز بإعدادات 3 سرعات وتنظيم الشبكات يعمل بمحرك قوي", "220 فولت / 50 هرتز"],
        currentBid: 500,
        bidCount: 3,
        endDate: "25/5/2024",
        images: ["/placeholder.svg?height=300&width=300"],
      },
      {
        id: 2,
        title: "غسالة أوتوماتيك سامسونج 7 كيلو",
        description: "غسالة أوتوماتيك سامسونج 7 كيلو بحالة ممتازة",
        specs: ["7 كيلو سعة الغسيل", "1200 دورة في الدقيقة", "برامج متعددة للغسيل"],
        currentBid: 3500,
        bidCount: 8,
        endDate: "30/5/2024",
        images: ["/placeholder.svg?height=300&width=300"],
      },
      {
        id: 3,
        title: "تلفزيون سامسونج سمارت 55 بوصة",
        description: "تلفزيون سامسونج سمارت 55 بوصة بدقة 4K",
        specs: ["دقة 4K Ultra HD", "تقنية HDR", "نظام تشغيل Tizen"],
        currentBid: 7000,
        bidCount: 12,
        endDate: "28/5/2024",
        images: ["/placeholder.svg?height=300&width=300"],
      },
      {
        id: 4,
        title: "مكيف شارب 1.5 حصان",
        description: "مكيف شارب 1.5 حصان بارد فقط",
        specs: ["1.5 حصان", "بارد فقط", "موفر للطاقة"],
        currentBid: 4200,
        bidCount: 5,
        endDate: "1/6/2024",
        images: ["/placeholder.svg?height=300&width=300"],
      },
      {
        id: 5,
        title: "خلاط كهربائي مولينكس",
        description: "خلاط كهربائي مولينكس متعدد السرعات",
        specs: ["5 سرعات مختلفة", "وعاء زجاجي سعة 1.5 لتر", "قوة 800 واط"],
        currentBid: 1200,
        bidCount: 4,
        endDate: "3/6/2024",
        images: ["/placeholder.svg?height=300&width=300"],
      },
      {
        id: 6,
        title: "ثلاجة إل جي نوفروست",
        description: "ثلاجة إل جي نوفروست بابين سعة 16 قدم",
        specs: ["سعة 16 قدم", "تقنية نوفروست", "موفرة للطاقة"],
        currentBid: 8500,
        bidCount: 9,
        endDate: "5/6/2024",
        images: ["/placeholder.svg?height=300&width=300"],
      },
    ]

    // Simulate API call
    setTimeout(() => {
      setCategory(categoryData)
      setAuctions(auctionsData)
      setIsLoading(false)
    }, 500)
  }, [params.id])

  // Show loading state
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <div className="container mx-auto py-8">
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">جاري تحميل البيانات...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Navbar />

      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full">
              <Input className="pr-10" placeholder={`ابحث في ${category.name}...`} />
              <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">الأحدث</SelectItem>
                <SelectItem value="ending-soon">ينتهي قريباً</SelectItem>
                <SelectItem value="price-asc">السعر: الأقل للأعلى</SelectItem>
                <SelectItem value="price-desc">السعر: الأعلى للأقل</SelectItem>
                <SelectItem value="bids">عدد المزايدات</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <AuctionCard key={auction.id} {...auction} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              السابق
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-white">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              التالي
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
