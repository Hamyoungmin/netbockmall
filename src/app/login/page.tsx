"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Supabase에서 회원 정보 확인
      const { data, error: queryError } = await supabase
        .from('members')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (queryError || !data) {
        setError("이메일 또는 비밀번호가 일치하지 않습니다.");
        return;
      }

      // 로그인 성공 시 localStorage에 저장
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', data.name);
      
      // 마지막 로그인 시간 업데이트
      await supabase
        .from('members')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.id);

      // 홈으로 리다이렉트
      alert(`환영합니다, ${data.name}님!`);
      window.location.href = '/';
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="flex items-center justify-center py-16 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">로그인</h1>
            <p className="text-gray-600">넷북몰에 오신 것을 환영합니다</p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                로그인 상태 유지
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                비밀번호 찾기
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              로그인
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              계정이 없으신가요?
              <a href="/signup" className="ml-2 text-blue-600 font-semibold hover:underline">
                회원가입
              </a>
            </p>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                <span className="text-sm font-medium">Apple</span>
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                <span className="text-sm font-medium">Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

