import { Navbar } from "@/components/navbar"
import { AuctionCard } from "@/components/auction-card"
import { Footer } from "@/components/footer"
import Image from "next/image"

export default function Home() {
  const featuredAuctions = [
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
      title: "مروحة حائط بريكس مقاس 18 بوصة",
      description: "مروحة حائط بريكس مقاس 18 بوصة متاحة للمزايدة",
      specs: ["تتميز بإعدادات 3 سرعات وتنظيم الشبكات يعمل بمحرك قوي", "220 فولت / 50 هرتز"],
      currentBid: 500,
      bidCount: 3,
      endDate: "25/5/2024",
      images: ["/placeholder.svg?height=300&width=300"],
    },
    {
      id: 3,
      title: "مروحة حائط بريكس مقاس 18 بوصة",
      description: "مروحة حائط بريكس مقاس 18 بوصة متاحة للمزايدة",
      specs: ["تتميز بإعدادات 3 سرعات وتنظيم الشبكات يعمل بمحرك قوي", "220 فولت / 50 هرتز"],
      currentBid: 500,
      bidCount: 3,
      endDate: "25/5/2024",
      images: ["/placeholder.svg?height=300&width=300"],
    },
  ]

  return (
    <main>
      <Navbar />

      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-12">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-4">مزادي... حيث تبدأ المزايدات وتنتهي بأفضل الصفقات!</h1>
              <p className="text-gray-600 mb-6">
                منصة مزادات إلكترونية توفر لك الشفافية والأمان، حيث يمكنك بيع وشراء الأجهزة الكهربائية بأفضل الأسعار!
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="مزادي"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">مزادات شائعة الان</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAuctions.map((auction) => (
            <AuctionCard key={auction.id} {...auction} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}

