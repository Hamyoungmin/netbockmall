"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function FAQPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('views', { ascending: false });

      if (data) {
        setFaqs(data);
        setFilteredFaqs(data);
      }
      setLoading(false);
    };

    fetchFaqs();
  }, []);

  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === "전체") {
      setFilteredFaqs(faqs);
    } else {
      setFilteredFaqs(faqs.filter(f => f.category === category));
    }
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
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 카테고리 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {['전체', '주문/결제', '배송', '반품/교환'].map((category) => (
            <button
              key={category}
              onClick={() => filterByCategory(category)}
              className={`py-3 px-6 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ 목록 */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            FAQ가 없습니다.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition cursor-pointer">
                <div className="flex items-start mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full mr-3">
                    {faq.category}
                  </span>
                  <h3 className="font-semibold text-lg flex-1">{faq.question}</h3>
                </div>
                <p className="text-gray-600 ml-0 md:ml-20">{faq.answer}</p>
                <p className="text-xs text-gray-400 ml-0 md:ml-20 mt-2">조회 {faq.views}회</p>
              </div>
            ))}
          </div>
        )}

        {/* 추가 문의 */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-3xl p-12 text-center">
          <h3 className="text-2xl font-bold mb-4">찾으시는 답변이 없으신가요?</h3>
          <p className="mb-8 opacity-90">고객센터로 문의해주시면 친절하게 답변해드리겠습니다</p>
          <div className="flex gap-4 justify-center">
            <a href="/contact" className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition">
              문의하기
            </a>
            <a href="/support" className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition">
              고객센터
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

