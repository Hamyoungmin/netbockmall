import Image from "next/image";

export default function ContactPage() {
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

      {/* 히어로 섹션 */}
      <section className="bg-black text-white py-2 mb-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold mb-1">
            연락처
          </h1>
          <p className="text-sm md:text-base text-gray-300 mb-2">
            언제든지 문의해주세요
          </p>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* 연락처 정보 */}
          <div>
            <h2 className="text-3xl font-bold mb-8">문의하기</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="text-3xl mr-4">📞</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">전화</h3>
                  <p className="text-gray-600">1588-1234</p>
                  <p className="text-sm text-gray-500">평일 9:00 - 18:00</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-3xl mr-4">📧</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">이메일</h3>
                  <p className="text-gray-600">support@netbookmall.com</p>
                  <p className="text-sm text-gray-500">24시간 이내 답변</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-3xl mr-4">💬</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">카카오톡</h3>
                  <p className="text-gray-600">@넷북몰</p>
                  <p className="text-sm text-gray-500">실시간 상담</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="text-3xl mr-4">🏢</div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">본사</h3>
                  <p className="text-gray-600">서울시 강남구 테헤란로 123</p>
                  <p className="text-sm text-gray-500">넷북빌딩 5층</p>
                </div>
              </div>
            </div>
          </div>

          {/* 매장 정보 */}
          <div>
            <h2 className="text-3xl font-bold mb-8">매장 안내</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-3">강남점</h3>
                <p className="text-gray-600 mb-2">📍 서울시 강남구 테헤란로 123</p>
                <p className="text-gray-600 mb-2">📞 02-1234-5678</p>
                <p className="text-sm text-gray-500">평일 10:00 - 20:00 / 주말 11:00 - 19:00</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-3">홍대점</h3>
                <p className="text-gray-600 mb-2">📍 서울시 마포구 양화로 456</p>
                <p className="text-gray-600 mb-2">📞 02-2345-6789</p>
                <p className="text-sm text-gray-500">평일 10:00 - 20:00 / 주말 11:00 - 19:00</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-3">부산점</h3>
                <p className="text-gray-600 mb-2">📍 부산시 해운대구 센텀로 789</p>
                <p className="text-gray-600 mb-2">📞 051-3456-7890</p>
                <p className="text-sm text-gray-500">평일 10:00 - 20:00 / 주말 11:00 - 19:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* 문의 양식 */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">온라인 문의</h3>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">이름</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="홍길동"
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
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">문의 유형</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>선택해주세요</option>
                <option>제품 문의</option>
                <option>배송 문의</option>
                <option>반품/교환</option>
                <option>기타</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">제목</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="문의 제목"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">내용</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="문의 내용을 입력하세요"
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition">
              문의하기
            </button>
          </form>
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

