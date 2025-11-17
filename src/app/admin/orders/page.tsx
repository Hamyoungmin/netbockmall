"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_name: string;
  amount: number;
  status: string;
  payment_method: string;
  address: string;
  tracking_number?: string;
  created_at: string;
}

export default function AdminOrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('주문 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      alert('주문 상태가 변경되었습니다.');
      fetchOrders();
    } catch (error) {
      console.error('상태 변경 오류:', error);
      alert('상태 변경에 실패했습니다.');
    }
  };

  const statusOptions = [
    { value: "all", label: "전체", count: orders.length },
    { value: "결제완료", label: "결제완료", count: orders.filter(o => o.status === "결제완료").length },
    { value: "배송준비", label: "배송준비", count: orders.filter(o => o.status === "배송준비").length },
    { value: "배송중", label: "배송중", count: orders.filter(o => o.status === "배송중").length },
    { value: "배송완료", label: "배송완료", count: orders.filter(o => o.status === "배송완료").length },
    { value: "취소", label: "취소", count: orders.filter(o => o.status === "취소").length },
  ];

  const filteredOrders = selectedStatus === "all" 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const selectedOrderData = selectedOrder !== null ? filteredOrders[selectedOrder] : null;

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">주문 관리</h1>
            <p className="text-gray-600 mt-1">총 {orders.length}개의 주문</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
            엑셀 다운로드
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedStatus(option.value)}
              className={`p-4 rounded-xl border-2 transition ${
                selectedStatus === option.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="text-2xl font-bold text-gray-900">{option.count}</div>
              <div className="text-sm text-gray-600 mt-1">{option.label}</div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">주문번호</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">고객정보</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">상품</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">금액</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">상태</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">주문일시</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order, idx) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-blue-600">{order.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{order.customer_name}</div>
                      <div className="text-sm text-gray-500">{order.customer_email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{order.product_name}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">₩{order.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === '배송완료' ? 'bg-green-100 text-green-700' :
                        order.status === '배송중' ? 'bg-blue-100 text-blue-700' :
                        order.status === '배송준비' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === '결제완료' ? 'bg-purple-100 text-purple-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(order.created_at).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedOrder(idx)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        상세보기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedOrderData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">주문 상세</h2>
                  <p className="text-gray-600 mt-1">{selectedOrderData.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">주문 상태</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-4 py-2 rounded-full font-medium ${
                    selectedOrderData.status === '배송완료' ? 'bg-green-100 text-green-700' :
                    selectedOrderData.status === '배송중' ? 'bg-blue-100 text-blue-700' :
                    selectedOrderData.status === '배송준비' ? 'bg-yellow-100 text-yellow-700' :
                    selectedOrderData.status === '결제완료' ? 'bg-purple-100 text-purple-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedOrderData.status}
                  </span>
                  <select 
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                    onChange={(e) => updateOrderStatus(selectedOrderData.id, e.target.value)}
                    defaultValue={selectedOrderData.status}
                  >
                    <option value="결제완료">결제완료</option>
                    <option value="배송준비">배송준비</option>
                    <option value="배송중">배송중</option>
                    <option value="배송완료">배송완료</option>
                    <option value="취소">취소</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">고객 정보</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">이름</span>
                    <span className="font-medium">{selectedOrderData.customer_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">이메일</span>
                    <span className="font-medium">{selectedOrderData.customer_email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">전화번호</span>
                    <span className="font-medium">{selectedOrderData.customer_phone}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">주문 정보</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">상품</span>
                    <span className="font-medium">{selectedOrderData.product_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">결제 방법</span>
                    <span className="font-medium">{selectedOrderData.payment_method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">주문 일시</span>
                    <span className="font-medium">{new Date(selectedOrderData.created_at).toLocaleString('ko-KR')}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>총 금액</span>
                    <span className="text-blue-600">₩{selectedOrderData.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">배송 정보</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <span className="text-gray-600 text-sm">배송지</span>
                    <p className="font-medium mt-1">{selectedOrderData.address}</p>
                  </div>
                  {selectedOrderData.tracking_number && (
                    <div>
                      <span className="text-gray-600 text-sm">송장번호</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-medium">{selectedOrderData.tracking_number}</span>
                        <button className="text-blue-600 text-sm hover:underline">배송조회</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
