"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

interface Order {
  id: string;
  customer_name: string;
  product_name: string;
  amount: number;
  status: string;
  created_at: string;
}

interface Product {
  id: number;
  name: string;
  stock: number;
}

export default function AdminDashboard() {
  const [currentTime, setCurrentTime] = useState("");
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    orderCount: 0,
    inquiryCount: 0,
    lowStockCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString('ko-KR'));
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // 최근 주문 가져오기
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);

      if (ordersError) throw ordersError;
      setRecentOrders(ordersData || []);

      // 재고 부족 상품 가져오기
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name, stock')
        .lt('stock', 5)
        .order('stock', { ascending: true })
        .limit(3);

      if (productsError) throw productsError;
      setLowStockProducts(productsData || []);

      // 통계 계산
      const { data: allOrders } = await supabase
        .from('orders')
        .select('amount');

      const totalSales = allOrders?.reduce((sum, order) => sum + order.amount, 0) || 0;
      const orderCount = ordersData?.length || 0;
      const lowStockCount = productsData?.length || 0;

      setStats({
        totalSales,
        orderCount,
        inquiryCount: 0, // 문의 테이블이 있으면 연동 가능
        lowStockCount,
      });

    } catch (error) {
      console.error('대시보드 데이터 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return '방금 전';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">로딩 중...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    { label: "총 매출", value: `₩${stats.totalSales.toLocaleString()}`, change: "+15.3%", color: "blue" },
    { label: "신규 주문", value: stats.orderCount.toString(), change: "+8.2%", color: "green" },
    { label: "미처리 문의", value: stats.inquiryCount.toString(), change: "-12.5%", color: "yellow" },
    { label: "재고 부족", value: stats.lowStockCount.toString(), change: "0%", color: "red" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 페이지 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
            <p className="text-gray-600 mt-1">넷북몰 운영 현황을 한눈에 확인하세요</p>
          </div>
          {currentTime && (
            <div className="text-sm text-gray-600">
              마지막 업데이트: {currentTime}
            </div>
          )}
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 
                  stat.change.startsWith('-') ? 'bg-red-100 text-red-700' : 
                  'bg-gray-100 text-gray-700'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 최근 주문 */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">최근 주문</h2>
                <a href="/admin/orders" className="text-sm text-blue-600 hover:text-blue-700">
                  전체보기 →
                </a>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="font-semibold text-gray-900">{order.id}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === '배송완료' ? 'bg-green-100 text-green-700' :
                          order.status === '배송중' ? 'bg-blue-100 text-blue-700' :
                          order.status === '배송준비' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {order.customer_name} · {order.product_name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">₩{order.amount.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">{getTimeAgo(order.created_at)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 재고 알림 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">재고 부족 상품</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {lowStockProducts.length > 0 ? (
                  lowStockProducts.map((product) => (
                    <div key={product.id} className="p-4 bg-red-50 rounded-lg border border-red-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{product.name}</span>
                        <span className="text-red-600 font-semibold">{product.stock}개</span>
                      </div>
                      <div className="w-full bg-red-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full" 
                          style={{ width: `${(product.stock / 10) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        재고 부족 (5개 미만)
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    재고 부족 상품이 없습니다
                  </div>
                )}
              </div>
              <a href="/admin/products">
                <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                  재고 관리하기
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* 매출 그래프 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">주간 매출 현황</h2>
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p>매출 데이터를 수집 중입니다.</p>
            <p className="text-sm mt-2">주문이 생성되면 자동으로 표시됩니다.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

