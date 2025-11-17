"use client";

import AdminLayout from "@/components/AdminLayout";

export default function AdminShippingPage() {
  const shippingOrders = [
    { id: "SHP-001", orderId: "ORD-2024-001", customer: "김철수", product: "MacBook Pro 14", address: "서울시 강남구", courier: "CJ대한통운", tracking: "123456789", status: "배송중", date: "2024-01-15" },
    { id: "SHP-002", orderId: "ORD-2024-003", customer: "박민수", product: "AirPods Pro", address: "경기도 성남시", courier: "로젠택배", tracking: "987654321", status: "배송준비", date: "2024-01-14" },
    { id: "SHP-003", orderId: "ORD-2024-004", customer: "정수진", product: "Galaxy Buds3", address: "인천시 연수구", courier: "CJ대한통운", tracking: "456789123", status: "배송완료", date: "2024-01-14" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">배송 관리</h1>
          <p className="text-gray-600 mt-1">배송 현황을 관리하세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="text-sm text-blue-700 mb-1">배송 준비</div>
            <div className="text-3xl font-bold text-blue-700">1</div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="text-sm text-green-700 mb-1">배송 중</div>
            <div className="text-3xl font-bold text-green-700">1</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="text-sm text-gray-700 mb-1">배송 완료</div>
            <div className="text-3xl font-bold text-gray-700">1</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.product}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.address}</td>
                  <td className="px-6 py-4">{order.courier}</td>
                  <td className="px-6 py-4 font-mono text-sm">{order.tracking}</td>
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
        </div>
      </div>
    </AdminLayout>
  );
}

