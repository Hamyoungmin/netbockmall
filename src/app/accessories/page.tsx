import Image from "next/image";

export default function AccessoriesPage() {
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
                <a href="/tablet" className="hover:text-gray-600 transition">태블릿</a>
                <a href="/accessories" className="hover:text-gray-600 transition font-semibold">악세서리</a>
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
      <section className="bg-black text-white py-2 mb-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-1">
            악세서리
          </h1>
          <p className="text-sm md:text-base text-gray-300 mb-2">
            당신의 디바이스를 더욱 특별하게
          </p>
          <div className="max-w-5xl mx-auto mt-2">
            <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden">
              <Image
                src="/Rectangle 2.png"
                alt="Accessories"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리별 제품 */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">오디오</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { name: 'AirPods Pro 2세대', price: '₩359,000', image: '/Rectangle 5.png' },
            { name: 'AirPods Max', price: '₩769,000', image: '/Rectangle 8.png' },
            { name: 'Galaxy Buds3 Pro', price: '₩329,000', image: '/Rectangle 5.png' },
            { name: 'Sony WH-1000XM5', price: '₩449,000', image: '/Rectangle 8.png' },
          ].map((product, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer">
              <div className="aspect-square bg-white rounded-xl mb-4 flex items-center justify-center overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-lg font-bold text-orange-600">{product.price}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-8">케이스 & 보호 액세서리</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { name: 'MagSafe 케이스', price: '₩69,000', image: '/Rectangle 9.png' },
            { name: '노트북 파우치', price: '₩45,000', image: '/Rectangle 35.png' },
            { name: '태블릿 키보드', price: '₩459,000', image: '/Rectangle 38.png' },
            { name: 'Apple Pencil', price: '₩199,000', image: '/Rectangle 36.png' },
          ].map((product, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer">
              <div className="aspect-square bg-white rounded-xl mb-4 flex items-center justify-center overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-lg font-bold text-orange-600">{product.price}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-8">충전 & 케이블</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'MagSafe 충전기', price: '₩59,000', image: '/Rectangle 6.png' },
            { name: 'USB-C 케이블', price: '₩29,000', image: '/Rectangle 6.png' },
            { name: '67W 충전 어댑터', price: '₩89,000', image: '/Rectangle 7.png' },
            { name: '무선 충전 패드', price: '₩69,000', image: '/Rectangle 7.png' },
          ].map((product, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer">
              <div className="aspect-square bg-white rounded-xl mb-4 flex items-center justify-center overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-lg font-bold text-orange-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-xs text-gray-600">
            <p>Copyright © 2025 넷북몰. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

