"use client";

import Image from "next/image";
import Footer from "@/components/Footer";

export default function SupportPage() {
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
                <a href="/support" className="hover:text-gray-600 transition font-semibold">고객지원</a>
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

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all cursor-pointer">
            <h3 className="text-2xl font-semibold mb-4">실시간 채팅</h3>
            <p className="text-gray-600 mb-6">전문 상담원과 실시간으로 대화하세요</p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition">
              채팅 시작
            </button>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all cursor-pointer">
            <h3 className="text-2xl font-semibold mb-4">전화 상담</h3>
            <p className="text-gray-600 mb-6">1588-1234 (평일 9시-18시)</p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition">
              전화 걸기
            </button>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 text-center hover:shadow-xl transition-all cursor-pointer">
            <h3 className="text-2xl font-semibold mb-4">이메일 문의</h3>
            <p className="text-gray-600 mb-6">24시간 이내에 답변드립니다</p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition">
              이메일 보내기
            </button>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="text-4xl font-bold text-center mb-12">자주 묻는 질문</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { id: '1', q: '배송은 얼마나 걸리나요?', a: '주문 후 2-3일 이내에 배송됩니다.' },
            { id: '2', q: '반품/교환은 어떻게 하나요?', a: '제품 수령 후 14일 이내 무료 반품이 가능합니다.' },
            { id: '3', q: '할부 결제가 가능한가요?', a: '네, 2-12개월 무이자 할부가 가능합니다.' },
            { id: '4', q: '제품 보증기간은 어떻게 되나요?', a: '모든 제품은 1년 무상 보증이 제공됩니다.' },
            { id: '5', q: '학생 할인이 있나요?', a: '학생증 제시 시 최대 20% 할인을 받으실 수 있습니다.' },
          ].map((faq) => (
            <a key={faq.id} href={`/faq-detail/${faq.id}`} className="block bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition cursor-pointer">
              <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </a>
          ))}
        </div>

        {/* 지점 정보 */}
        <div className="mt-16 bg-gray-900 text-white rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">매장 방문 상담</h2>
          <p className="text-xl mb-8">가까운 넷북몰 매장을 방문해보세요</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-2">강남점</h4>
              <p className="text-gray-300 text-sm">서울시 강남구 테헤란로 123</p>
              <p className="text-gray-300 text-sm">02-1234-5678</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">홍대점</h4>
              <p className="text-gray-300 text-sm">서울시 마포구 양화로 456</p>
              <p className="text-gray-300 text-sm">02-2345-6789</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">부산점</h4>
              <p className="text-gray-300 text-sm">부산시 해운대구 센텀로 789</p>
              <p className="text-gray-300 text-sm">051-3456-7890</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

