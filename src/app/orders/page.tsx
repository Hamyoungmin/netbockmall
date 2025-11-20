"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [searchOrderId, setSearchOrderId] = useState("");

  useEffect(() => {
    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    
    setUserEmail(email);

    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }

    // Supabase에서 주문 내역 가져오기
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', email)
        .order('created_at', { ascending: false });

      if (data) {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleSearch = async () => {
    if (!searchOrderId.trim()) {
      alert('주문번호를 입력해주세요.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', searchOrderId)
      .single();

    setLoading(false);

    if (error || !data) {
      alert('주문 내역을 찾을 수 없습니다.');
      return;
    }

    setOrders([data]);
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
        <h2 className="text-2xl font-bold mb-8">최근 주문 내역</h2>
        
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="text-2xl font-semibold mb-4">주문 내역이 없습니다</h3>
            <p className="text-gray-600 mb-8">첫 주문을 시작해보세요</p>
            <a href="/store" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition">
              쇼핑하러 가기
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <p className="text-xs text-gray-500 mb-1">주문번호: {order.id}</p>
                    <h3 className="font-semibold text-lg mb-1">{order.product_name}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  <div className="flex items-center justify-between md:flex-col md:items-end">
                    <p className="text-xl font-bold text-blue-600">
                      ₩{order.amount.toLocaleString()}
                    </p>
                    <span className={`mt-2 px-4 py-1 rounded-full text-sm font-medium ${
                      order.status === '배송중' ? 'bg-blue-100 text-blue-600' : 
                      order.status === '배송완료' ? 'bg-green-100 text-green-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex gap-4">
                  <button className="text-sm text-blue-600 hover:underline">상세보기</button>
                  <a href="/shipping" className="text-sm text-gray-600 hover:underline">배송조회</a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 주문 검색 */}
        <div className="mt-16 bg-gray-50 rounded-3xl p-8">
          <h3 className="text-xl font-semibold mb-4">주문번호로 조회</h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="주문번호를 입력하세요"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSearch}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              조회
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

