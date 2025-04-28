"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuctionCard } from "@/components/auction-card"
import { Button } from "@/components/ui/button"
import { Heart, Trash2 } from "lucide-react"
import Link from "next/link"

export default function WatchlistPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [watchlist, setWatchlist] = useState<any[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(true) // For demo purposes, assume user is logged in

  // Simulate data fetching
  useEffect(() => {
    // Sample watchlist data
    const watchlistData = [
      {
        id: 1,
        title: "مروحة حائط بريكس مقاس 18 بوصة",
        description: "مروحة حائط بريكس مقاس 18 بوصة متاحة للمزايدة",
        specs: ["تتميز بإعدادات 3 سرعات وتنظيم الشبكات يعمل بمحرك قوي", "220 فولت / 50 هرتز"],
        currentBid: 500,
        bidCount: 3,
        endDate: "25/5/2024",
        timeLeft: "3 أيام",
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
        timeLeft: "8 أيام",
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
        timeLeft: "6 أيام",
        images: ["/placeholder.svg?height=300&width=300"],
      },
    ]

    // Simulate API call
    setTimeout(() => {
      setWatchlist(watchlistData)
      setIsLoading(false)
    }, 500)
  }, [])

  const removeFromWatchlist = (id: number) => {
    setWatchlist(watchlist.filter(item => item.id !== id))
  }

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

  // Show login prompt if user is not logged in
  if (!isLoggedIn) {
    return (
      <main>
        <Navbar />
        <div className="container mx-auto py-8">
          <div className="bg-white rounded-lg p-8 max-w-md mx-auto text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">قائمة المفضلة</h1>
            <p className="text-gray-600 mb-6">
              يرجى تسجيل الدخول لعرض قائمة المفضلة الخاصة بك
            </p>
            <div className="flex gap-4 justify-center">
              <Button>تسجيل الدخول</Button>
              <Button variant="outline">إنشاء حساب</Button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  // Show empty state if watchlist is empty
  if (watchlist.length === 0) {
    return (
      <main>
        <Navbar />
        <div className="container mx-auto py-8">
          <div className="bg-white rounded-lg p-8 max-w-md mx-auto text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">قائمة المفضلة فارغة</h1>
            <p className="text-gray-600 mb-6">
              لم تقم بإضافة أي مزادات إلى قائمة المفضلة بعد
            </p>
            <Link href="/auctions">
              <Button>استعرض المزادات</Button>
            </Link>
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">قائمة المفضلة</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <Heart className="h-5 w-5" />
            <span>{watchlist.length} مزاد</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((auction) => (
            <div key={auction.id} className="relative">
              <AuctionCard {...auction} />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 left-2 bg-white rounded-full h-8 w-8 p-0"
                onClick={() => removeFromWatchlist(auction.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
