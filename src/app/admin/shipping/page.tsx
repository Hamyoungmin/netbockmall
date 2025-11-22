"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

interface Shipping {
  id: string;
  order_id: string;
  customer_name: string;
  product_name: string;
  address: string;
  courier: string;
  tracking_number: string;
  status: string;
  created_at: string;
}

export default function AdminShippingPage() {
  const [shippingOrders, setShippingOrders] = useState<Shipping[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShipping();
  }, []);

  const fetchShipping = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('shipping')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setShippingOrders(data || []);
    } catch (error) {
      console.error('배송 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    preparing: shippingOrders.filter(s => s.status === '배송준비').length,
    shipping: shippingOrders.filter(s => s.status === '배송중').length,
    delivered: shippingOrders.filter(s => s.status === '배송완료').length,
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">배송 관리</h1>
          <p className="text-gray-600 mt-1">배송 현황을 관리하세요 (총 {shippingOrders.length}건)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="text-sm text-blue-700 mb-1">배송 준비</div>
            <div className="text-3xl font-bold text-blue-700">{stats.preparing}</div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="text-sm text-green-700 mb-1">배송 중</div>
            <div className="text-3xl font-bold text-green-700">{stats.shipping}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="text-sm text-gray-700 mb-1">배송 완료</div>
            <div className="text-3xl font-bold text-gray-700">{stats.delivered}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {shippingOrders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              배송 중인 주문이 없습니다.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">배송번호</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">고객명</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">상품</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">배송지</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">택배사</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">송장번호</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {shippingOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-blue-600">{order.id}</td>
                    <td className="px-6 py-4">{order.customer_name}</td>
                    <td className="px-6 py-4">{order.product_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.address}</td>
                    <td className="px-6 py-4">{order.courier}</td>
                    <td className="px-6 py-4 font-mono text-sm">{order.tracking_number}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === '배송완료' ? 'bg-green-100 text-green-700' :
                        order.status === '배송중' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
