"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  grade: string;
  status: string;
  order_count: number;
  total_spent: number;
  created_at: string;
  last_login: string;
}

export default function AdminMembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('회원 조회 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateMemberGrade = async (memberId: number, newGrade: string) => {
    try {
      const { error } = await supabase
        .from('members')
        .update({ grade: newGrade })
        .eq('id', memberId);

      if (error) throw error;
      alert('회원 등급이 변경되었습니다.');
      fetchMembers();
    } catch (error) {
      console.error('등급 변경 오류:', error);
      alert('등급 변경에 실패했습니다.');
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMemberData = selectedMember !== null ? members.find(m => m.id === selectedMember) : null;

  const stats = [
    { label: "전체 회원", value: members.length, color: "blue" },
    { label: "신규 회원 (이번 달)", value: members.filter(m => {
      const memberDate = new Date(m.created_at);
      const now = new Date();
      return memberDate.getMonth() === now.getMonth() && memberDate.getFullYear() === now.getFullYear();
    }).length, color: "green" },
    { label: "VIP 회원", value: members.filter(m => m.grade === "VIP" || m.grade === "VVIP").length, color: "purple" },
    { label: "정지된 계정", value: members.filter(m => m.status === "정지").length, color: "red" },
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">회원 관리</h1>
            <p className="text-gray-600 mt-1">총 {members.length}명의 회원</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium">
            회원 데이터 다운로드
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="text-sm font-medium text-gray-600 mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="회원 이름 또는 이메일 검색..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">회원번호</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">회원정보</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">등급</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">주문횟수</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">총 구매금액</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">가입일</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">상태</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">작업</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">#{member.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {member.name[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        member.grade === 'VVIP' ? 'bg-purple-100 text-purple-700' :
                        member.grade === 'VIP' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {member.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{member.order_count}회</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">₩{member.total_spent.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(member.created_at).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        member.status === '정상' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedMember(member.id)}
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

      {selectedMemberData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                    {selectedMemberData.name[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedMemberData.name}</h2>
                    <p className="text-gray-600">{selectedMemberData.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedMember(null)}
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
                <h3 className="font-semibold text-gray-900 mb-3">회원 등급</h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-4 py-2 rounded-full font-medium ${
                    selectedMemberData.grade === 'VVIP' ? 'bg-purple-100 text-purple-700' :
                    selectedMemberData.grade === 'VIP' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedMemberData.grade}
                  </span>
                  <select 
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
                    onChange={(e) => updateMemberGrade(selectedMemberData.id, e.target.value)}
                    defaultValue={selectedMemberData.grade}
                  >
                    <option value="일반">일반</option>
                    <option value="VIP">VIP</option>
                    <option value="VVIP">VVIP</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">기본 정보</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">회원번호</span>
                    <span className="font-medium">#{selectedMemberData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">전화번호</span>
                    <span className="font-medium">{selectedMemberData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">가입일</span>
                    <span className="font-medium">{new Date(selectedMemberData.created_at).toLocaleDateString('ko-KR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">최근 접속</span>
                    <span className="font-medium">
                      {selectedMemberData.last_login 
                        ? new Date(selectedMemberData.last_login).toLocaleString('ko-KR')
                        : '-'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">계정 상태</span>
                    <span className={`font-medium ${
                      selectedMemberData.status === '정상' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedMemberData.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">구매 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">총 주문 횟수</div>
                    <div className="text-2xl font-bold text-blue-600">{selectedMemberData.order_count}회</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">총 구매 금액</div>
                    <div className="text-2xl font-bold text-purple-600">
                      ₩{(selectedMemberData.total_spent / 10000).toFixed(0)}만
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setSelectedMember(null)}
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
