"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuctionCard } from "@/components/auction-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, CreditCard, LogOut, Settings, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [userData, setUserData] = useState<any>(null)
  const [myBids, setMyBids] = useState<any[]>([])
  const [myAuctions, setMyAuctions] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])

  // Simulate data fetching
  useEffect(() => {
    // Sample user data
    const user = {
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "+20 123 456 7890",
      address: "123 شارع التحرير، القاهرة، مصر",
      joinDate: "15/3/2023",
      balance: 5000,
      avatar: "/placeholder.svg?height=100&width=100",
    }

    // Sample auctions data
    const bids = [
      {
        id: 1,
        title: "مروحة حائط بريكس مقاس 18 بوصة",
        description: "مروحة حائط بريكس مقاس 18 بوصة متاحة للمزايدة",
        specs: ["تتميز بإعدادات 3 سرعات وتنظيم الشبكات يعمل بمحرك قوي", "220 فولت / 50 هرتز"],
        currentBid: 500,
        myBid: 450,
        bidCount: 3,
        endDate: "25/5/2024",
        status: "active",
        images: ["/placeholder.svg?height=300&width=300"],
      },
      {
        id: 2,
        title: "غسالة أوتوماتيك سامسونج 7 كيلو",
        description: "غسالة أوتوماتيك سامسونج 7 كيلو بحالة ممتازة",
        specs: ["7 كيلو سعة الغسيل", "1200 دورة في الدقيقة"],
        currentBid: 3500,
        myBid: 3200,
        bidCount: 8,
        endDate: "30/5/2024",
        status: "outbid",
        images: ["/placeholder.svg?height=300&width=300"],
      },
      {
        id: 3,
        title: "تلفزيون سمارت إل جي 55 بوصة",
        description: "تلفزيون سمارت إل جي 55 بوصة بدقة 4K",
        specs: ["دقة 4K Ultra HD", "تقنية HDR"],
        currentBid: 6000,
        myBid: 6000,
        bidCount: 12,
        endDate: "2/6/2024",
        status: "won",
        images: ["/placeholder.svg?height=300&width=300"],
      },
    ]

    const auctions = [
      {
        id: 4,
        title: "ثلاجة نوفروست توشيبا 16 قدم",
        description: "ثلاجة نوفروست توشيبا 16 قدم بابين",
        specs: ["سعة 16 قدم", "تقنية No Frost"],
        currentBid: 7500,
        bidCount: 5,
        endDate: "5/6/2024",
        status: "active",
        images: ["/placeholder.svg?height=300&width=300"],
      },
      {
        id: 5,
        title: "مكيف سبليت كارير 1.5 حصان",
        description: "مكيف سبليت كارير 1.5 حصان بارد فقط",
        specs: ["1.5 حصان", "تبريد سريع"],
        currentBid: 4200,
        bidCount: 7,
        endDate: "10/6/2024",
        status: "ended",
        images: ["/placeholder.svg?height=300&width=300"],
      },
    ]

    const notifs = [
      {
        id: 1,
        message: "تم تجاوز مزايدتك على غسالة أوتوماتيك سامسونج 7 كيلو",
        time: "منذ ساعتين",
        read: false,
      },
      {
        id: 2,
        message: "تهانينا! لقد فزت بمزاد تلفزيون سمارت إل جي 55 بوصة",
        time: "منذ 5 ساعات",
        read: false,
      },
      {
        id: 3,
        message: "تم إضافة 500 جنيه إلى رصيدك",
        time: "منذ يوم",
        read: true,
      },
      {
        id: 4,
        message: "تم تأكيد استلام المنتج من قبل المشتري",
        time: "منذ 3 أيام",
        read: true,
      },
    ]

    const trans = [
      {
        id: 1,
        type: "deposit",
        amount: 2000,
        date: "15/4/2024",
        method: "بطاقة ائتمان",
        status: "completed",
      },
      {
        id: 2,
        type: "withdrawal",
        amount: 1500,
        date: "10/4/2024",
        method: "تحويل بنكي",
        status: "completed",
      },
      {
        id: 3,
        type: "purchase",
        amount: 6000,
        date: "5/4/2024",
        method: "رصيد الحساب",
        status: "completed",
        item: "تلفزيون سمارت إل جي 55 بوصة",
      },
      {
        id: 4,
        type: "sale",
        amount: 4200,
        date: "1/4/2024",
        method: "رصيد الحساب",
        status: "completed",
        item: "مكيف سبليت كارير 1.5 حصان",
      },
    ]

    // Simulate API call
    setTimeout(() => {
      setUserData(user)
      setMyBids(bids)
      setMyAuctions(auctions)
      setNotifications(notifs)
      setTransactions(trans)
      setIsLoading(false)
    }, 100)
  }, [])

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
      </main>
    )
  }

  // Make sure data is available before rendering
  if (!userData || !myBids || !myAuctions || !notifications || !transactions) {
    return (
      <main>
        <Navbar />
        <div className="container mx-auto py-8">
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">لم يتم العثور على البيانات</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Navbar />

      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex flex-col items-center mb-6">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{userData.name}</h2>
                <p className="text-gray-500 text-sm">عضو منذ {userData.joinDate}</p>
              </div>

              <div className="space-y-2">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <User className="ml-2 h-5 w-5" />
                  نظرة عامة
                </Button>
                <Button
                  variant={activeTab === "my-bids" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("my-bids")}
                >
                  <CreditCard className="ml-2 h-5 w-5" />
                  مزايداتي
                </Button>
                <Button
                  variant={activeTab === "my-auctions" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("my-auctions")}
                >
                  <CreditCard className="ml-2 h-5 w-5" />
                  مزاداتي
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="ml-2 h-5 w-5" />
                  الإشعارات
                </Button>
                <Button
                  variant={activeTab === "wallet" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("wallet")}
                >
                  <CreditCard className="ml-2 h-5 w-5" />
                  المحفظة
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="ml-2 h-5 w-5" />
                  الإعدادات
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-500">
                  <LogOut className="ml-2 h-5 w-5" />
                  تسجيل الخروج
                </Button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="w-full md:w-3/4">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">الرصيد الحالي</CardTitle>
                      <CardDescription>إجمالي الرصيد المتاح</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{userData.balance} جنيه</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">المزايدات النشطة</CardTitle>
                      <CardDescription>عدد المزايدات الحالية</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">المزادات المربوحة</CardTitle>
                      <CardDescription>عدد المزادات التي فزت بها</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1</div>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-xl font-bold mt-8 mb-4">آخر المزايدات</h2>
                <div className="bg-white rounded-lg p-6">
                  <div className="space-y-4">
                    {myBids.slice(0, 2).map((bid) => (
                      <div key={bid.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 relative">
                            <Image
                              src={bid.images[0] || "/placeholder.svg"}
                              alt={bid.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{bid.title}</h3>
                            <p className="text-sm text-gray-500">مزايدتك: {bid.myBid} جنيه</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              bid.status === "won"
                                ? "bg-green-500"
                                : bid.status === "outbid"
                                  ? "bg-red-500"
                                  : "bg-blue-500"
                            }
                          >
                            {bid.status === "won" ? "فائز" : bid.status === "outbid" ? "تم تجاوزك" : "نشط"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("my-bids")}>
                    عرض كل المزايدات
                  </Button>
                </div>

                <h2 className="text-xl font-bold mt-8 mb-4">آخر الإشعارات</h2>
                <div className="bg-white rounded-lg p-6">
                  <div className="space-y-4">
                    {notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg ${notification.read ? "bg-gray-50" : "bg-blue-50"} border`}
                      >
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-sm text-gray-500">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("notifications")}>
                    عرض كل الإشعارات
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "my-bids" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">مزايداتي</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myBids.map((auction) => (
                    <div key={auction.id} className="relative">
                      <AuctionCard {...auction} />
                      <div className="absolute top-2 left-2">
                        <Badge
                          className={
                            auction.status === "won"
                              ? "bg-green-500"
                              : auction.status === "outbid"
                                ? "bg-red-500"
                                : "bg-blue-500"
                          }
                        >
                          {auction.status === "won" ? "فائز" : auction.status === "outbid" ? "تم تجاوزك" : "نشط"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "my-auctions" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">مزاداتي</h2>
                  <Button>إضافة مزاد جديد</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myAuctions.map((auction) => (
                    <div key={auction.id} className="relative">
                      <AuctionCard {...auction} />
                      <div className="absolute top-2 left-2">
                        <Badge className={auction.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                          {auction.status === "active" ? "نشط" : "منتهي"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">الإشعارات</h2>
                <div className="bg-white rounded-lg p-6">
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg ${notification.read ? "bg-gray-50" : "bg-blue-50"} border`}
                      >
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-sm text-gray-500">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "wallet" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">المحفظة</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>الرصيد الحالي</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{userData.balance} جنيه</div>
                    </CardContent>
                  </Card>
                  <div className="flex gap-4">
                    <Button className="flex-1">إيداع</Button>
                    <Button variant="outline" className="flex-1">
                      سحب
                    </Button>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4">المعاملات الأخيرة</h3>
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-right">التاريخ</th>
                          <th className="px-4 py-3 text-right">النوع</th>
                          <th className="px-4 py-3 text-right">المبلغ</th>
                          <th className="px-4 py-3 text-right">الطريقة</th>
                          <th className="px-4 py-3 text-right">الحالة</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {transactions.map((transaction) => (
                          <tr key={transaction.id}>
                            <td className="px-4 py-3">{transaction.date}</td>
                            <td className="px-4 py-3">
                              {transaction.type === "deposit"
                                ? "إيداع"
                                : transaction.type === "withdrawal"
                                  ? "سحب"
                                  : transaction.type === "purchase"
                                    ? "شراء"
                                    : "بيع"}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={
                                  transaction.type === "deposit" || transaction.type === "sale"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {transaction.type === "deposit" || transaction.type === "sale" ? "+" : "-"}
                                {transaction.amount} جنيه
                              </span>
                            </td>
                            <td className="px-4 py-3">{transaction.method}</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                {transaction.status === "completed" ? "مكتمل" : "معلق"}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">الإعدادات</h2>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">المعلومات الشخصية</h3>
                  <form className="space-y-4">
                    <div className="text-right">
                      <label className="block text-gray-600 mb-1">الاسم بالكامل</label>
                      <Input type="text" defaultValue={userData.name} className="text-right" />
                    </div>
                    <div className="text-right">
                      <label className="block text-gray-600 mb-1">البريد الإلكتروني</label>
                      <Input type="email" defaultValue={userData.email} className="text-right" />
                    </div>
                    <div className="text-right">
                      <label className="block text-gray-600 mb-1">رقم الهاتف</label>
                      <Input type="tel" defaultValue={userData.phone} className="text-right" />
                    </div>
                    <div className="text-right">
                      <label className="block text-gray-600 mb-1">العنوان</label>
                      <Input type="text" defaultValue={userData.address} className="text-right" />
                    </div>
                    <Button>حفظ التغييرات</Button>
                  </form>

                  <div className="border-t my-8 pt-8">
                    <h3 className="text-xl font-semibold mb-4">تغيير كلمة المرور</h3>
                    <form className="space-y-4">
                      <div className="text-right">
                        <label className="block text-gray-600 mb-1">كلمة المرور الحالية</label>
                        <Input type="password" className="text-right" />
                      </div>
                      <div className="text-right">
                        <label className="block text-gray-600 mb-1">كلمة المرور الجديدة</label>
                        <Input type="password" className="text-right" />
                      </div>
                      <div className="text-right">
                        <label className="block text-gray-600 mb-1">تأكيد كلمة المرور الجديدة</label>
                        <Input type="password" className="text-right" />
                      </div>
                      <Button>تغيير كلمة المرور</Button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

