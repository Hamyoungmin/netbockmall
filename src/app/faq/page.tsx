import Image from "next/image";
import Footer from "@/components/Footer";

export default function FAQPage() {
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
        {/* 카테고리 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {['전체', '주문/결제', '배송', '반품/교환'].map((category, idx) => (
            <button
              key={idx}
              className={`py-3 px-6 rounded-full font-semibold transition ${
                idx === 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ 목록 */}
        <div className="space-y-4">
          {[
            {
              category: '주문/결제',
              q: '어떤 결제 수단을 사용할 수 있나요?',
              a: '신용카드, 체크카드, 계좌이체, 무통장입금, 네이버페이, 카카오페이 등 다양한 결제 수단을 지원합니다.'
            },
            {
              category: '배송',
              q: '배송은 얼마나 걸리나요?',
              a: '주문 확인 후 2-3일 이내에 배송됩니다. 일부 지역은 추가 1-2일이 소요될 수 있습니다.'
            },
            {
              category: '주문/결제',
              q: '할부 결제가 가능한가요?',
              a: '네, 2-12개월 무이자 할부가 가능합니다. 카드사별로 무이자 혜택이 다를 수 있습니다.'
            },
            {
              category: '반품/교환',
              q: '반품은 어떻게 하나요?',
              a: '제품 수령 후 14일 이내에 반품이 가능합니다. 미개봉 제품에 한해 전액 환불됩니다.'
            },
            {
              category: '배송',
              q: '배송 조회는 어디서 하나요?',
              a: '마이페이지 > 주문조회에서 실시간 배송 현황을 확인하실 수 있습니다.'
            },
            {
              category: '주문/결제',
              q: '주문 취소는 어떻게 하나요?',
              a: '배송 준비 전까지 마이페이지에서 직접 취소하실 수 있습니다. 배송 준비 후에는 고객센터로 문의해주세요.'
            },
            {
              category: '반품/교환',
              q: '교환은 가능한가요?',
              a: '제품 하자가 있는 경우 동일 제품으로 교환이 가능합니다. 고객센터로 문의해주세요.'
            },
            {
              category: '주문/결제',
              q: '학생 할인이 있나요?',
              a: '네, 학생증 인증 시 최대 20% 할인을 받으실 수 있습니다. 자세한 내용은 고객센터로 문의해주세요.'
            },
            {
              category: '배송',
              q: '배송비는 얼마인가요?',
              a: '5만원 이상 구매 시 무료배송입니다. 5만원 미만 구매 시 3,000원의 배송비가 부과됩니다.'
            },
            {
              category: '주문/결제',
              q: '영수증 발급이 가능한가요?',
              a: '네, 마이페이지에서 주문내역을 확인하시고 영수증을 출력하실 수 있습니다.'
            },
          ].map((faq, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition cursor-pointer">
              <div className="flex items-start mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full mr-3">
                  {faq.category}
                </span>
                <h3 className="font-semibold text-lg flex-1">{faq.q}</h3>
              </div>
              <p className="text-gray-600 ml-0 md:ml-20">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* 추가 문의 */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-3xl p-12 text-center">
          <h3 className="text-2xl font-bold mb-4">찾으시는 답변이 없으신가요?</h3>
          <p className="mb-8 opacity-90">고객센터로 문의해주시면 친절하게 답변해드리겠습니다</p>
          <div className="flex gap-4 justify-center">
            <a href="/contact" className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition">
              문의하기
            </a>
            <a href="/support" className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-blue-600 transition">
              고객센터
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

