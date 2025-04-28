"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChevronLeft, ChevronRight, Clock, Heart, Share2, User, MessageCircle, AlertTriangle, CheckCircle2, Trophy } from "lucide-react"
import Image from "next/image"

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [bidAmount, setBidAmount] = useState("")
  const [commentText, setCommentText] = useState("")
  const [auction, setAuction] = useState<any>(null)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // For demo purposes, assume user is logged in
  const [isCreator, setIsCreator] = useState(false) // For demo purposes
  const [isWinner, setIsWinner] = useState(false) // For demo purposes
  const [bidError, setBidError] = useState("")
  const [comments, setComments] = useState<any[]>([])

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
      status: "active", // active or closed
      category: "home-appliances",
      seller: {
        name: "أحمد محمد",
        rating: 4.8,
        auctions: 15,
        id: "seller123"
      },
      winner: {
        name: "محمد علي",
        id: "user456"
      },
      images: [
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
      ],
      bids: [
        { user: "محمد علي", userId: "user456", amount: 500, time: "منذ 2 ساعة" },
        { user: "سارة أحمد", userId: "user789", amount: 450, time: "منذ 5 ساعات" },
        { user: "خالد محمود", userId: "user101", amount: 400, time: "منذ 8 ساعات" },
      ],
    }

    // Sample comments data
    const commentsData = [
      {
        id: 1,
        user: "محمد علي",
        userId: "user456",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "هل المروحة تعمل بشكل جيد؟ وهل هناك أي عيوب؟",
        time: "منذ 3 أيام"
      },
      {
        id: 2,
        user: "أحمد محمد",
        userId: "seller123",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "نعم، المروحة تعمل بشكل ممتاز ولا توجد أي عيوب. تم استخدامها لمدة 6 أشهر فقط.",
        time: "منذ 3 أيام",
        isOwner: true
      },
      {
        id: 3,
        user: "سارة أحمد",
        userId: "user789",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "هل يمكن توصيلها إلى المنصورة؟",
        time: "منذ يومين"
      },
      {
        id: 4,
        user: "أحمد محمد",
        userId: "seller123",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "نعم، يمكن التوصيل إلى المنصورة مقابل رسوم إضافية.",
        time: "منذ يومين",
        isOwner: true
      }
    ]

    // Simulate API call
    setTimeout(() => {
      setAuction(auctionData)
      setComments(commentsData)

      // For demo purposes, randomly set these states
      setIsInWatchlist(Math.random() > 0.5)
      setIsCreator(auctionData.seller.id === "seller123") // Assume current user is seller123
      setIsWinner(auctionData.status === "closed" && auctionData.winner.id === "user456") // Assume current user is user456

      setIsLoading(false)
    }, 500)
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

    // Basic validation
    if (!bidAmount) {
      setBidError("يرجى إدخال قيمة المزايدة")
      return
    }

    const bidValue = parseInt(bidAmount)

    if (isNaN(bidValue)) {
      setBidError("يرجى إدخال قيمة صحيحة")
      return
    }

    if (bidValue <= auction.currentBid) {
      setBidError("يجب أن تكون قيمة المزايدة أكبر من المزايدة الحالية")
      return
    }

    if (bidValue < auction.startingBid) {
      setBidError("يجب أن تكون قيمة المزايدة أكبر من أو تساوي سعر البداية")
      return
    }

    // Clear any previous errors
    setBidError("")

    // In a real app, you would send this to your API
    alert(`تم تقديم مزايدة بمبلغ ${bidAmount} جنيه`)

    // Update the UI to reflect the new bid
    setAuction({
      ...auction,
      currentBid: bidValue,
      bidCount: auction.bidCount + 1,
      bids: [
        { user: "أنت", userId: "currentUser", amount: bidValue, time: "الآن" },
        ...auction.bids
      ]
    })

    // Reset the bid amount
    setBidAmount("")
  }

  const toggleWatchlist = () => {
    // In a real app, you would send this to your API
    setIsInWatchlist(!isInWatchlist)
    alert(isInWatchlist ? "تمت إزالة المزاد من المفضلة" : "تمت إضافة المزاد إلى المفضلة")
  }

  const handleCloseAuction = () => {
    // In a real app, you would send this to your API
    if (confirm("هل أنت متأكد من إغلاق المزاد؟ سيتم تحديد الفائز بناءً على أعلى مزايدة.")) {
      setAuction({
        ...auction,
        status: "closed",
        winner: {
          name: auction.bids[0].user,
          id: auction.bids[0].userId
        }
      })
      alert("تم إغلاق المزاد بنجاح")
    }
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!commentText.trim()) {
      return
    }

    // In a real app, you would send this to your API
    const newComment = {
      id: comments.length + 1,
      user: "أنت",
      userId: "currentUser",
      avatar: "/placeholder.svg?height=40&width=40",
      text: commentText,
      time: "الآن"
    }

    setComments([...comments, newComment])
    setCommentText("")
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
        {/* Winner notification */}
        {auction.status === "closed" && isWinner && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <Trophy className="h-5 w-5 text-green-500" />
            <AlertTitle className="text-green-700">تهانينا! لقد فزت بهذا المزاد</AlertTitle>
            <AlertDescription className="text-green-600">
              سيتواصل معك البائع قريباً لإتمام عملية البيع.
            </AlertDescription>
          </Alert>
        )}

        {/* Closed auction notification */}
        {auction.status === "closed" && !isWinner && (
          <Alert className="mb-6 bg-gray-50 border-gray-200">
            <CheckCircle2 className="h-5 w-5 text-gray-500" />
            <AlertTitle>تم إغلاق هذا المزاد</AlertTitle>
            <AlertDescription>
              تم إغلاق هذا المزاد وفاز به {auction.winner.name}.
            </AlertDescription>
          </Alert>
        )}

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
                  <TabsTrigger value="comments" className="flex-1">
                    التعليقات
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
                    {auction.bids.length > 0 ? (
                      auction.bids.map((bid: any, index: number) => (
                        <div key={index} className="flex justify-between items-center border-b pb-3">
                          <div>
                            <p className="font-medium">{bid.user}</p>
                            <p className="text-sm text-gray-500">{bid.time}</p>
                          </div>
                          <div className="text-lg font-semibold">{bid.amount} جنيه</div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">لا توجد مزايدات حتى الآن</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="comments">
                  <div className="space-y-6">
                    {comments.length > 0 ? (
                      comments.map((comment) => (
                        <div key={comment.id} className="border-b pb-4">
                          <div className="flex items-start gap-3">
                            <Avatar>
                              <AvatarImage src={comment.avatar} alt={comment.user} />
                              <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">{comment.user}</span>
                                  {comment.isOwner && (
                                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded">البائع</span>
                                  )}
                                </div>
                                <span className="text-xs text-gray-500">{comment.time}</span>
                              </div>
                              <p className="text-gray-700">{comment.text}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">لا توجد تعليقات حتى الآن</p>
                    )}

                    {isLoggedIn && (
                      <div className="mt-6">
                        <form onSubmit={handleAddComment}>
                          <div className="mb-3">
                            <Textarea
                              placeholder="اكتب تعليقك هنا..."
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              rows={3}
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            إضافة تعليق
                          </Button>
                        </form>
                      </div>
                    )}
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

              {auction.status === "active" && (
                <div className="flex items-center gap-2 mb-6 text-red-500">
                  <Clock className="h-5 w-5" />
                  <span>متبقي: {auction.timeLeft}</span>
                </div>
              )}

              {auction.status === "closed" && (
                <div className="flex items-center gap-2 mb-6 text-gray-500">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>تم إغلاق المزاد</span>
                </div>
              )}

              {isLoggedIn && auction.status === "active" && !isCreator && (
                <form onSubmit={handleBid}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">قيمة المزايدة</label>
                    {bidError && (
                      <p className="text-sm text-red-500 mb-2">{bidError}</p>
                    )}
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
              )}

              {isCreator && auction.status === "active" && (
                <Button onClick={handleCloseAuction} variant="outline" className="w-full">
                  إغلاق المزاد
                </Button>
              )}

              {!isLoggedIn && auction.status === "active" && (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="mb-3 text-gray-600">يجب تسجيل الدخول للمزايدة</p>
                  <Button className="w-full">تسجيل الدخول</Button>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex gap-4">
                {isLoggedIn && (
                  <Button
                    variant="outline"
                    className={`flex-1 gap-2 ${isInWatchlist ? 'bg-primary/10' : ''}`}
                    onClick={toggleWatchlist}
                  >
                    <Heart className={`h-5 w-5 ${isInWatchlist ? 'fill-primary text-primary' : ''}`} />
                    <span>{isInWatchlist ? 'إزالة من المفضلة' : 'أضف للمفضلة'}</span>
                  </Button>
                )}
                <Button variant="outline" className="flex-1 gap-2">
                  <Share2 className="h-5 w-5" />
                  <span>مشاركة</span>
                </Button>
              </div>
            </div>

            {/* Category info */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-2">معلومات إضافية</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">الفئة:</span>
                  <span>{auction.category === "home-appliances" ? "الأجهزة المنزلية" : auction.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">تاريخ الانتهاء:</span>
                  <span>{auction.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">الحالة:</span>
                  <span>{auction.status === "active" ? "نشط" : "مغلق"}</span>
                </div>
              </div>
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

      <Footer />
    </main>
  )
}

