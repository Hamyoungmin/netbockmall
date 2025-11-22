"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

interface Return {
  id: string;
  order_id: string;
  customer_name: string;
  product_name: string;
  reason: string;
  type: string;
  status: string;
  amount: number;
  created_at: string;
}

export default function AdminReturnsPage() {
  const [returns, setReturns] = useState<Return[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('returns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReturns(data || []);
    } catch (error) {
      console.error('반품 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    received: returns.filter(r => r.status === '접수').length,
    processing: returns.filter(r => r.status === '처리중').length,
    completed: returns.filter(r => r.status === '완료').length,
    rejected: returns.filter(r => r.status === '반려').length,
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
          <h1 className="text-3xl font-bold text-gray-900">반품/교환 관리</h1>
          <p className="text-gray-600 mt-1">반품 및 교환 요청을 관리하세요 (총 {returns.length}건)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <div className="text-sm text-yellow-700 mb-1">접수</div>
            <div className="text-3xl font-bold text-yellow-700">{stats.received}</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="text-sm text-blue-700 mb-1">처리중</div>
            <div className="text-3xl font-bold text-blue-700">{stats.processing}</div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <div className="text-sm text-green-700 mb-1">완료</div>
            <div className="text-3xl font-bold text-green-700">{stats.completed}</div>
          </div>
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <div className="text-sm text-red-700 mb-1">반려</div>
            <div className="text-3xl font-bold text-red-700">{stats.rejected}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {returns.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              반품/교환 요청이 없습니다.
            </div>
          ) : (
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
                    <td className="px-6 py-4">{ret.customer_name}</td>
                    <td className="px-6 py-4">{ret.product_name}</td>
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
                        ret.status === '완료' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
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
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
