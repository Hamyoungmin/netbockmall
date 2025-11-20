"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";

export default function ShippingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!trackingNumber.trim()) {
      setError("주문번호 또는 송장번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    setError("");

    // 주문번호 또는 송장번호로 검색
    const { data, error: queryError } = await supabase
      .from('shipping')
      .select('*')
      .or(`id.eq.${trackingNumber},tracking_number.eq.${trackingNumber}`)
      .single();

    setLoading(false);

    if (queryError || !data) {
      setError("배송 정보를 찾을 수 없습니다.");
      setShippingInfo(null);
      return;
    }

    setShippingInfo(data);
  };

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
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">배송 조회</h2>

        {/* 배송 조회 */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-3xl p-8 mb-12">
          <h3 className="text-2xl font-bold mb-4">배송 현황 확인</h3>
          <p className="mb-6 opacity-90">주문번호 또는 송장번호로 실시간 배송 현황을 확인하세요</p>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="주문번호 또는 송장번호를 입력하세요"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none"
            />
            <button 
              onClick={handleSearch}
              disabled={loading}
              className="px-8 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:bg-gray-100 transition disabled:opacity-50"
            >
              {loading ? '조회 중...' : '조회'}
            </button>
          </div>
          {error && (
            <p className="mt-4 text-white/90 text-sm">{error}</p>
          )}
        </div>

        {/* 조회 결과 */}
        {shippingInfo && (
          <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6">배송 정보</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">주문번호</span>
                <span className="font-semibold">{shippingInfo.id}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">수취인</span>
                <span className="font-semibold">{shippingInfo.customer_name}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">상품명</span>
                <span className="font-semibold">{shippingInfo.product_name}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">배송지</span>
                <span className="font-semibold text-right">{shippingInfo.address}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">택배사</span>
                <span className="font-semibold">{shippingInfo.courier}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">송장번호</span>
                <span className="font-semibold">{shippingInfo.tracking_number}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600">배송 상태</span>
                <span className={`font-semibold px-4 py-1 rounded-full ${
                  shippingInfo.status === '배송완료' ? 'bg-green-100 text-green-600' :
                  shippingInfo.status === '배송중' ? 'bg-blue-100 text-blue-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {shippingInfo.status}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 배송 안내 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 rounded-2xl p-6 text-center">
            <h3 className="font-bold text-lg mb-2">빠른 배송</h3>
            <p className="text-gray-600 text-sm">주문 후 2-3일 이내 도착</p>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 text-center">
            <h3 className="font-bold text-lg mb-2">무료 배송</h3>
            <p className="text-gray-600 text-sm">5만원 이상 구매 시</p>
          </div>

          <div className="bg-purple-50 rounded-2xl p-6 text-center">
            <h3 className="font-bold text-lg mb-2">실시간 추적</h3>
            <p className="text-gray-600 text-sm">배송 현황 실시간 확인</p>
          </div>
        </div>

        {/* 유의사항 */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-4">배송 유의사항</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 주문 시 입력하신 주소와 연락처를 다시 한번 확인해주세요</li>
            <li>• 배송 중 수취인 부재 시 경비실이나 무인택배함에 보관될 수 있습니다</li>
            <li>• 도서산간 지역은 배송이 1-2일 추가로 소요될 수 있습니다</li>
            <li>• 천재지변이나 물류 사정에 따라 배송이 지연될 수 있습니다</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
