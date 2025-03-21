import { Navbar } from "@/components/navbar"
import { AuctionCard } from "@/components/auction-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, SlidersHorizontal } from "lucide-react"

export default function AuctionsPage() {
  // Sample auction data
  const auctions = [
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
      title: "تلفزيون سمارت إل جي 55 بوصة",
      description: "تلفزيون سمارت إل جي 55 بوصة بدقة 4K",
      specs: ["دقة 4K Ultra HD", "تقنية HDR", "نظام تشغيل WebOS"],
      currentBid: 6000,
      bidCount: 12,
      endDate: "2/6/2024",
      images: ["/placeholder.svg?height=300&width=300"],
    },
    {
      id: 4,
      title: "ثلاجة نوفروست توشيبا 16 قدم",
      description: "ثلاجة نوفروست توشيبا 16 قدم بابين",
      specs: ["سعة 16 قدم", "تقنية No Frost", "توفير في استهلاك الكهرباء"],
      currentBid: 7500,
      bidCount: 5,
      endDate: "5/6/2024",
      images: ["/placeholder.svg?height=300&width=300"],
    },
    {
      id: 5,
      title: "مكيف سبليت كارير 1.5 حصان",
      description: "مكيف سبليت كارير 1.5 حصان بارد فقط",
      specs: ["1.5 حصان", "تبريد سريع", "موفر للطاقة"],
      currentBid: 4200,
      bidCount: 7,
      endDate: "10/6/2024",
      images: ["/placeholder.svg?height=300&width=300"],
    },
    {
      id: 6,
      title: "خلاط كهربائي براون متعدد السرعات",
      description: "خلاط كهربائي براون متعدد السرعات مع ملحقات متعددة",
      specs: ["5 سرعات مختلفة", "وعاء زجاجي سعة 1.5 لتر", "قوة 800 واط"],
      currentBid: 1200,
      bidCount: 4,
      endDate: "15/6/2024",
      images: ["/placeholder.svg?height=300&width=300"],
    },
  ]

  return (
    <main>
      <Navbar />

      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="w-full md:w-1/4 bg-white rounded-lg p-4 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">الفلاتر</h3>
              <SlidersHorizontal className="h-5 w-5" />
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">الفئة</h4>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="جميع الفئات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    <SelectItem value="cooling">أجهزة تبريد</SelectItem>
                    <SelectItem value="tv">تلفزيونات</SelectItem>
                    <SelectItem value="washing">غسالات</SelectItem>
                    <SelectItem value="kitchen">أجهزة مطبخ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="font-medium mb-2">الحالة</h4>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="جميع الحالات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="new">جديد</SelectItem>
                    <SelectItem value="used">مستعمل</SelectItem>
                    <SelectItem value="refurbished">مجدد</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h4 className="font-medium mb-2">نطاق السعر</h4>
                <div className="mb-4">
                  <Slider defaultValue={[0, 10000]} min={0} max={10000} step={100} />
                </div>
                <div className="flex justify-between text-sm">
                  <span>0 جنيه</span>
                  <span>10,000 جنيه</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">الماركة</h4>
                <Select>
                  <SelectTrigger className="text-right">
                    <SelectValue placeholder="جميع الماركات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الماركات</SelectItem>
                    <SelectItem value="samsung">سامسونج</SelectItem>
                    <SelectItem value="lg">إل جي</SelectItem>
                    <SelectItem value="toshiba">توشيبا</SelectItem>
                    <SelectItem value="carrier">كارير</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">تطبيق الفلاتر</Button>
            </div>
          </div>

          {/* Main content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full">
                  <Input className="pr-10" placeholder="ابحث عن مزادات..." />
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
        </div>
      </div>
    </main>
  )
}

