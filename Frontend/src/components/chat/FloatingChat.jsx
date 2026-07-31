
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  initChatSession,
  postMessage,
  addUserMessageLocally,
  resetChat,
} from '../../redux/slices/chatSlice';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { activeSessionId, messages, isLoading, isCreatingSession } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // فتح الشات وإنشاء جلسة إذا لم توجد
  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (!activeSessionId) {
        dispatch(initChatSession());
      }
    } else {
      setIsOpen(false);
    }
  };

  // تركيز تلقائي على حقل الإدخال عند فتح الشات
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  // تمرير تلقائي للأسفل عند وصول رسائل جديدة
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // إغلاق الشات بزر Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading || !activeSessionId) return;
    dispatch(addUserMessageLocally(trimmed));
    dispatch(postMessage({ sessionId: activeSessionId, message: trimmed }));
    setInput('');
  };

  return (
    <>
      {/* الزر العائم المحسّن */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-accent to-yellow-400 hover:from-yellow-400 hover:to-accent text-gray-900 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        aria-label={isOpen ? 'إغلاق الشات' : 'فتح الشات'}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* نافذة الشات مع تأثير انزلاق */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right animate-in slide-in-from-bottom-2">
          {/* ترويسة محسّنة */}
          <div className="bg-gradient-to-r from-primary-dark to-gray-900 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold text-base">المساعد الذكي</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-300 transition-colors text-lg"
              aria-label="إغلاق"
            >
              ✕
            </button>
          </div>

          {/* منطقة الرسائل مع ارتفاع ديناميكي وسكرول عند الحاجة */}
          <div className="flex-1 max-h-64 overflow-y-auto p-3 space-y-3 custom-scroll">
            {isCreatingSession && (
              <div className="text-center text-gray-500 dark:text-gray-400 text-sm animate-pulse">
                جاري الاتصال...
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-2.5 px-4 rounded-2xl text-sm shadow-sm break-words ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : msg.isError
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-bl-none'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-2.5 px-4 text-sm text-gray-500 dark:text-gray-400 animate-pulse">
                  يكتب...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* حقل الإدخال المحسّن */}
          <form onSubmit={handleSend} className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2 bg-white dark:bg-gray-800">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اسأل شيئاً..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-accent hover:bg-yellow-500 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-gray-900 font-bold px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:scale-105 disabled:scale-100"
            >
              ←
            </button>
          </form>
        </div>
      )}

      {/* أنماط إضافية لشريط التمرير الجمالي */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        .dark .custom-scroll::-webkit-scrollbar-track {
          background: #2d2d2d;
        }
        .dark .custom-scroll::-webkit-scrollbar-thumb {
          background: #555;
        }
        .dark .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #777;
        }
        @keyframes slide-in-from-bottom-2 {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: slide-in-from-bottom-2 0.2s ease-out;
        }
      `}</style>
    </>
  );
}