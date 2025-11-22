"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    fetchProduct();
    checkWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const checkWishlist = async () => {
    const email = localStorage.getItem("userEmail") || "guest@netbockmall.com";
    try {
      const { data, error } = await supabase
        .from("wishlists")
        .select("id")
        .eq("user_email", email)
        .eq("product_id", params.id)
        .single();

      if (data) setIsInWishlist(true);
    } catch (error) {
      // 위시리스트에 없으면 에러 발생 (정상)
    }
  };

  const toggleWishlist = async () => {
    const email = localStorage.getItem("userEmail") || "guest@netbockmall.com";
    
    try {
      if (isInWishlist) {
        // 위시리스트에서 제거
        const { error } = await supabase
          .from("wishlists")
          .delete()
          .eq("user_email", email)
          .eq("product_id", params.id);

        if (error) throw error;
        setIsInWishlist(false);
        alert("위시리스트에서 제거되었습니다.");
      } else {
        // 위시리스트에 추가
        const { error } = await supabase
          .from("wishlists")
          .insert([
            {
              user_email: email,
              product_id: parseInt(params.id),
            },
          ]);

        if (error) throw error;
        setIsInWishlist(true);
        alert("위시리스트에 추가되었습니다!");
      }
    } catch (error) {
      console.error("위시리스트 오류:", error);
      alert("오류가 발생했습니다.");
    }
  };

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error("제품을 불러오는데 실패했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (!product) return;

    // 로컬스토리지에 장바구니 저장
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("장바구니에 추가되었습니다!");
  };

  const buyNow = () => {
    addToCart();
    router.push("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">제품을 찾을 수 없습니다</h2>
          <button
            onClick={() => router.push("/store")}
            className="text-blue-600 hover:underline"
          >
            스토어로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 더미 이미지들 (실제로는 DB에 여러 이미지 저장)
  const images = [product.image_url, product.image_url, product.image_url];

  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <a href="/" className="text-xl font-bold hover:text-gray-600 transition">
                넷북몰
              </a>
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
              <a href="/cart" className="hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </a>
              <button
                onClick={() => {
                  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
                  window.location.href = isLoggedIn ? "/account" : "/login";
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

      {/* 제품 상세 */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 브레드크럼 */}
        <div className="text-sm text-gray-500 mb-8">
          <a href="/" className="hover:text-gray-900">홈</a>
          <span className="mx-2">/</span>
          <a href="/store" className="hover:text-gray-900">스토어</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 제품 이미지 */}
          <div>
            <div className="bg-gray-50 rounded-3xl p-8 mb-4">
              <div className="aspect-square relative">
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* 이미지 썸네일 */}
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition ${
                    selectedImage === idx ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 제품 정보 */}
          <div>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                  {product.price.toLocaleString()}원
                </span>
                {product.stock < 5 && product.stock > 0 && (
                  <span className="text-sm text-orange-500">
                    (재고 {product.stock}개 남음)
                  </span>
                )}
              </div>
            </div>

            {/* 재고 상태 */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="text-green-600 font-semibold">✓ 재고 있음</span>
              ) : (
                <span className="text-red-600 font-semibold">✗ 품절</span>
              )}
            </div>

            {/* 제품 설명 */}
            {product.description && (
              <div className="mb-8">
                <h3 className="font-semibold mb-2">제품 설명</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* 수량 선택 */}
            <div className="mb-8">
              <label className="block font-semibold mb-2">수량</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={product.stock === 0}
                  className="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))
                  }
                  disabled={product.stock === 0}
                  className="w-20 h-10 text-center border border-gray-300 rounded-lg"
                  min="1"
                  max={product.stock}
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={product.stock === 0}
                  className="w-10 h-10 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* 구매 버튼 */}
            <div className="space-y-3">
              <button
                onClick={buyNow}
                disabled={product.stock === 0}
                className="w-full py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? "바로 구매" : "품절"}
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={addToCart}
                  disabled={product.stock === 0}
                  className="py-4 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed"
                >
                  장바구니 담기
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`py-4 rounded-full font-semibold transition ${
                    isInWishlist
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "border-2 border-red-500 text-red-500 hover:bg-red-50"
                  }`}
                >
                  {isInWishlist ? "❤ 찜 취소" : "♡ 찜하기"}
                </button>
              </div>
            </div>

            {/* 추가 정보 */}
            <div className="mt-8 pt-8 border-t border-gray-200 space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">무료 배송</span>
                <span className="font-semibold">50,000원 이상 구매 시</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">배송 기간</span>
                <span className="font-semibold">2-3일 소요</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">반품/교환</span>
                <span className="font-semibold">구매 후 7일 이내</span>
              </div>
            </div>
          </div>
        </div>

        {/* 상세 스펙 */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold mb-8">상세 스펙</h2>
          <div className="bg-gray-50 rounded-3xl p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">카테고리</h3>
                <p className="text-gray-600">{product.category}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">상태</h3>
                <p className="text-gray-600">{product.status}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">제품 번호</h3>
                <p className="text-gray-600">#{product.id}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">재고</h3>
                <p className="text-gray-600">{product.stock}개</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 실시간 채팅 위젯 */}
      <ChatWidget />
    </div>
  );
}

