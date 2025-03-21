import { Navbar } from "@/components/navbar"
import Image from "next/image"

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-12">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">تعريف بمنصة مزادي</h1>

            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="منصة مزادي"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold mb-4">من نحن</h2>
                <p className="text-gray-700 mb-4">
                  مزادي هي منصة مزادات إلكترونية متخصصة في بيع وشراء الأجهزة الكهربائية بنظام المزاد العلني. تأسست
                  المنصة في عام 2023 بهدف توفير بيئة آمنة وشفافة للمزادات الإلكترونية في مصر والعالم العربي.
                </p>
                <p className="text-gray-700">
                  نسعى في مزادي إلى تقديم تجربة مستخدم فريدة تجمع بين سهولة الاستخدام والأمان والشفافية، مما يتيح
                  للمستخدمين فرصة الحصول على أفضل الأسعار للأجهزة الكهربائية سواء كانوا بائعين أو مشترين.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center">رؤيتنا ورسالتنا</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3 text-primary">رؤيتنا</h3>
                  <p className="text-gray-700">
                    أن نكون المنصة الرائدة في مجال المزادات الإلكترونية للأجهزة الكهربائية في الشرق الأوسط، ونسعى لتغيير
                    مفهوم المزادات التقليدية وجعلها أكثر سهولة وأماناً وشفافية.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3 text-primary">رسالتنا</h3>
                  <p className="text-gray-700">
                    توفير منصة مزادات إلكترونية موثوقة تتيح للمستخدمين بيع وشراء الأجهزة الكهربائية بأفضل الأسعار، مع
                    ضمان أعلى معايير الأمان والشفافية والمصداقية في جميع المعاملات.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center">لماذا تختار مزادي؟</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">الأمان والثقة</h3>
                  <p className="text-gray-700">
                    نضمن أمان جميع المعاملات ونتحقق من هوية المستخدمين لتوفير بيئة آمنة للمزادات.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">أفضل الأسعار</h3>
                  <p className="text-gray-700">
                    نظام المزاد يضمن حصول البائعين على أفضل سعر والمشترين على أفضل قيمة للأجهزة الكهربائية.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">سهولة الاستخدام</h3>
                  <p className="text-gray-700">
                    واجهة مستخدم بسيطة وسهلة الاستخدام تتيح للجميع المشاركة في المزادات بكل سهولة.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-center">فريق العمل</h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((member) => (
                  <div key={member} className="text-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden relative">
                      <Image
                        src={`/placeholder.svg?height=128&width=128`}
                        alt="عضو الفريق"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold">أحمد محمد</h3>
                    <p className="text-gray-600 text-sm">المدير التنفيذي</p>
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

