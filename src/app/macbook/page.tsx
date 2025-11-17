import Image from "next/image";
import Footer from "@/components/Footer";

export default function MacbookPage() {
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
                <a href="/macbook" className="hover:text-gray-600 transition font-semibold">맥북</a>
                <a href="/notebook" className="hover:text-gray-600 transition">노트북</a>
                <a href="/tablet" className="hover:text-gray-600 transition">태블릿</a>
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
            MacBook
          </h1>
          <p className="text-sm md:text-base text-gray-700 mb-2">
            강력한 성능. 완벽한 휴대성.
          </p>
          <div className="max-w-5xl mx-auto mt-2">
            <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden">
              <Image
                src="/Rectangle 37.png"
                alt="MacBook"
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
            { name: 'MacBook Air 13" M3', price: '₩1,590,000', desc: '8코어 CPU, 8GB 통합메모리, 256GB SSD', image: '/mba_13_15_140e630d3_2x.jpg' },
            { name: 'MacBook Air 15" M3', price: '₩1,890,000', desc: '8코어 CPU, 16GB 통합메모리, 512GB SSD', image: '/macbook-air-og-202503.jpg' },
            { name: 'MacBook Pro 14" M3', price: '₩2,390,000', desc: '8코어 CPU, 10코어 GPU, 512GB SSD', image: '/a548918e67ad45723edcc50c4494bebf.jpg' },
            { name: 'MacBook Pro 14" M3 Pro', price: '₩3,190,000', desc: '11코어 CPU, 14코어 GPU, 1TB SSD', image: '/22711-54083-sample.jpg' },
            { name: 'MacBook Pro 16" M3 Max', price: '₩4,990,000', desc: '14코어 CPU, 30코어 GPU, 1TB SSD', image: '/refurb-mbp16touch-silver-gallery-2019_GEO_KR.jpg' },
            { name: 'MacBook Pro 16" M3 Max', price: '₩5,990,000', desc: '16코어 CPU, 40코어 GPU, 2TB SSD', image: '/2017111644391181.png' },
          ].map((product, idx) => (
            <div key={idx} className="bg-gray-50 rounded-3xl p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="aspect-video bg-white rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.desc}</p>
              <p className="text-2xl font-bold text-blue-600 mb-4">{product.price}</p>
              <button className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition">
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

