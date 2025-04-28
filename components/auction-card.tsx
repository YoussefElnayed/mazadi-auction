"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

interface AuctionCardProps {
  id?: number | string
  title: string
  description: string
  specs: string[]
  currentBid: number
  bidCount: number
  endDate: string
  images: string[]
}

export function AuctionCard({ id = 1, title, description, specs, currentBid, bidCount, endDate, images }: AuctionCardProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const nextImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }
  };

  const handleDetailsClick = () => {
    router.push(`/auctions/${id}`);
  };

  const handleBidClick = () => {
    router.push(`/auctions/${id}?bid=true`);
  };

  // Return a loading placeholder if not mounted yet
  if (!mounted) {
    return (
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm h-[500px] animate-pulse">
        <div className="h-64 bg-gray-200"></div>
        <div className="p-4 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-full mt-6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]">
      <div className="relative h-64 bg-gray-100 group">
        {images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
            <button
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors transform hover:scale-110 active:scale-95"
              onClick={prevImage}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <button
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors transform hover:scale-110 active:scale-95"
              onClick={nextImage}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
        )}
        <Image
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt={title}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="space-y-1 mb-4">
          {specs.slice(0, 2).map((spec, index) => (
            <p key={index} className="text-sm line-clamp-1 flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2 opacity-75"></span>
              {spec}
            </p>
          ))}
          {specs.length > 2 && (
            <p className="text-xs text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              +{specs.length - 2} مواصفات أخرى
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-100 mr-1"></span>
              عدد المزايدين: <span className="font-medium mx-1">{bidCount}</span>
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold flex items-center" style={{ color: 'hsl(142, 76%, 47%)' }}>
              اعلى سعر:
              <span className="mx-1 text-base transition-all duration-300 hover:scale-110"
                style={{
                  textShadow: '0 0 1px rgba(0,0,0,0.1)',
                  display: 'inline-block'
                }}
              >
                {currentBid}
              </span>
              جنية
            </p>
          </div>
        </div>

        <div className="text-sm mb-4 bg-gray-50 p-2 rounded-md border border-gray-100">
          <p className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-red-100 mr-1"></span>
            تاريخ الانتهاء: <span className="font-medium mx-1">{endDate}</span>
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
            onClick={handleDetailsClick}
          >
            التفاصيل
          </Button>
          <Button
            className="flex-1 transition-all duration-300 hover:opacity-90 transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: 'hsl(142, 76%, 47%)',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
            onClick={handleBidClick}
          >
            زايد الان
          </Button>
        </div>
      </div>
    </div>
  )
}

