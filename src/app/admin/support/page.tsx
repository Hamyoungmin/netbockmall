"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

export default function AdminSupportPage() {
  const [selectedTab, setSelectedTab] = useState("inquiries");
  const [selectedInquiry, setSelectedInquiry] = useState<number | null>(null);

  const inquiries = [
    {
      id: 1,
      customer: "김철수",
      email: "kim@example.com",
      subject: "제품 배송 문의",
      message: "주문한 제품이 언제쯤 도착하나요?",
      date: "2024-01-15 10:30",
      status: "답변대기",
      category: "배송"
    },
    {
      id: 2,
      customer: "이영희",
      email: "lee@example.com",
      subject: "반품 요청",
      message: "구매한 제품에 하자가 있어서 반품하고 싶습니다.",
      date: "2024-01-15 09:15",
      status: "답변대기",
      category: "반품/교환"
    },
    {
      id: 3,
      customer: "박민수",
      email: "park@example.com",
      subject: "할인 쿠폰 문의",
      message: "회원가입 시 받은 쿠폰을 어떻게 사용하나요?",
      date: "2024-01-14 18:20",
      status: "답변완료",
      category: "쿠폰/할인"
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "배송은 얼마나 걸리나요?",
      answer: "주문 후 2-3일 이내에 배송됩니다.",
      category: "배송",
      views: 1250,
      helpful: 89
    },
    {
      id: 2,
      question: "반품은 어떻게 하나요?",
      answer: "구매일로부터 7일 이내 반품 가능합니다.",
      category: "반품/교환",
      views: 890,
      helpful: 72
    },
    {
      id: 3,
      question: "무료 배송 기준은?",
      answer: "5만원 이상 구매 시 무료배송입니다.",
      category: "배송",
      views: 2100,
      helpful: 156
    },
  ];

  const selectedInquiryData = selectedInquiry !== null ? inquiries[selectedInquiry] : null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 페이지 헤더 */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">고객지원 관리</h1>
          <p className="text-gray-600 mt-1">고객 문의와 FAQ를 관리하세요</p>
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedTab("inquiries")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                selectedTab === "inquiries"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              1:1 문의 ({inquiries.filter(i => i.status === "답변대기").length})
            </button>
            <button
              onClick={() => setSelectedTab("faq")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                selectedTab === "faq"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              FAQ 관리
            </button>
          </div>
        </div>

        {/* 1:1 문의 관리 */}
        {selectedTab === "inquiries" && (
          <div className="space-y-6">
            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="text-sm text-gray-600 mb-1">전체 문의</div>
                <div className="text-3xl font-bold text-gray-900">{inquiries.length}</div>
              </div>
              <div className="bg-yellow-50 rounded-xl shadow-sm p-6 border border-yellow-200">
                <div className="text-sm text-yellow-700 mb-1">답변 대기</div>
                <div className="text-3xl font-bold text-yellow-700">
                  {inquiries.filter(i => i.status === "답변대기").length}
                </div>
              </div>
              <div className="bg-green-50 rounded-xl shadow-sm p-6 border border-green-200">
                <div className="text-sm text-green-700 mb-1">답변 완료</div>
                <div className="text-3xl font-bold text-green-700">
                  {inquiries.filter(i => i.status === "답변완료").length}
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl shadow-sm p-6 border border-blue-200">
                <div className="text-sm text-blue-700 mb-1">평균 응답 시간</div>
                <div className="text-3xl font-bold text-blue-700">2.5h</div>
              </div>
            </div>

            {/* 문의 목록 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        번호
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        고객
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        제목
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        카테고리
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        문의일시
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        상태
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {inquiries.map((inquiry, idx) => (
                      <tr key={inquiry.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          #{inquiry.id}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-gray-900">{inquiry.customer}</div>
                            <div className="text-sm text-gray-500">{inquiry.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{inquiry.subject}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{inquiry.message}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                            {inquiry.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {inquiry.date}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            inquiry.status === '답변완료' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => setSelectedInquiry(idx)}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                          >
                            답변하기
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* FAQ 관리 */}
        {selectedTab === "faq" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-gray-900">
                총 {faqs.length}개의 FAQ
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>FAQ 추가</span>
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {faq.category}
                        </span>
                        <span className="text-sm text-gray-500">조회 {faq.views}회</span>
                        <span className="text-sm text-gray-500">도움됨 {faq.helpful}명</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 문의 답변 모달 */}
      {selectedInquiryData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">문의 답변</h2>
                  <p className="text-gray-600 mt-1">#{selectedInquiryData.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* 문의 내용 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">문의 내용</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedInquiryData.customer[0]}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{selectedInquiryData.customer}</div>
                      <div className="text-sm text-gray-500">{selectedInquiryData.email}</div>
                      <div className="text-sm text-gray-500">{selectedInquiryData.date}</div>
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {selectedInquiryData.category}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="font-semibold text-gray-900 mb-2">{selectedInquiryData.subject}</div>
                    <p className="text-gray-700">{selectedInquiryData.message}</p>
                  </div>
                </div>
              </div>

              {/* 답변 작성 */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">답변 작성</h3>
                <textarea
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="답변 내용을 입력하세요..."
                ></textarea>
              </div>

              {/* 작업 버튼 */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setSelectedInquiry(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  취소
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  답변 전송
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

