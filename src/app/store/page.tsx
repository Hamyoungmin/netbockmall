"use client";

import Image from "next/image";
import Footer from "@/components/Footer";

export default function StorePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <a href="/" className="text-xl font-bold hover:text-gray-600 transition">넷북몰</a>
              <div className="hidden md:flex space-x-6 text-sm">
                <a href="/store" className="hover:text-gray-600 transition font-semibold">스토어</a>
                <a href="/macbook" className="hover:text-gray-600 transition">맥북</a>
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
              <a href="/cart" className="hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </a>
              <button 
                onClick={() => {
                  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                  window.location.href = isLoggedIn ? '/account' : '/login';
                }}
                className="hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 히어로 섹션 */}
      <section className="bg-gray-100 text-black py-2 mb-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-1">
            넷북몰 <span className="text-blue-600">스토어</span>
          </h1>
          <p className="text-sm md:text-base text-gray-700 mb-2">
            최고의 쇼핑경험을 만나보세요
          </p>
          <div className="max-w-5xl mx-auto mt-2">
            <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden">
              <Image
                src="/Rectangle 4.png"
                alt="Store"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="grid md:grid-cols-3 gap-8">
          {/* 카테고리 카드들 */}
          <a href="/macbook" className="group bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer">
            <div className="aspect-square bg-white rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 37.png"
                alt="맥북"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition">맥북</h3>
            <p className="text-gray-600">강력한 성능의 맥북 시리즈</p>
          </a>

          <a href="/notebook" className="group bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer">
            <div className="aspect-square bg-white rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 45.png"
                alt="노트북"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition">노트북</h3>
            <p className="text-gray-600">다양한 브랜드의 노트북</p>
          </a>

          <a href="/tablet" className="group bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer">
            <div className="aspect-square bg-white rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 39.png"
                alt="태블릿"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition">태블릿</h3>
            <p className="text-gray-600">휴대성과 성능을 겸비한 태블릿</p>
          </a>

          <a href="/accessories" className="group bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer">
            <div className="aspect-square bg-white rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 5.png"
                alt="악세서리"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition">악세서리</h3>
            <p className="text-gray-600">다양한 IT 악세서리</p>
          </a>

          <div className="group bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer">
            <div className="aspect-square bg-white/10 rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 4.png"
                alt="특별 할인"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2">특별 할인</h3>
            <p className="text-white/90">지금 확인하세요</p>
          </div>

          <div className="group bg-gradient-to-br from-pink-500 to-orange-500 text-white rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer">
            <div className="aspect-square bg-white/10 rounded-2xl mb-6 flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 2.png"
                alt="신제품"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2">신제품</h3>
            <p className="text-white/90">최신 제품을 만나보세요</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

