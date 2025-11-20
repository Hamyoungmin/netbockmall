"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 유효성 검사
    if (!name || !email || !password || !phone) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!agreed) {
      setError("이용약관에 동의해주세요.");
      return;
    }

    try {
      // Supabase에 회원 정보 저장
      const { data, error: insertError } = await supabase
        .from('members')
        .insert([
          {
            name,
            email,
            phone,
            password, // 실제로는 암호화해야 하지만 일단 간단하게
            grade: '일반',
            status: '정상',
            order_count: 0,
            total_spent: 0
          }
        ])
        .select();

      if (insertError) {
        if (insertError.code === '23505') { // unique constraint violation
          setError("이미 가입된 이메일입니다.");
        } else {
          setError("회원가입에 실패했습니다: " + insertError.message);
        }
        return;
      }

      // 회원가입 성공
      alert("회원가입이 완료되었습니다!");
      window.location.href = '/login';
    } catch (err) {
      setError("회원가입 중 오류가 발생했습니다.");
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
            <h1 className="text-3xl font-bold mb-2">회원가입</h1>
            <p className="text-gray-600">넷북몰 회원이 되어보세요</p>
          </div>

          <form className="space-y-4" onSubmit={handleSignup}>
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">이름</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="홍길동"
                required
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium mb-2">비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">전화번호</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="010-1234-5678"
                required
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mr-2 mt-1"
              />
              <label className="text-sm text-gray-600">
                <span className="font-medium">이용약관</span> 및 <span className="font-medium">개인정보처리방침</span>에 동의합니다
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              회원가입
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?
              <a href="/login" className="ml-2 text-blue-600 font-semibold hover:underline">
                로그인
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

