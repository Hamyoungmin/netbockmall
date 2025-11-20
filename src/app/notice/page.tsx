"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function NoticePage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .eq('status', '게시중')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (data) {
        setNotices(data);
        setFilteredNotices(data);
      }
      setLoading(false);
    };

    fetchNotices();
  }, []);

  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === "전체") {
      setFilteredNotices(notices);
    } else {
      setFilteredNotices(notices.filter(n => n.category === category));
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

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">공지사항</h1>
          <p className="text-gray-600">넷북몰의 새로운 소식과 공지사항을 확인하세요</p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex gap-3 mb-8">
          {["전체", "공지", "이벤트", "시스템"].map((category) => (
            <button
              key={category}
              onClick={() => filterByCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 공지사항 목록 */}
        {filteredNotices.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            공지사항이 없습니다.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotices.map((notice) => (
              <a
                key={notice.id}
                href={`/notice/${notice.id}`}
                className="block bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span 
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          notice.category === '공지' 
                            ? 'bg-blue-100 text-blue-600' 
                            : notice.category === '이벤트'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-orange-100 text-orange-600'
                        }`}
                      >
                        {notice.category}
                      </span>
                      {notice.is_pinned && (
                        <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                          중요
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {notice.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(notice.created_at).toLocaleDateString('ko-KR')} · 조회 {notice.views}
                    </p>
                  </div>
                  <svg className="w-6 h-6 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            이전
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            다음
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

