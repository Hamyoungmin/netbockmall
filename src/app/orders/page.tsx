import Image from "next/image";

export default function OrdersPage() {
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
              <button className="hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
              <a href="/login" className="hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">최근 주문 내역</h2>
        
        <div className="space-y-4">
          {[
            { id: '20250115-001', date: '2025.01.15', product: 'MacBook Air M3 13"', price: '₩1,590,000', status: '배송중' },
            { id: '20250110-002', date: '2025.01.10', product: 'AirPods Pro 2세대', price: '₩359,000', status: '배송완료' },
            { id: '20250105-003', date: '2025.01.05', product: 'iPad Pro 11"', price: '₩1,490,000', status: '배송완료' },
          ].map((order, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <p className="text-xs text-gray-500 mb-1">주문번호: {order.id}</p>
                  <h3 className="font-semibold text-lg mb-1">{order.product}</h3>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className="flex items-center justify-between md:flex-col md:items-end">
                  <p className="text-xl font-bold text-blue-600">{order.price}</p>
                  <span className={`mt-2 px-4 py-1 rounded-full text-sm font-medium ${
                    order.status === '배송중' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-4">
                <button className="text-sm text-blue-600 hover:underline">상세보기</button>
                <button className="text-sm text-gray-600 hover:underline">배송조회</button>
              </div>
            </div>
          ))}
        </div>

        {/* 주문 검색 */}
        <div className="mt-16 bg-gray-50 rounded-3xl p-8">
          <h3 className="text-xl font-semibold mb-4">주문번호로 조회</h3>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="주문번호를 입력하세요"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              조회
            </button>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-xs text-gray-600">
            <p>Copyright © 2025 넷북몰. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

