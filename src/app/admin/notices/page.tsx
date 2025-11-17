"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

interface Notice {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  is_pinned: boolean;
  status: string;
  views: number;
  created_at: string;
}

export default function AdminNoticesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotices(data || []);
    } catch (error) {
      console.error('공지사항 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNotice = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const { error } = await supabase
        .from('notices')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('삭제되었습니다.');
      fetchNotices();
    } catch (error) {
      console.error('삭제 오류:', error);
      alert('삭제에 실패했습니다.');
    }
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

  const stats = [
    { label: "전체 공지", value: notices.length },
    { label: "게시중", value: notices.filter(n => n.status === "게시중").length },
    { label: "상단 고정", value: notices.filter(n => n.is_pinned).length },
    { label: "총 조회수", value: notices.reduce((sum, n) => sum + n.views, 0) },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">공지사항 관리</h1>
            <p className="text-gray-600 mt-1">총 {notices.length}개의 공지사항</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>공지사항 작성</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">번호</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">제목</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">카테고리</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">작성자</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">작성일</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">조회수</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">상태</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {notices.map((notice) => (
                  <tr key={notice.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {notice.is_pinned && (
                          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L11 4.323V3a1 1 0 011-1z"/>
                          </svg>
                        )}
                        <span className="font-semibold text-gray-900">#{notice.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{notice.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-md">{notice.content}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        notice.category === '공지' ? 'bg-blue-100 text-blue-700' :
                        notice.category === '이벤트' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {notice.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{notice.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(notice.created_at).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{notice.views.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        notice.status === '게시중' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {notice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => deleteNotice(notice.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
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

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">공지사항 작성</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>공지</option>
                    <option>이벤트</option>
                    <option>점검</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm font-medium text-gray-700">상단 고정</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="공지사항 제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                <textarea
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  placeholder="공지사항 내용을 입력하세요..."
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  취소
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  게시하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
