import Image from "next/image";

export default function NotebookPage() {
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
                <a href="/notebook" className="hover:text-gray-600 transition font-semibold">노트북</a>
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
            노트북
          </h1>
          <p className="text-sm md:text-base text-gray-700 mb-2">
            다양한 브랜드의 고성능 노트북
          </p>
          <div className="max-w-5xl mx-auto mt-2">
            <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden">
              <Image
                src="/Rectangle 45.png"
                alt="Notebook"
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
            { name: '삼성 갤럭시북4 프로', price: '₩2,190,000', desc: 'Intel Core Ultra 7, 16인치', image: '/1435_2025031921540423.jpg' },
            { name: '삼성 갤럭시북4 울트라', price: '₩2,590,000', desc: 'Intel Core Ultra 9, 16인치 AMOLED', image: '/2120_3030_532.jpg' },
            { name: '삼성 갤럭시북4', price: '₩1,290,000', desc: 'Intel Core 5, 15.6인치', image: '/made-in-china.webp' },
            { name: '삼성 갤럭시북3 프로 360', price: '₩2,490,000', desc: 'Intel i7, 16인치 2-in-1', image: '/image_readtop_2020_925135_15995052644345695.jpg' },
            { name: '삼성 갤럭시북3 울트라', price: '₩2,790,000', desc: 'Intel i7, 16인치 AMOLED', image: '/레노버-2022-아이디어패드-노트북Arctic-Grey-·-SLIM3-15ITL6.png' },
            { name: '삼성 갤럭시북2 프로', price: '₩1,890,000', desc: 'Intel i5, 15.6인치', image: '/MuwaDiz-FZztF8P-aJSdosnAg8YxDDHtDQNjwrRlDMcxWUFpdv9SXaf3Y4lXe_NJtNd_9nd0DNDuDx-6LNg2hg.webp' },
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

