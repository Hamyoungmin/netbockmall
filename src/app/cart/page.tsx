"use client";

import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'MacBook Air 13" M3', price: 1590000, quantity: 1, image: '/mba_13_15_140e630d3_2x.jpg' },
    { id: 2, name: 'Galaxy Buds3 Pro', price: 329000, quantity: 2, image: '/Rectangle 5.png' },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
              <a href="/login" className="hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12">장바구니</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-semibold mb-4">장바구니가 비어있습니다</h2>
            <p className="text-gray-600 mb-8">원하는 상품을 장바구니에 담아보세요</p>
            <a href="/store" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition">
              쇼핑 계속하기
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 장바구니 아이템 */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="bg-gray-50 rounded-2xl p-6 flex gap-6">
                  <div className="w-32 h-32 bg-white rounded-xl overflow-hidden relative flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                    <p className="text-2xl font-bold text-orange-600 mb-4">
                      ₩{item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-4 py-2 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-4 py-2 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 주문 요약 */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">주문 요약</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>상품 금액</span>
                    <span>₩{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>배송비</span>
                    <span>무료</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 flex justify-between text-xl font-bold">
                    <span>총 결제 금액</span>
                    <span className="text-orange-600">₩{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition mb-3">
                  주문하기
                </button>
                <a href="/store" className="block w-full text-center py-4 border border-gray-300 rounded-xl hover:bg-gray-100 transition">
                  쇼핑 계속하기
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

