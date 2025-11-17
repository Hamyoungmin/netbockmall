"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

export default function AdminPromotionsPage() {
  const [selectedTab, setSelectedTab] = useState("coupons");

  const coupons = [
    { id: "CPN-001", name: "신규 회원 할인", type: "정률", discount: "10%", minAmount: 50000, maxDiscount: 10000, validUntil: "2024-12-31", issued: 250, used: 48, status: "활성" },
    { id: "CPN-002", name: "VIP 특별 할인", type: "정액", discount: "50,000원", minAmount: 500000, maxDiscount: 50000, validUntil: "2024-06-30", issued: 89, used: 34, status: "활성" },
    { id: "CPN-003", name: "봄맞이 이벤트", type: "정률", discount: "15%", minAmount: 100000, maxDiscount: 30000, validUntil: "2024-03-31", issued: 500, used: 123, status: "활성" },
  ];

  const events = [
    { id: 1, title: "신학기 특가 세일", type: "할인", discount: "20%", startDate: "2024-02-01", endDate: "2024-02-29", products: "맥북, 노트북", status: "예정" },
    { id: 2, title: "신제품 출시 기념", type: "사은품", discount: "-", startDate: "2024-01-15", endDate: "2024-02-15", products: "iPhone 15 Pro", status: "진행중" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">프로모션 관리</h1>
            <p className="text-gray-600 mt-1">쿠폰 및 이벤트를 관리하세요</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>{selectedTab === "coupons" ? "쿠폰 발급" : "이벤트 등록"}</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedTab("coupons")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                selectedTab === "coupons"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              쿠폰 관리
            </button>
            <button
              onClick={() => setSelectedTab("events")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                selectedTab === "events"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              이벤트 관리
            </button>
          </div>
        </div>

        {selectedTab === "coupons" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">쿠폰코드</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">쿠폰명</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">할인</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">최소금액</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">유효기간</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">발급/사용</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono font-semibold text-blue-600">{coupon.id}</td>
                    <td className="px-6 py-4 font-semibold">{coupon.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {coupon.discount}
                      </span>
                    </td>
                    <td className="px-6 py-4">₩{coupon.minAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">~ {coupon.validUntil}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <span className="text-blue-600 font-semibold">{coupon.used}</span>
                        <span className="text-gray-500"> / {coupon.issued}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {coupon.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedTab === "events" && (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        event.status === '진행중' ? 'bg-green-100 text-green-700' :
                        event.status === '예정' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div>
                        <div className="text-sm text-gray-600">이벤트 유형</div>
                        <div className="font-semibold text-gray-900">{event.type}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">할인율</div>
                        <div className="font-semibold text-gray-900">{event.discount}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">기간</div>
                        <div className="text-sm text-gray-900">{event.startDate} ~ {event.endDate}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">대상 상품</div>
                        <div className="text-sm text-gray-900">{event.products}</div>
                      </div>
                    </div>
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
        )}
      </div>
    </AdminLayout>
  );
}

