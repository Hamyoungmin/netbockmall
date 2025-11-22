"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import SearchModal from "@/components/SearchModal";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image_url: string;
  description?: string;
  status: string;
}

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("status", "판매중")
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) throw error;
      setFeaturedProducts(data || []);
    } catch (error) {
      console.error("제품을 불러오는데 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 검색 모달 */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

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
              <button onClick={() => setIsSearchOpen(true)} className="hover:text-gray-600">
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
      <section className="bg-black text-white py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-semibold mb-4">
            iPhone 15pro
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            티타늄. 초강력. 초경량. 초프로
          </p>
          <div className="max-w-5xl mx-auto mt-8">
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Image
                src="/Rectangle 2.png"
                alt="iPhone 15pro"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 주요 제품 소개 */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-center text-3xl font-semibold mb-12">
          <span className="text-red-600">최신제품</span>. 주고싶은 특별한 누구에게든 위한 선물.
        </h2>
        
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <div className="w-full max-w-md h-64 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
              <div className="relative w-full h-full">
                <Image
                  src="/Rectangle 4.png"
                  alt="iPhone 15pro"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs text-orange-500 font-semibold mb-2">NEW</div>
            <h3 className="text-3xl font-semibold mb-2">iPhone 15pro</h3>
            <p className="text-lg text-gray-500 mb-4">1,550,000원부터</p>
            <p className="text-gray-600 mb-6">
              새로운 카메라. 새로운디자인. 새로운이 몰입
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-blue-600 hover:underline">더 알아보기 &gt;</a>
              <a href="#" className="text-blue-600 hover:underline">구입하기&gt;</a>
            </div>
          </div>
        </div>
      </section>

      {/* 필수 액세서리 */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-center text-3xl font-semibold mb-12">
          <span className="text-orange-600">필수아이템</span>. 매일 들고 이동합니다.
        </h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">제품을 불러오는 중...</p>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">등록된 제품이 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.slice(0, 4).map((item) => (
              <a
                key={item.id}
                href={`/product/${item.id}`}
                className="bg-gray-50 rounded-3xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-square bg-white rounded-2xl flex items-center justify-center mb-4 overflow-hidden relative">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.name}</h3>
                <p className="text-xs text-gray-600">₩{item.price.toLocaleString()}</p>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* 스토어 제품 */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-center text-3xl font-semibold mb-12">
          <span className="text-purple-600">스토어</span>. 최고의 쇼핑경험, 세일영역지식
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="aspect-square bg-white rounded-2xl flex items-center justify-center mb-4 overflow-hidden relative">
              <Image
                src="/Rectangle 37.png"
                alt="맥북"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold mb-2">맥북, 최고의 연말경사</h3>
            <p className="text-sm text-gray-600 mb-4">대학생활의 필수템, 지금 구매하고 최대 20만원 할인받으세요.</p>
          </div>
          
          <div className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="aspect-square bg-white rounded-2xl flex items-center justify-center mb-4 overflow-hidden relative">
              <Image
                src="/Rectangle 38.png"
                alt="스마트워치"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold mb-2">스마트워치로 건강관리</h3>
            <p className="text-sm text-gray-600 mb-4">건강한 라이프스타일을 위한 완벽한 파트너</p>
          </div>
          
          <div className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="aspect-square bg-white rounded-2xl flex items-center justify-center mb-4 overflow-hidden relative">
              <Image
                src="/Rectangle 39.png"
                alt="태블릿"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold mb-2">태블릿으로 창의력 발산</h3>
            <p className="text-sm text-gray-600 mb-4">디지털 아트부터 노트필기까지, 무한한 가능성</p>
          </div>
        </div>
      </section>

      {/* 간편한 선택 */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-center text-3xl font-semibold mb-12">
          <span className="text-green-600">간단한 선택</span>. 크나큰 고마움을 부담 없이 표현하는 법.
        </h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">제품을 불러오는 중...</p>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">등록된 제품이 없습니다.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {featuredProducts.slice(4, 7).map((product) => (
              <a
                key={product.id}
                href={`/product/${product.id}`}
                className="bg-gray-50 rounded-3xl p-8 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-square bg-white rounded-2xl flex items-center justify-center mb-4 overflow-hidden relative">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-600">₩{product.price.toLocaleString()}</p>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* 특별 제공 */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-center text-3xl font-semibold mb-12">
          넷북몰 <span className="text-blue-600">특별 제공</span>. 쇼핑경험 기쁨을 만져보세요 배우고 더.
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-3xl p-6">
            <h3 className="font-semibold mb-4">특별할인 이용 가능</h3>
            <p className="text-sm text-gray-600 mb-6">
              교육 할인가로 맥, 태블릿 등 제품을 최대 20% 할인된 가격에 만나보세요.
            </p>
            <div className="h-80 bg-white rounded-2xl flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 52.png"
                alt="특별할인"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="bg-black text-white rounded-3xl p-6">
            <h3 className="font-semibold mb-4">Mac 구입하기</h3>
            <p className="text-sm text-gray-300 mb-6">
              맥의 성능, 결제 옵션 등을 상담 받고 맞춤형 견적을 받아보세요.
            </p>
            <div className="h-80 bg-gray-900 rounded-2xl flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 54.png"
                alt="Mac 구입하기"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-3xl p-6">
            <h3 className="font-semibold mb-4">전문가 상담</h3>
            <p className="text-sm text-gray-600 mb-6">
              궁금하신 점이나 고민이 있으신가요? 전문가와 1:1 상담을 받아보세요.
            </p>
            <div className="h-80 bg-white rounded-2xl flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 53.png"
                alt="전문가 상담"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 특별 판매 */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-center text-3xl font-semibold mb-12">
          <span className="text-pink-600">특별 판매</span>. 비즈니스, 학교 등을 위한 특별.
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-pink-50 rounded-3xl p-8 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold mb-4">사업 운영 성장</h3>
            <p className="text-sm text-gray-600 mb-6">
              1:1 맞춤 컨설팅으로 비즈니스 제품을 만나보세요.
            </p>
            <div className="h-80 bg-white rounded-2xl flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 45.png"
                alt="사업 운영 성장"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="bg-gray-900 text-white rounded-3xl p-8 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold mb-4">학생 개발자를 Mac 개발은 서 이루어집니다</h3>
            <p className="text-sm text-gray-300 mb-6">
              강력한 성능과 최고의 앱으로 학습 효율을 높이세요.
            </p>
            <div className="h-80 bg-gray-800 rounded-2xl flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 46.png"
                alt="학생 개발자"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 넷북몰 공간 */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-center text-3xl font-semibold mb-12">
          넷북몰 <span className="text-indigo-600">공간</span>. 살펴본 계속.
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-3xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="aspect-square bg-white rounded-2xl flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 22.png"
                alt="넷북몰 공간 1"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="aspect-square bg-white rounded-2xl flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 48.png"
                alt="넷북몰 공간 2"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="aspect-square bg-white rounded-2xl flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 49.png"
                alt="넷북몰 공간 3"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="aspect-square bg-white rounded-2xl flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 50.png"
                alt="넷북몰 공간 4"
                fill
                className="object-contain"
              />
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="aspect-square bg-white rounded-2xl flex items-center justify-center overflow-hidden relative">
              <Image
                src="/Rectangle 26.png"
                alt="넷북몰 공간 5"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* 실시간 채팅 위젯 */}
      <ChatWidget />
    </div>
  );
}

