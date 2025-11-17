"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

export default function AdminSettingsPage() {
  const [selectedTab, setSelectedTab] = useState("site");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">설정</h1>
          <p className="text-gray-600 mt-1">시스템 설정을 관리하세요</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedTab("site")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                selectedTab === "site" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              사이트 설정
            </button>
            <button
              onClick={() => setSelectedTab("payment")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                selectedTab === "payment" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              결제 설정
            </button>
            <button
              onClick={() => setSelectedTab("admin")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                selectedTab === "admin" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              관리자 계정
            </button>
          </div>
        </div>

        {selectedTab === "site" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">기본 정보</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">사이트명</label>
                  <input type="text" defaultValue="넷북몰" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">대표 전화번호</label>
                    <input type="text" defaultValue="1588-1234" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">대표 이메일</label>
                    <input type="email" defaultValue="support@netbookmall.com" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">사업자 정보</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">대표자명</label>
                    <input type="text" defaultValue="홍길동" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">사업자등록번호</label>
                    <input type="text" defaultValue="123-45-67890" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">사업장 주소</label>
                  <input type="text" defaultValue="서울시 강남구 테헤란로 123" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                저장
              </button>
            </div>
          </div>
        )}

        {selectedTab === "payment" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">결제 수단</h2>
              <div className="space-y-3">
                {["신용카드", "체크카드", "무통장입금", "카카오페이", "네이버페이", "토스페이"].map((method) => (
                  <label key={method} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-3 font-medium text-gray-900">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">배송비 설정</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">기본 배송비</label>
                  <input type="number" defaultValue="3000" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">무료 배송 기준 금액</label>
                  <input type="number" defaultValue="50000" className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                저장
              </button>
            </div>
          </div>
        )}

        {selectedTab === "admin" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">관리자 계정</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                관리자 추가
              </button>
            </div>

            <div className="space-y-3">
              {[
                { name: "관리자", email: "admin@netbookmall.com", role: "슈퍼관리자", status: "활성" },
                { name: "김담당", email: "kim@netbookmall.com", role: "상품관리자", status: "활성" },
                { name: "이담당", email: "lee@netbookmall.com", role: "CS담당자", status: "활성" },
              ].map((admin, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {admin.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{admin.name}</div>
                      <div className="text-sm text-gray-500">{admin.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {admin.role}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {admin.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      편집
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

