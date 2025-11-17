"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { label: "대시보드", href: "/admin/dashboard" },
    { label: "상품 관리", href: "/admin/products" },
    { label: "주문 관리", href: "/admin/orders" },
    { label: "회원 관리", href: "/admin/members" },
    { label: "배송 관리", href: "/admin/shipping" },
    { label: "반품/교환", href: "/admin/returns" },
    { label: "고객지원", href: "/admin/support" },
    { label: "공지사항", href: "/admin/notices" },
    { label: "콘텐츠", href: "/admin/contents" },
    { label: "프로모션", href: "/admin/promotions" },
    { label: "통계", href: "/admin/reports" },
    { label: "설정", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-40 h-16">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/admin/dashboard" className="text-xl font-bold text-blue-600">
              넷북몰 관리자
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative text-gray-600 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
              <span className="text-sm font-medium">관리자</span>
            </div>
            
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
              사이트 보기
            </Link>
            
            <button className="text-sm text-red-600 hover:text-red-700">
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* 사이드바 */}
      <aside
        className={`fixed left-0 top-16 bottom-0 bg-white shadow-lg transition-all duration-300 z-30 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main
        className={`pt-16 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

