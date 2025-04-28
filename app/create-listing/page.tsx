"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"

export default function CreateListingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingBid: "",
    condition: "",
    category: "",
    location: "",
    mainSpec: "",
    secondarySpec: "",
    imageUrl: "",
    acceptTerms: false
  })

  const categories = [
    { id: "electronics", name: "الإلكترونيات" },
    { id: "home-appliances", name: "الأجهزة المنزلية" },
    { id: "kitchen", name: "أجهزة المطبخ" },
    { id: "computers", name: "أجهزة الكمبيوتر" },
    { id: "mobile", name: "الهواتف المحمولة" },
    { id: "audio", name: "أجهزة الصوت" },
    { id: "tv", name: "التلفزيونات" },
    { id: "gaming", name: "أجهزة الألعاب" },
  ]

  const conditions = [
    { id: "new", name: "جديد" },
    { id: "like-new", name: "كالجديد" },
    { id: "good", name: "جيد" },
    { id: "acceptable", name: "مقبول" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, acceptTerms: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.startingBid || !formData.acceptTerms) {
      alert("يرجى ملء جميع الحقول المطلوبة والموافقة على الشروط")
      return
    }

    try {
      setIsLoading(true)
      
      // In a real app, you would send this data to your API
      // For now, we'll just simulate a successful creation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSuccess(true)
    } catch (error) {
      alert("حدث خطأ أثناء إنشاء المزاد")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <main>
        <Navbar />
        
        <div className="container mx-auto py-8">
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold mb-4">تم إضافة منتجك بنجاح</h1>
            
            <p className="text-gray-600 mb-8">
              يمكنك متابعة المنتج الخاص بك من الملف الشخصي الخاص بك
            </p>
            
            <Button onClick={() => router.push("/")} className="w-full md:w-auto">
              العودة إلى الصفحة الرئيسية
            </Button>
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">إضافة مزاد</h1>
          <Plus className="h-6 w-6 text-primary" />
        </div>
        
        <div className="bg-white rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">اسم المنتج</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="أدخل اسم المنتج"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description">وصف المنتج</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="أدخل وصف تفصيلي للمنتج"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="mt-1"
                />
                <div className="text-xs text-gray-500 text-left mt-1">0/100</div>
              </div>
              
              <div>
                <Label htmlFor="condition">حدد حالة المنتج</Label>
                <Select 
                  value={formData.condition} 
                  onValueChange={(value) => handleSelectChange("condition", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="حدد حالة المنتج" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition.id} value={condition.id}>
                        {condition.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="location">العنوان</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="أدخل العنوان الموجود به المنتج"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="category">المحافظة</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="حدد المحافظة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cairo">القاهرة</SelectItem>
                    <SelectItem value="alexandria">الإسكندرية</SelectItem>
                    <SelectItem value="giza">الجيزة</SelectItem>
                    <SelectItem value="sharkia">الشرقية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="mainSpec">الاسم الفني للمنتج</Label>
                <Input
                  id="mainSpec"
                  name="mainSpec"
                  placeholder="أدخل اسم أو رقم أو كود المنتج"
                  value={formData.mainSpec}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="secondarySpec">الاسم الثانوي للمنتج</Label>
                <Input
                  id="secondarySpec"
                  name="secondarySpec"
                  placeholder="مثال وصف الجهاز بالكامل المدون"
                  value={formData.secondarySpec}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="startingBid">سعر المنتج</Label>
                <Input
                  id="startingBid"
                  name="startingBid"
                  type="number"
                  placeholder="أضف سعر أعلى"
                  value={formData.startingBid}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="imageUrl">صورة المنتج</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="أضف رابط الصورة"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox 
                  id="terms" 
                  checked={formData.acceptTerms}
                  onCheckedChange={handleCheckboxChange}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  لقد قمت بقراءة شروط الاستخدام والخصوصية وأوافق عليها
                </label>
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "جاري الإضافة..." : "إضافة"}
            </Button>
          </form>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
