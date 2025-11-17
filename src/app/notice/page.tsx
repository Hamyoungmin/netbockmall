import Image from "next/image";
import Footer from "@/components/Footer";

export default function NoticePage() {
  const notices = [
    {
      id: 1,
      category: "공지",
      title: "2025년 설 연휴 배송 안내",
      date: "2025.01.15",
      important: true
    },
    {
      id: 2,
      category: "이벤트",
      title: "신규 회원 가입 이벤트 - 최대 20% 할인",
      date: "2025.01.10",
      important: false
    },
    {
      id: 3,
      category: "공지",
      title: "고객센터 운영시간 변경 안내",
      date: "2025.01.05",
      important: false
    },
    {
      id: 4,
      category: "시스템",
      title: "서버 점검 안내 (1월 20일 02:00~04:00)",
      date: "2025.01.03",
      important: true
    },
    {
      id: 5,
      category: "이벤트",
      title: "새해 맞이 특가 세일 - 전 품목 할인",
      date: "2025.01.01",
      important: false
    },
    {
      id: 6,
      category: "공지",
      title: "개인정보처리방침 개정 안내",
      date: "2024.12.28",
      important: false
    },
    {
      id: 7,
      category: "공지",
      title: "택배사 변경 안내",
      date: "2024.12.20",
      important: false
    },
    {
      id: 8,
      category: "이벤트",
      title: "연말 감사 이벤트 당첨자 발표",
      date: "2024.12.15",
      important: false
    }
  ];

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">공지사항</h1>
          <p className="text-gray-600">넷북몰의 새로운 소식과 공지사항을 확인하세요</p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex gap-3 mb-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition">
            전체
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition">
            공지
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition">
            이벤트
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition">
            시스템
          </button>
        </div>

        {/* 공지사항 목록 */}
        <div className="space-y-3">
          {notices.map((notice) => (
            <a
              key={notice.id}
              href={`/notice/${notice.id}`}
              className="block bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span 
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        notice.category === '공지' 
                          ? 'bg-blue-100 text-blue-600' 
                          : notice.category === '이벤트'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-orange-100 text-orange-600'
                      }`}
                    >
                      {notice.category}
                    </span>
                    {notice.important && (
                      <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                        중요
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {notice.title}
                  </h3>
                  <p className="text-sm text-gray-500">{notice.date}</p>
                </div>
                <svg className="w-6 h-6 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            이전
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            다음
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

