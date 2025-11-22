"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/Footer";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    zipcode: "",
    isDefault: false
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      window.location.href = '/login';
      return;
    }

    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    const userEmail = localStorage.getItem('userEmail');
    
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false });

    if (data) {
      setAddresses(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userEmail = localStorage.getItem('userEmail');

    const { error } = await supabase
      .from('addresses')
      .insert([
        {
          user_email: userEmail,
          name: formData.name,
          phone: formData.phone,
          zipcode: formData.zipcode,
          address: formData.address,
          is_default: formData.isDefault
        }
      ]);

    if (error) {
      alert('배송지 추가에 실패했습니다.');
      return;
    }

    alert('배송지가 추가되었습니다!');
    setFormData({ name: "", phone: "", address: "", zipcode: "", isDefault: false });
    setShowForm(false);
    fetchAddresses();
  };

  const deleteAddress = async (id: number) => {
    if (!confirm('이 배송지를 삭제하시겠습니까?')) return;

    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id);

    if (error) {
      alert('삭제에 실패했습니다.');
      return;
    }

    fetchAddresses();
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
          <h1 className="text-4xl font-bold">배송지 관리</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {showForm ? '취소' : '+ 새 배송지 추가'}
          </button>
        </div>

        {/* 배송지 추가 폼 */}
        {showForm && (
          <div className="bg-gray-50 rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">새 배송지 추가</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">받는 사람</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="홍길동"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">연락처</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="010-1234-5678"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">우편번호</label>
                <input
                  type="text"
                  value={formData.zipcode}
                  onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12345"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">주소</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="서울시 강남구 테헤란로 123"
                  rows={3}
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
                <label className="text-sm">기본 배송지로 설정</label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                추가하기
              </button>
            </form>
          </div>
        )}

        {/* 배송지 목록 */}
        {addresses.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-2xl font-semibold mb-4">등록된 배송지가 없습니다</h3>
            <p className="text-gray-600 mb-8">새 배송지를 추가해보세요</p>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="bg-white border-2 border-gray-200 rounded-3xl p-6 hover:border-blue-500 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold">{addr.name}</h3>
                      {addr.is_default && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                          기본 배송지
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{addr.phone}</p>
                    <p className="text-gray-600">({addr.zipcode}) {addr.address}</p>
                  </div>
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    삭제
                  </button>
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
