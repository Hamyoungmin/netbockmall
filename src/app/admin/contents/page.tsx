"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import Image from "next/image";

export default function AdminContentsPage() {
  const [selectedTab, setSelectedTab] = useState("hero");

  const heroSections = [
    { page: "메인", title: "iPhone 15pro", subtitle: "티타늄. 초강력. 초경량. 초프로", image: "/Rectangle 2.png" },
    { page: "스토어", title: "넷북몰 스토어", subtitle: "최신 제품을 만나보세요", image: "/Rectangle 4.png" },
    { page: "맥북", title: "MacBook", subtitle: "강력한 성능의 맥북", image: "/Rectangle 37.png" },
  ];

  const banners = [
    { id: 1, title: "신학기 할인 이벤트", position: "메인 상단", image: "/Rectangle 4.png", status: "활성", startDate: "2024-01-01", endDate: "2024-02-28" },
    { id: 2, title: "MacBook 특가", position: "메인 중단", image: "/Rectangle 37.png", status: "활성", startDate: "2024-01-15", endDate: "2024-01-31" },
    { id: 3, title: "겨울 세일", position: "사이드바", image: "/Rectangle 38.png", status: "종료", startDate: "2023-12-01", endDate: "2024-01-10" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 페이지 헤더 */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">콘텐츠 관리</h1>
          <p className="text-gray-600 mt-1">웹사이트 콘텐츠를 관리하세요</p>
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedTab("hero")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                selectedTab === "hero"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              히어로 섹션
            </button>
            <button
              onClick={() => setSelectedTab("banners")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                selectedTab === "banners"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              배너 관리
            </button>
            <button
              onClick={() => setSelectedTab("categories")}
              className={`flex-1 py-3 rounded-lg font-medium transition ${
                selectedTab === "categories"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              카테고리 관리
            </button>
          </div>
        </div>

        {/* 히어로 섹션 관리 */}
        {selectedTab === "hero" && (
          <div className="space-y-4">
            {heroSections.map((hero, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start space-x-6">
                  <div className="w-64 h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative flex-shrink-0">
                    <Image src={hero.image} alt={hero.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-2">{hero.page} 페이지</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{hero.title}</h3>
                      <p className="text-gray-600">{hero.subtitle}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                        이미지 변경
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm">
                        텍스트 수정
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 배너 관리 */}
        {selectedTab === "banners" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>배너 추가</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        미리보기
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        제목
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        위치
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        게시기간
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
                    {banners.map((banner) => (
                      <tr key={banner.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden relative">
                            <Image src={banner.image} alt={banner.title} fill className="object-cover" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">{banner.title}</div>
                          <div className="text-sm text-gray-500">ID: {banner.id}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {banner.position}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{banner.startDate}</div>
                          <div className="text-sm text-gray-500">~ {banner.endDate}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            banner.status === '활성' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {banner.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 카테고리 관리 */}
        {selectedTab === "categories" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["맥북", "노트북", "태블릿", "악세서리"].map((category) => (
              <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{category}</h3>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    편집
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-600">카테고리 설명</label>
                    <p className="text-gray-900 mt-1">
                      {category === "맥북" && "강력한 성능의 MacBook 시리즈"}
                      {category === "노트북" && "다양한 브랜드의 노트북"}
                      {category === "태블릿" && "휴대성이 뛰어난 태블릿"}
                      {category === "악세서리" && "필수 액세서리"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">등록된 상품 수</label>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      {Math.floor(Math.random() * 50) + 10}개
                    </p>
                  </div>
                  <div className="pt-3 border-t">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">메인 페이지 노출</span>
                    </label>
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

