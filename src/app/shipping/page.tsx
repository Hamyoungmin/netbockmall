import Image from "next/image";

export default function ShippingPage() {
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
            배송 정보
          </h1>
          <p className="text-sm md:text-base text-gray-300 mb-2">
            빠르고 안전한 배송
          </p>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 배송 안내 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">배송 안내</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="font-bold text-lg mb-2">빠른 배송</h3>
              <p className="text-gray-600 text-sm">주문 후 2-3일 이내 도착</p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="font-bold text-lg mb-2">무료 배송</h3>
              <p className="text-gray-600 text-sm">5만원 이상 구매 시</p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="font-bold text-lg mb-2">실시간 추적</h3>
              <p className="text-gray-600 text-sm">배송 현황 실시간 확인</p>
            </div>
          </div>

          {/* 배송 정책 */}
          <div className="bg-gray-50 rounded-3xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-6">배송 정책</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <div>
                  <p className="font-semibold mb-1">배송 기간</p>
                  <p className="text-gray-600">주문 확인 후 2-3일 이내 배송 (주말 및 공휴일 제외)</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <div>
                  <p className="font-semibold mb-1">배송비</p>
                  <p className="text-gray-600">5만원 이상 구매 시 무료, 5만원 미만 구매 시 3,000원</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <div>
                  <p className="font-semibold mb-1">배송 지역</p>
                  <p className="text-gray-600">전국 배송 가능 (일부 도서산간 지역은 추가 배송비 발생)</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">•</span>
                <div>
                  <p className="font-semibold mb-1">배송 업체</p>
                  <p className="text-gray-600">CJ대한통운, 로젠택배, 한진택배</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 배송 프로세스 */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8">배송 프로세스</h3>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              {[
                { step: '1', title: '주문 접수', desc: '주문이 접수되었습니다' },
                { step: '2', title: '결제 확인', desc: '결제가 확인되었습니다' },
                { step: '3', title: '상품 준비', desc: '상품을 준비하고 있습니다' },
                { step: '4', title: '배송 시작', desc: '택배사에 인계되었습니다' },
                { step: '5', title: '배송 중', desc: '고객님께 배송 중입니다' },
                { step: '6', title: '배송 완료', desc: '배송이 완료되었습니다' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start relative">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl z-10">
                    {item.step}
                  </div>
                  <div className="ml-6 bg-white rounded-2xl p-6 flex-1 shadow-sm">
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 배송 조회 */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-3xl p-8">
          <h3 className="text-2xl font-bold mb-4">배송 조회</h3>
          <p className="mb-6 opacity-90">주문번호로 실시간 배송 현황을 확인하세요</p>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="주문번호를 입력하세요"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none"
            />
            <button className="px-8 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:bg-gray-100 transition">
              조회
            </button>
          </div>
        </div>

        {/* 유의사항 */}
        <div className="mt-16 bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="text-2xl mr-2">⚠️</span>
            배송 유의사항
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• 주문 시 입력하신 주소와 연락처를 다시 한번 확인해주세요</li>
            <li>• 배송 중 수취인 부재 시 경비실이나 무인택배함에 보관될 수 있습니다</li>
            <li>• 도서산간 지역은 배송이 1-2일 추가로 소요될 수 있습니다</li>
            <li>• 천재지변이나 물류 사정에 따라 배송이 지연될 수 있습니다</li>
          </ul>
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

