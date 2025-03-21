import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface AuctionCardProps {
  title: string
  description: string
  specs: string[]
  currentBid: number
  bidCount: number
  endDate: string
  images: string[]
}

export function AuctionCard({ title, description, specs, currentBid, bidCount, endDate, images }: AuctionCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="relative h-64 bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
          <button className="bg-white rounded-full p-2 shadow-md">
            <ChevronRight className="h-6 w-6" />
          </button>
          <button className="bg-white rounded-full p-2 shadow-md">
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>
        <Image src={images[0] || "/placeholder.svg"} alt={title} fill className="object-contain" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        <div className="space-y-1 mb-4">
          {specs.map((spec, index) => (
            <p key={index} className="text-sm">
              {spec}
            </p>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm">عدد المزايدين: {bidCount}</p>
          </div>
          <div>
            <p className="text-sm">اعلى سعر: {currentBid} جنية</p>
          </div>
        </div>

        <div className="text-sm mb-4">
          <p>تاريخ الانتهاء: {endDate}</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            التفاصيل
          </Button>
          <Button className="flex-1">زايد الان</Button>
        </div>
      </div>
    </div>
  )
}

