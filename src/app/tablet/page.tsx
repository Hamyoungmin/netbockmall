import Image from "next/image";
import Footer from "@/components/Footer";

export default function TabletPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <a href="/" className="text-xl font-bold hover:text-gray-600 transition">넷북몰</a>
              <div className="hidden md:flex space-x-6 text-sm">
                <a href="/store" className="hover:text-gray-600 transition">스토어</a>
                <a href="/macbook" className="hover:text-gray-600 transition">맥북</a>
                <a href="/notebook" className="hover:text-gray-600 transition">노트북</a>
                <a href="/tablet" className="hover:text-gray-600 transition font-semibold">태블릿</a>
                <a href="/accessories" className="hover:text-gray-600 transition">악세서리</a>
                <a href="/support" className="hover:text-gray-600 transition">고객지원</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
              <a href="/login" className="hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="bg-gray-100 text-black py-2 mb-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-1">
            태블릿
          </h1>
          <p className="text-sm md:text-base text-gray-700 mb-2">
            휴대성과 성능을 겸비한 스마트 디바이스
          </p>
          <div className="max-w-5xl mx-auto mt-2">
            <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden">
              <Image
                src="/Rectangle 46.png"
                alt="Tablet"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 제품 목록 */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Lenovo Tab P12 Pro', price: '₩1,290,000', desc: '12.6인치 AMOLED, Snapdragon 870', image: '/6ecdc07f-96ca-4bdf-bb97-73520ec62f0d.jpg' },
            { name: 'Samsung Galaxy Tab S9 FE', price: '₩729,000', desc: '10.9인치, Exynos 1380, S펜 포함', image: '/0046070050__ZAE40029KR__M_640_640.jpg' },
            { name: 'iPad Air 11" M2', price: '₩899,000', desc: 'M2 칩, 11인치 Liquid Retina', image: '/f68db29bf3cdfc2f75b82ea78f60b297.jpg' },
            { name: 'Xiaomi Pad 6 Pro', price: '₩689,000', desc: '11인치, Snapdragon 8+ Gen 1', image: '/36375_32275_120.jpg' },
            { name: 'Lenovo Tab M10 Plus', price: '₩449,000', desc: '10.6인치 FHD+, MediaTek Helio G80', image: '/2023110110193994100_l.jpg' },
            { name: 'Galaxy Tab A9+', price: '₩379,000', desc: '11인치, Snapdragon 695, 5G 지원', image: '/images.jpg' },
          ].map((product, idx) => (
            <div key={idx} className="bg-gray-50 rounded-3xl p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="aspect-square bg-white rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.desc}</p>
              <p className="text-2xl font-bold text-purple-600 mb-4">{product.price}</p>
              <button className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition">
                구매하기
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

