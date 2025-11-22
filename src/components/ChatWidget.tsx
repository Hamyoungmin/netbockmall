"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";

interface ChatMessage {
  id: number;
  message: string;
  sender_type: string;
  created_at: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStarted && sessionId) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000); // 3초마다 새 메시지 확인
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStarted, sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const startChat = async () => {
    if (!userName) {
      alert("이름을 입력해주세요.");
      return;
    }

    const email = userEmail || `guest_${Date.now()}@temp.com`;
    const newSessionId = `CHAT-${Date.now()}`;

    try {
      const { error } = await supabase.from("chat_sessions").insert([
        {
          id: newSessionId,
          user_email: email,
          user_name: userName,
          status: "대기중",
        },
      ]);

      if (error) throw error;

      setSessionId(newSessionId);
      setIsStarted(true);

      // 환영 메시지
      await supabase.from("chat_messages").insert([
        {
          session_id: newSessionId,
          user_email: email,
          user_name: userName,
          message: "상담을 시작합니다. 관리자가 곧 응답할 예정입니다.",
          sender_type: "system",
        },
      ]);

      fetchMessages();
    } catch (error) {
      console.error("채팅 시작 오류:", error);
      alert("채팅 시작에 실패했습니다.");
    }
  };

  const fetchMessages = async () => {
    if (!sessionId) return;

    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("메시지 조회 오류:", error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim() || !sessionId) return;

    const email = userEmail || `guest_${Date.now()}@temp.com`;

    try {
      const { error } = await supabase.from("chat_messages").insert([
        {
          session_id: sessionId,
          user_email: email,
          user_name: userName,
          message: inputMessage,
          sender_type: "user",
        },
      ]);

      if (error) throw error;

      // 세션 업데이트
      await supabase
        .from("chat_sessions")
        .update({
          last_message: inputMessage,
          last_message_at: new Date().toISOString(),
        })
        .eq("id", sessionId);

      setInputMessage("");
      fetchMessages();
    } catch (error) {
      console.error("메시지 전송 오류:", error);
      alert("메시지 전송에 실패했습니다.");
    }
  };

  return (
    <>
      {/* 채팅 버튼 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}

      {/* 채팅 창 */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* 헤더 */}
          <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">넷북몰 고객 상담</h3>
                <p className="text-xs text-white/80">실시간 채팅</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {!isStarted ? (
            /* 채팅 시작 폼 */
            <div className="flex-1 p-6 flex flex-col justify-center">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  무엇을 도와드릴까요?
                </h3>
                <p className="text-sm text-gray-600">
                  실시간 상담을 시작하려면 정보를 입력해주세요.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="홍길동"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 (선택)
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="example@email.com"
                  />
                </div>

                <button
                  onClick={startChat}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  상담 시작하기
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* 메시지 목록 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender_type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                        msg.sender_type === "user"
                          ? "bg-blue-600 text-white"
                          : msg.sender_type === "admin"
                          ? "bg-gray-200 text-gray-900"
                          : "bg-green-100 text-green-800 text-sm"
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(msg.created_at).toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* 입력 폼 */}
              <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    전송
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

