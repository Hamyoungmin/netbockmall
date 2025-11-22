"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface WishlistItem {
  id: number;
  product_id: number;
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    image_url: string;
    status: string;
  };
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "guest@netbockmall.com";
    setUserEmail(email);
    fetchWishlist(email);
  }, []);

  const fetchWishlist = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from("wishlists")
        .select(`
          id,
          product_id,
          products (
            id,
            name,
            category,
            price,
            stock,
            image_url,
            status
          )
        `)
        .eq("user_email", email)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWishlist(data as any || []);
    } catch (error) {
      console.error("위시리스트 조회 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistId: number) => {
    try {
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("id", wishlistId);

      if (error) throw error;
      alert("위시리스트에서 제거되었습니다.");
      fetchWishlist(userEmail);
    } catch (error) {
      console.error("제거 오류:", error);
      alert("제거에 실패했습니다.");
    }
  };

  const addToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("장바구니에 추가되었습니다!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

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
              <a href="/wishlist" className="hover:text-gray-600 relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </a>
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

      {/* 위시리스트 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">위시리스트</h1>
          <p className="text-gray-600">찜한 상품 {wishlist.length}개</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              위시리스트가 비어있습니다
            </h2>
            <p className="text-gray-600 mb-8">
              마음에 드는 상품을 찜해보세요!
            </p>
            <a
              href="/store"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition"
            >
              쇼핑하러 가기
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => {
              const product = item.product;
              return (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-3xl p-6 hover:shadow-xl transition-all"
                >
                  <a href={`/product/${product.id}`}>
                    <div className="aspect-square bg-white rounded-2xl mb-4 flex items-center justify-center overflow-hidden relative">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </a>

                  <div className="mb-4">
                    <span className="text-xs text-gray-500">{product.category}</span>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-blue-600">
                      ₩{product.price.toLocaleString()}
                    </p>
                    <p className={`text-sm mt-1 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                      {product.stock > 0 ? `재고 ${product.stock}개` : "품절"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      장바구니 담기
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-3 border-2 border-red-500 text-red-500 rounded-full hover:bg-red-50 transition"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

