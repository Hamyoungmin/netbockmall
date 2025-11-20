"use client";

import Image from "next/image";

export default function AboutPage() {
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

      {/* 메인 콘텐츠 */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* 회사 소개 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">우리의 이야기</h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            넷북몰은 2020년에 설립된 프리미엄 IT 제품 전문 쇼핑몰입니다. 
            우리는 최고 품질의 노트북, 태블릿, 악세서리를 합리적인 가격에 제공하며, 
            고객 만족을 최우선으로 생각합니다.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            전문 상담원과 함께하는 1:1 맞춤 상담, 빠른 배송, 철저한 A/S를 통해 
            고객 여러분께 최상의 쇼핑 경험을 선사하고 있습니다.
          </p>
        </div>

        {/* 핵심 가치 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-blue-50 rounded-3xl p-8 text-center">
            <h3 className="text-xl font-bold mb-3">최고의 품질</h3>
            <p className="text-gray-600">엄선된 제품만을 취급합니다</p>
          </div>

          <div className="bg-green-50 rounded-3xl p-8 text-center">
            <h3 className="text-xl font-bold mb-3">합리적인 가격</h3>
            <p className="text-gray-600">최상의 가성비를 제공합니다</p>
          </div>

          <div className="bg-purple-50 rounded-3xl p-8 text-center">
            <h3 className="text-xl font-bold mb-3">고객 만족</h3>
            <p className="text-gray-600">언제나 고객을 최우선으로</p>
          </div>
        </div>

        {/* 통계 */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-3xl p-12 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-sm opacity-90">누적 고객</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">고객 만족도</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-sm opacity-90">제품 종류</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">고객 지원</div>
            </div>
          </div>
        </div>

        {/* 연락처 */}
        <div className="bg-gray-50 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">문의하기</h3>
          <div className="space-y-4">
            <div>
              <div className="font-semibold">고객센터</div>
              <div className="text-gray-600">1588-1234 (평일 9시-18시)</div>
            </div>
            <div>
              <div className="font-semibold">이메일</div>
              <div className="text-gray-600">support@netbookmall.com</div>
            </div>
            <div>
              <div className="font-semibold">본사</div>
              <div className="text-gray-600">서울시 강남구 테헤란로 123</div>
            </div>
          </div>
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

