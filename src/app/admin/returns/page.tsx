"use client";

import AdminLayout from "@/components/AdminLayout";

export default function AdminReturnsPage() {
  const returns = [
    { id: "RET-001", orderId: "ORD-2024-002", customer: "이영희", product: "iPad Pro", reason: "단순 변심", type: "반품", status: "접수", date: "2024-01-15", amount: 1350000 },
    { id: "RET-002", orderId: "ORD-2024-005", customer: "최민준", product: "MacBook Air 13", reason: "제품 하자", type: "교환", status: "처리중", date: "2024-01-13", amount: 1690000 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">반품/교환 관리</h1>
          <p className="text-gray-600 mt-1">반품 및 교환 요청을 관리하세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <div className="text-sm text-yellow-700 mb-1">접수</div>
            <div className="text-3xl font-bold text-yellow-700">1</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="text-sm text-blue-700 mb-1">처리중</div>
            <div className="text-3xl font-bold text-blue-700">1</div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="text-sm text-green-700 mb-1">완료</div>
            <div className="text-3xl font-bold text-green-700">0</div>
          </div>
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <div className="text-sm text-red-700 mb-1">반려</div>
            <div className="text-3xl font-bold text-red-700">0</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">신청번호</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">고객명</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">상품</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">구분</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">사유</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">금액</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">상태</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">작업</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {returns.map((ret) => (
                <tr key={ret.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-blue-600">{ret.id}</td>
                  <td className="px-6 py-4">{ret.customer}</td>
                  <td className="px-6 py-4">{ret.product}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ret.type === '반품' ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {ret.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ret.reason}</td>
                  <td className="px-6 py-4 font-semibold">₩{ret.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      ret.status === '접수' ? 'bg-yellow-100 text-yellow-700' :
                      ret.status === '처리중' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {ret.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      처리하기
                    </button>
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

