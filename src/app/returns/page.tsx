import Image from "next/image";

export default function ReturnsPage() {
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
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 반품 정책 */}
        <div className="bg-blue-50 rounded-3xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">반품 정책</h2>
          <ul className="space-y-3 text-gray-700">
            <li>✓ 제품 수령 후 14일 이내 무료 반품 가능</li>
            <li>✓ 미개봉 제품에 한해 전액 환불</li>
            <li>✓ 제품 하자 시 왕복 배송비 무료</li>
            <li>✓ 단순 변심 시 반품 배송비 고객 부담</li>
          </ul>
        </div>

        {/* 반품 신청 */}
        <h2 className="text-2xl font-bold mb-8">반품 신청</h2>
        <div className="bg-gray-50 rounded-3xl p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">주문번호</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="주문번호를 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">이메일</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">반품 사유</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>선택해주세요</option>
                <option>제품 불량</option>
                <option>잘못된 제품 배송</option>
                <option>단순 변심</option>
                <option>기타</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">상세 사유</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="반품 사유를 자세히 설명해주세요"
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition">
              반품 신청하기
            </button>
          </form>
        </div>

        {/* 교환 안내 */}
        <div className="mt-16 bg-gray-900 text-white rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-4">교환 문의</h3>
          <p className="mb-6">제품 교환을 원하시나요? 고객센터로 문의해주세요.</p>
          <div className="flex gap-4">
            <a href="/support" className="px-6 py-3 bg-white text-black rounded-xl hover:bg-gray-100 transition">
              고객센터
            </a>
            <a href="tel:1588-1234" className="px-6 py-3 border border-white rounded-xl hover:bg-white hover:text-black transition">
              1588-1234
            </a>
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

