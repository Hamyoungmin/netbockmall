"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";

export default function AdminReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedTab, setSelectedTab] = useState("sales");

  const salesData = {
    today: { value: "12,450,000", change: "+15.3%" },
    week: { value: "78,230,000", change: "+8.7%" },
    month: { value: "285,670,000", change: "+12.4%" },
    year: { value: "3,245,890,000", change: "+24.8%" }
  };

  const topProducts = [
    { rank: 1, name: "MacBook Pro 14", sales: 45, revenue: 130050000, change: "+12%" },
    { rank: 2, name: "iPad Pro 12.9", sales: 38, revenue: 68020000, change: "+8%" },
    { rank: 3, name: "MacBook Air 13", sales: 32, revenue: 54080000, change: "+15%" },
    { rank: 4, name: "Galaxy Buds3", sales: 56, revenue: 18424000, change: "+22%" },
    { rank: 5, name: "AirPods Pro", sales: 48, revenue: 15792000, change: "+5%" },
  ];

  const categoryData = [
    { name: "맥북", sales: 85, revenue: 195450000, percentage: 45 },
    { name: "노트북", sales: 62, revenue: 98680000, percentage: 23 },
    { name: "태블릿", sales: 48, revenue: 86072000, percentage: 20 },
    { name: "악세서리", sales: 142, revenue: 52318000, percentage: 12 },
  ];

  const memberStats = {
    total: 1250,
    new: 45,
    vip: 89,
    active: 780
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 페이지 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">통계 및 리포트</h1>
            <p className="text-gray-600 mt-1">비즈니스 성과를 분석하세요</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>리포트 다운로드</span>
          </button>
        </div>

        {/* 기간 선택 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSelectedPeriod("day")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedPeriod === "day"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              오늘
            </button>
            <button
              onClick={() => setSelectedPeriod("week")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedPeriod === "week"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              이번 주
            </button>
            <button
              onClick={() => setSelectedPeriod("month")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedPeriod === "month"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              이번 달
            </button>
            <button
              onClick={() => setSelectedPeriod("year")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedPeriod === "year"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              올해
            </button>
            <div className="flex-1"></div>
            <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
            <span className="text-gray-500">~</span>
            <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>

        {/* 매출 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <div className="text-sm opacity-90 mb-2">오늘 매출</div>
            <div className="text-3xl font-bold mb-1">₩{salesData.today.value}</div>
            <div className="text-sm">{salesData.today.change} vs 어제</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <div className="text-sm opacity-90 mb-2">주간 매출</div>
            <div className="text-3xl font-bold mb-1">₩{salesData.week.value}</div>
            <div className="text-sm">{salesData.week.change} vs 지난주</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <div className="text-sm opacity-90 mb-2">월간 매출</div>
            <div className="text-3xl font-bold mb-1">₩{salesData.month.value}</div>
            <div className="text-sm">{salesData.month.change} vs 지난달</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <div className="text-sm opacity-90 mb-2">연간 매출</div>
            <div className="text-3xl font-bold mb-1">₩{(parseFloat(salesData.year.value.replace(/,/g, '')) / 100000000).toFixed(1)}억</div>
            <div className="text-sm">{salesData.year.change} vs 작년</div>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedTab("sales")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                selectedTab === "sales"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              매출 분석
            </button>
            <button
              onClick={() => setSelectedTab("products")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                selectedTab === "products"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              상품 분석
            </button>
            <button
              onClick={() => setSelectedTab("members")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                selectedTab === "members"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              회원 분석
            </button>
          </div>
        </div>

        {/* 매출 분석 */}
        {selectedTab === "sales" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 일별 매출 그래프 */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">일별 매출 추이</h2>
              <div className="flex items-end justify-between h-64 space-x-2">
                {Array.from({length: 14}, (_, i) => {
                  const height = Math.random() * 80 + 20;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition cursor-pointer"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-2">{i+1}일</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 카테고리별 매출 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">카테고리별 매출</h2>
              <div className="space-y-4">
                {categoryData.map((category, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-900">{category.name}</span>
                      <span className="text-gray-600">{category.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{category.sales}건</span>
                      <span>₩{(category.revenue / 10000).toLocaleString()}만</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 상품 분석 */}
        {selectedTab === "products" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">베스트 상품 TOP 5</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      순위
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      상품명
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      판매수량
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      매출액
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      증감률
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topProducts.map((product) => (
                    <tr key={product.rank} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          product.rank === 1 ? 'bg-yellow-500' :
                          product.rank === 2 ? 'bg-gray-400' :
                          product.rank === 3 ? 'bg-orange-600' :
                          'bg-gray-300'
                        }`}>
                          {product.rank}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {product.sales}개
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ₩{product.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-green-600 font-semibold">{product.change}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 회원 분석 */}
        {selectedTab === "members" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">회원 현황</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">전체 회원</div>
                  <div className="text-3xl font-bold text-blue-600">{memberStats.total}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">신규 회원</div>
                  <div className="text-3xl font-bold text-green-600">{memberStats.new}</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">VIP 회원</div>
                  <div className="text-3xl font-bold text-purple-600">{memberStats.vip}</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">활성 회원</div>
                  <div className="text-3xl font-bold text-orange-600">{memberStats.active}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">신규 가입 추이</h2>
              <div className="flex items-end justify-between h-48 space-x-3">
                {['1월', '2월', '3월', '4월', '5월', '6월'].map((month, idx) => {
                  const height = Math.random() * 70 + 30;
                  return (
                    <div key={month} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg hover:from-green-700 hover:to-green-500 transition cursor-pointer"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs text-gray-600 mt-2">{month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

