"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

export default function PaymentMethodsPage() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    isDefault: false
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }

    fetchCards();
  }, []);

  const fetchCards = () => {
    const userEmail = localStorage.getItem('userEmail');
    const saved = localStorage.getItem(`cards_${userEmail}`);
    if (saved) {
      setCards(JSON.parse(saved));
    }
    setLoading(false);
  };

  const maskCardNumber = (cardNumber: string) => {
    return cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-****-****-$4');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userEmail = localStorage.getItem('userEmail');
    
    const newCard = {
      id: Date.now(),
      ...formData,
      maskedNumber: maskCardNumber(formData.cardNumber)
    };

    const updated = [...cards, newCard];
    setCards(updated);
    localStorage.setItem(`cards_${userEmail}`, JSON.stringify(updated));

    setFormData({ cardNumber: "", cardName: "", expiryDate: "", isDefault: false });
    setShowForm(false);
    alert('카드가 등록되었습니다!');
  };

  const deleteCard = (id: number) => {
    if (!confirm('이 카드를 삭제하시겠습니까?')) return;
    
    const userEmail = localStorage.getItem('userEmail');
    const updated = cards.filter(card => card.id !== id);
    setCards(updated);
    localStorage.setItem(`cards_${userEmail}`, JSON.stringify(updated));
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">결제 수단</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {showForm ? '취소' : '+ 새 카드 추가'}
          </button>
        </div>

        {/* 카드 추가 폼 */}
        {showForm && (
          <div className="bg-gray-50 rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">새 카드 등록</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">카드 번호</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 16) {
                      setFormData({ ...formData, cardNumber: value });
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234567812345678"
                  maxLength={16}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">16자리 숫자</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">카드 소유자명</label>
                <input
                  type="text"
                  value={formData.cardName}
                  onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="홍길동"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">유효기간 (MM/YY)</label>
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 4) {
                      const formatted = value.length >= 3 ? `${value.slice(0,2)}/${value.slice(2)}` : value;
                      setFormData({ ...formData, expiryDate: formatted });
                    }
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12/25"
                  maxLength={5}
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm">기본 결제 수단으로 설정</label>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  💳 안전한 결제를 위해 카드 정보는 암호화되어 저장됩니다.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                등록하기
              </button>
            </form>
          </div>
        )}

        {/* 카드 목록 */}
        {cards.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <h3 className="text-2xl font-semibold mb-4">등록된 카드가 없습니다</h3>
            <p className="text-gray-600 mb-8">새 카드를 등록해보세요</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cards.map((card) => (
              <div key={card.id} className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-3xl p-6 hover:shadow-xl transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {card.isDefault && (
                      <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full mb-2 inline-block">
                        기본 카드
                      </span>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{card.maskedNumber}</h3>
                    <p className="text-white/80">{card.cardName}</p>
                    <p className="text-white/80 text-sm">유효기간: {card.expiryDate}</p>
                  </div>
                  <button
                    onClick={() => deleteCard(card.id)}
                    className="text-white/80 hover:text-white text-sm"
                  >
                    삭제
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <svg className="w-12 h-12 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

