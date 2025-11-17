import Image from "next/image";

export default function AccountPage() {
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
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">개인정보</h3>
            <p className="text-gray-600 mb-4">이름, 이메일, 전화번호 등을 관리하세요</p>
            <a href="#" className="text-blue-600 hover:underline">수정하기 &gt;</a>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">보안</h3>
            <p className="text-gray-600 mb-4">비밀번호 및 2단계 인증 설정</p>
            <a href="#" className="text-blue-600 hover:underline">설정하기 &gt;</a>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">배송지</h3>
            <p className="text-gray-600 mb-4">저장된 배송지 주소를 관리하세요</p>
            <a href="#" className="text-blue-600 hover:underline">관리하기 &gt;</a>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">결제 수단</h3>
            <p className="text-gray-600 mb-4">신용카드 및 결제 방법 관리</p>
            <a href="#" className="text-blue-600 hover:underline">관리하기 &gt;</a>
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

