"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');

    if (!isLoggedIn || !userEmail) {
      // 로그인 안 되어 있으면 로그인 페이지로
      window.location.href = '/login';
      return;
    }

    // Supabase에서 사용자 정보 가져오기
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('email', userEmail)
        .single();

      if (data) {
        setUser(data);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    alert('로그아웃되었습니다.');
    window.location.href = '/';
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
  }

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
              <a href="/account" className="hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">내 정보</h1>

        {/* 사용자 프로필 카드 */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 mb-8 text-white">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{user?.name}님</h2>
              <p className="text-blue-100">{user?.email}</p>
              <p className="text-blue-100">{user?.phone}</p>
            </div>
          </div>
          <div className="mt-6 flex gap-4 text-sm">
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <span className="font-semibold">등급: {user?.grade}</span>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <span className="font-semibold">주문 {user?.order_count}회</span>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <span className="font-semibold">총 구매 ₩{user?.total_spent?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 메뉴 그리드 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <a href="/orders" className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">주문 내역</h3>
            <p className="text-gray-600 mb-4">내 주문 내역을 확인하세요</p>
            <span className="text-blue-600 hover:underline">보기 &gt;</span>
          </a>

          <a href="/cart" className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">장바구니</h3>
            <p className="text-gray-600 mb-4">담아둔 상품을 확인하세요</p>
            <span className="text-blue-600 hover:underline">보기 &gt;</span>
          </a>

          <a href="/addresses" className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">배송지 관리</h3>
            <p className="text-gray-600 mb-4">저장된 배송지 주소를 관리하세요</p>
            <span className="text-blue-600 hover:underline">관리하기 &gt;</span>
          </a>

          <a href="/payment-methods" className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">결제 수단</h3>
            <p className="text-gray-600 mb-4">신용카드 및 결제 방법 관리</p>
            <span className="text-blue-600 hover:underline">관리하기 &gt;</span>
          </a>
        </div>

        {/* 로그아웃 버튼 */}
        <div className="text-center">
          <button
            onClick={handleLogout}
            className="px-8 py-3 border-2 border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-600 hover:text-white transition"
          >
            로그아웃
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

