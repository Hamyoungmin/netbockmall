"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";

const faqData: { [key: string]: { question: string; answer: string; details: string[] } } = {
  "1": {
    question: "배송은 얼마나 걸리나요?",
    answer: "주문 후 2-3일 이내에 배송됩니다.",
    details: [
      "배송 처리 시간: 주문 확인 후 1영업일 이내 출고",
      "배송 기간: 출고 후 1-2일 (영업일 기준)",
      "제주도 및 도서산간 지역: 추가 1-2일 소요",
      "당일배송: 오전 10시 이전 주문 시 서울/경기 일부 지역 당일 배송 가능",
      "배송 추적: 출고 시 문자로 송장번호가 발송됩니다",
      "무료배송: 5만원 이상 구매 시 무료배송",
    ],
  },
  "2": {
    question: "반품/교환은 어떻게 하나요?",
    answer: "제품 수령 후 14일 이내 무료 반품이 가능합니다.",
    details: [
      "반품 가능 기간: 제품 수령일로부터 14일 이내",
      "반품 조건: 미개봉 제품에 한해 가능 (단순 변심)",
      "환불 처리: 반품 확인 후 3-5영업일 이내 환불",
      "교환 처리: 반품과 동일한 절차로 진행",
      "반품 불가 사유:",
      "  - 제품 개봉 및 사용 흔적이 있는 경우",
      "  - 제품 택, 라벨 등이 훼손된 경우",
      "  - 고객의 책임 있는 사유로 제품이 손상된 경우",
      "반품 신청: 마이페이지 > 주문내역 > 반품신청 또는 고객센터 1588-1234",
    ],
  },
  "3": {
    question: "할부 결제가 가능한가요?",
    answer: "네, 2-12개월 무이자 할부가 가능합니다.",
    details: [
      "무이자 할부 기간: 2~12개월",
      "제휴 카드사:",
      "  - 삼성카드: 2~6개월 무이자",
      "  - 신한카드: 2~6개월 무이자",
      "  - KB국민카드: 2~6개월 무이자",
      "  - 현대카드: 2~6개월 무이자",
      "  - 롯데카드: 2~6개월 무이자",
      "최소 할부 금액: 5만원 이상",
      "할부 수수료: 무이자 기간 초과 시 카드사별 수수료 부과",
      "체크카드: 일시불만 가능",
      "프로모션: 매월 특정 카드사 추가 무이자 혜택 제공 (이벤트 페이지 참고)",
    ],
  },
  "4": {
    question: "제품 보증기간은 어떻게 되나요?",
    answer: "모든 제품은 1년 무상 보증이 제공됩니다.",
    details: [
      "기본 보증 기간: 제품 구매일로부터 1년",
      "제조사 보증: 각 제조사의 공식 보증 정책 적용",
      "무상 A/S 범위:",
      "  - 제조상의 결함으로 인한 고장",
      "  - 정상적인 사용 중 발생한 하드웨어 문제",
      "유상 A/S 대상:",
      "  - 사용자 과실로 인한 파손",
      "  - 액체 침투로 인한 손상",
      "  - 임의 개조 및 분해",
      "  - 외부 충격으로 인한 파손",
      "연장 보증: 추가 비용으로 최대 3년까지 연장 가능",
      "A/S 접수: 고객센터 또는 가까운 공식 서비스센터 방문",
      "필요 서류: 구매 영수증 또는 주문번호",
    ],
  },
  "5": {
    question: "학생 할인이 있나요?",
    answer: "학생증 제시 시 최대 20% 할인을 받으실 수 있습니다.",
    details: [
      "할인 대상: 초/중/고/대학생 (대학원생 포함)",
      "할인율: 제품별 최대 20% (평균 10-15%)",
      "필요 서류:",
      "  - 학생증 사본 또는 사진",
      "  - 재학증명서 (학생증이 없는 경우)",
      "  - 교직원증 (교직원도 동일 혜택)",
      "적용 방법:",
      "  1. 온라인: 마이페이지에서 학생 인증",
      "  2. 오프라인: 매장 방문 시 학생증 제시",
      "인증 유효기간: 1년 (매년 재인증 필요)",
      "추가 혜택:",
      "  - 학생 전용 특가 상품",
      "  - 추가 포인트 적립 (일반 회원 대비 2배)",
      "  - 무료 각인 서비스",
      "주의사항: 다른 할인과 중복 적용 불가",
    ],
  },
};

export default function FAQDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const faq = faqData[id];

  if (!faq) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">FAQ를 찾을 수 없습니다</h1>
          <a href="/support" className="text-blue-600 hover:underline">
            고객지원 페이지로 돌아가기
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 네비게이션 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <a href="/" className="text-xl font-bold hover:text-gray-600 transition">
                넷북몰
              </a>
              <div className="hidden md:flex space-x-6 text-sm">
                <a href="/store" className="hover:text-gray-600 transition">
                  스토어
                </a>
                <a href="/macbook" className="hover:text-gray-600 transition">
                  맥북
                </a>
                <a href="/notebook" className="hover:text-gray-600 transition">
                  노트북
                </a>
                <a href="/tablet" className="hover:text-gray-600 transition">
                  태블릿
                </a>
                <a href="/accessories" className="hover:text-gray-600 transition">
                  악세서리
                </a>
                <a href="/support" className="hover:text-gray-600 transition font-semibold">
                  고객지원
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <a href="/cart" className="hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </a>
              <a href="/login" className="hover:text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* 뒤로가기 버튼 */}
        <a
          href="/support"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          고객지원으로 돌아가기
        </a>

        {/* FAQ 제목 */}
        <div className="bg-blue-50 rounded-3xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">{faq.question}</h1>
          <p className="text-xl text-gray-700">{faq.answer}</p>
        </div>

        {/* 상세 내용 */}
        <div className="bg-white border border-gray-200 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-6">상세 안내</h2>
          <div className="space-y-3">
            {faq.details.map((detail, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 추가 도움말 */}
        <div className="mt-8 bg-gray-50 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-4">추가로 도움이 필요하신가요?</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/support"
              className="bg-white p-6 rounded-xl hover:shadow-lg transition text-center"
            >
              <h4 className="font-semibold mb-1">실시간 채팅</h4>
              <p className="text-sm text-gray-600">상담원과 대화하기</p>
            </a>
            <a
              href="/support"
              className="bg-white p-6 rounded-xl hover:shadow-lg transition text-center"
            >
              <h4 className="font-semibold mb-1">전화 상담</h4>
              <p className="text-sm text-gray-600">1588-1234</p>
            </a>
            <a
              href="/support"
              className="bg-white p-6 rounded-xl hover:shadow-lg transition text-center"
            >
              <h4 className="font-semibold mb-1">이메일 문의</h4>
              <p className="text-sm text-gray-600">24시간 답변</p>
            </a>
          </div>
        </div>

        {/* 다른 FAQ 보기 */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">다른 자주 묻는 질문</h3>
          <div className="space-y-3">
            {Object.entries(faqData)
              .filter(([key]) => key !== id)
              .map(([key, item]) => (
                <a
                  key={key}
                  href={`/faq-detail/${key}`}
                  className="block bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition"
                >
                  <h4 className="font-semibold text-gray-900">{item.question}</h4>
                  <p className="text-sm text-gray-600 mt-1">{item.answer}</p>
                </a>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

