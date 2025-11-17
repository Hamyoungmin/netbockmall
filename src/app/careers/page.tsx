import Image from "next/image";

export default function CareersPage() {
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
        {/* 회사 문화 */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Why 넷북몰?</h2>
          <p className="text-lg text-gray-700 mb-12">
            혁신적인 IT 유통의 미래를 함께 만들어갈 인재를 찾습니다
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="font-bold text-xl mb-3">빠른 성장</h3>
              <p className="text-gray-700">역동적인 환경에서 빠르게 성장하세요</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="font-bold text-xl mb-3">자율과 책임</h3>
              <p className="text-gray-700">자율적인 근무 환경과 수평적 문화</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="font-bold text-xl mb-3">다양한 혜택</h3>
              <p className="text-gray-700">경쟁력 있는 연봉과 복지</p>
            </div>
          </div>
        </div>

        {/* 채용 공고 */}
        <h2 className="text-3xl font-bold mb-8">채용 중인 포지션</h2>
        <div className="space-y-4 mb-16">
          {[
            { title: '프론트엔드 개발자', team: '개발팀', type: '정규직', location: '서울' },
            { title: '백엔드 개발자', team: '개발팀', type: '정규직', location: '서울' },
            { title: 'UI/UX 디자이너', team: '디자인팀', type: '정규직', location: '서울' },
            { title: '마케팅 매니저', team: '마케팅팀', type: '정규직', location: '서울' },
            { title: '고객 상담원', team: 'CS팀', type: '계약직', location: '서울/부산' },
          ].map((job, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition cursor-pointer">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-bold text-xl mb-2">{job.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>팀: {job.team}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                  지원하기
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 복지 혜택 */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-3xl p-12 mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">복지 혜택</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="font-semibold mb-1">경쟁력 있는 연봉</div>
              <div className="text-sm opacity-90">업계 최상위 수준의 급여</div>
            </div>
            <div>
              <div className="font-semibold mb-1">유연 근무제</div>
              <div className="text-sm opacity-90">재택근무 및 자율 출퇴근</div>
            </div>
            <div>
              <div className="font-semibold mb-1">교육 지원</div>
              <div className="text-sm opacity-90">도서 구입 및 세미나 참가 지원</div>
            </div>
            <div>
              <div className="font-semibold mb-1">식비 지원</div>
              <div className="text-sm opacity-90">중식 및 석식 제공</div>
            </div>
            <div>
              <div className="font-semibold mb-1">건강검진</div>
              <div className="text-sm opacity-90">연 1회 종합검진 지원</div>
            </div>
            <div>
              <div className="font-semibold mb-1">경조사 지원</div>
              <div className="text-sm opacity-90">경조금 및 경조 휴가</div>
            </div>
          </div>
        </div>

        {/* 지원 방법 */}
        <div className="bg-gray-50 rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-6">지원 방법</h3>
          <p className="text-gray-700 mb-6">
            지원을 원하시는 분은 이력서와 자기소개서를 아래 이메일로 보내주세요.
          </p>
          <div className="bg-white rounded-2xl p-6 border-2 border-blue-600">
            <div className="text-sm text-gray-600 mb-2">채용 문의</div>
            <div className="text-xl font-bold text-blue-600">recruit@netbookmall.com</div>
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

