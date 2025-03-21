"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Clock, Heart, Share2, User } from "lucide-react"
import Image from "next/image"

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [bidAmount, setBidAmount] = useState("")
  const [auction, setAuction] = useState<any>(null)

  // Simulate data fetching
  useEffect(() => {
    // Sample auction data - in a real app, you would fetch this based on params.id
    const auctionData = {
      id: params.id,
      title: "مروحة حائط بريكس مقاس 18 بوصة",
      description:
        "مروحة حائط بريكس مقاس 18 بوصة متاحة للمزايدة. تتميز بإعدادات 3 سرعات وتنظيم الشبكات يعمل بمحرك قوي. مثالية للاستخدام المنزلي والمكتبي. الحالة: مستعملة بحالة ممتازة.",
      specs: [
        "تتميز بإعدادات 3 سرعات وتنظيم الشبكات يعمل بمحرك قوي",
        "220 فولت / 50 هرتز",
        "قطر المروحة: 18 بوصة",
        "اللون: أبيض",
        "الضمان: 6 أشهر",
      ],
      currentBid: 500,
      startingBid: 300,
      bidCount: 3,
      endDate: "25/5/2024",
      timeLeft: "3 أيام و 5 ساعات",
      seller: {
        name: "أحمد محمد",
        rating: 4.8,
        auctions: 15,
      },
      images: [
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
      ],
      bids: [
        { user: "محمد علي", amount: 500, time: "منذ 2 ساعة" },
        { user: "سارة أحمد", amount: 450, time: "منذ 5 ساعات" },
        { user: "خالد محمود", amount: 400, time: "منذ 8 ساعات" },
      ],
    }

    // Simulate API call
    setTimeout(() => {
      setAuction(auctionData)
      setIsLoading(false)
    }, 100)
  }, [params.id])

  const nextImage = () => {
    if (!auction) return
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % auction.images.length)
  }

  const prevImage = () => {
    if (!auction) return
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + auction.images.length) % auction.images.length)
  }

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle bid submission
    alert(`تم تقديم مزايدة بمبلغ ${bidAmount} جنيه`)
  }

  // Show loading state
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <div className="container mx-auto py-8">
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">جاري تحميل بيانات المزاد...</p>
          </div>
        </div>
      </main>
    )
  }

  // Make sure auction data is available before rendering
  if (!auction) {
    return (
      <main>
        <Navbar />
        <div className="container mx-auto py-8">
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">لم يتم العثور على المزاد</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Navbar />

      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Images and details */}
          <div className="w-full lg:w-2/3">
            {/* Image gallery */}
            <div className="bg-white rounded-lg overflow-hidden mb-6">
              <div className="relative h-96 bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                  <button className="bg-white rounded-full p-2 shadow-md" onClick={prevImage}>
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  <button className="bg-white rounded-full p-2 shadow-md" onClick={nextImage}>
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                </div>
                <Image
                  src={auction.images[currentImageIndex] || "/placeholder.svg"}
                  alt={auction.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-4 flex gap-2 overflow-x-auto">
                {auction.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className={`w-20 h-20 relative flex-shrink-0 cursor-pointer border-2 rounded ${
                      index === currentImageIndex ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`صورة ${index + 1}`}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Auction details */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <Tabs defaultValue="details">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="details" className="flex-1">
                    التفاصيل
                  </TabsTrigger>
                  <TabsTrigger value="specs" className="flex-1">
                    المواصفات
                  </TabsTrigger>
                  <TabsTrigger value="seller" className="flex-1">
                    البائع
                  </TabsTrigger>
                  <TabsTrigger value="bids" className="flex-1">
                    المزايدات
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <h2 className="text-xl font-bold">{auction.title}</h2>
                  <p className="text-gray-700">{auction.description}</p>
                </TabsContent>

                <TabsContent value="specs">
                  <ul className="space-y-2">
                    {auction.specs.map((spec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="seller">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{auction.seller.name}</h3>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★★★★★</span>
                          <span className="text-sm text-gray-600">{auction.seller.rating}/5</span>
                        </div>
                        <p className="text-sm text-gray-600">عدد المزادات: {auction.seller.auctions}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      مراسلة البائع
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="bids">
                  <div className="space-y-4">
                    {auction.bids.map((bid: any, index: number) => (
                      <div key={index} className="flex justify-between items-center border-b pb-3">
                        <div>
                          <p className="font-medium">{bid.user}</p>
                          <p className="text-sm text-gray-500">{bid.time}</p>
                        </div>
                        <div className="text-lg font-semibold">{bid.amount} جنيه</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right column - Bid info and actions */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Bid information */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-600">سعر البداية</div>
                <div className="font-semibold">{auction.startingBid} جنيه</div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-600">أعلى مزايدة حالية</div>
                <div className="font-bold text-xl text-primary">{auction.currentBid} جنيه</div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-600">عدد المزايدات</div>
                <div className="font-semibold">{auction.bidCount}</div>
              </div>

              <div className="flex items-center gap-2 mb-6 text-red-500">
                <Clock className="h-5 w-5" />
                <span>متبقي: {auction.timeLeft}</span>
              </div>

              <form onSubmit={handleBid}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">قيمة المزايدة</label>
                  <Input
                    type="number"
                    min={auction.currentBid + 50}
                    placeholder={`الحد الأدنى ${auction.currentBid + 50} جنيه`}
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">* الحد الأدنى للمزايدة هو 50 جنيه فوق أعلى مزايدة</p>
                </div>
                <Button type="submit" className="w-full">
                  زايد الآن
                </Button>
              </form>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 gap-2">
                <Heart className="h-5 w-5" />
                <span>المفضلة</span>
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Share2 className="h-5 w-5" />
                <span>مشاركة</span>
              </Button>
            </div>

            {/* Similar auctions */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-4">مزادات مشابهة</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3">
                    <div className="w-20 h-20 bg-gray-100 rounded relative flex-shrink-0">
                      <Image
                        src="/placeholder.svg?height=80&width=80"
                        alt="مزاد مشابه"
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">مروحة سقف بريكس 52 بوصة</h4>
                      <p className="text-primary font-semibold text-sm">600 جنيه</p>
                      <p className="text-xs text-gray-500">متبقي: يومان</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

