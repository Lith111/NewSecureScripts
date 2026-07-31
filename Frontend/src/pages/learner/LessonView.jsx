import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleLesson } from '../../redux/slices/progressSlice';
import CodeBlock from '../../components/lessons/CodeBlock';

export default function LessonView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enrolledLessons, currentLesson, isLessonLoading, error } = useSelector((state) => state.progress);
  const { user } = useSelector((state) => state.auth);

  const lessonId = Number(id);
  const activeLesson = enrolledLessons.find(l => l.status === 'ACTIVE');

  useEffect(() => {
    dispatch(fetchSingleLesson(lessonId));
  }, [dispatch]);

  if (isLessonLoading || !currentLesson) {
    return (
      <section className="min-h-screen flex items-center justify-center ">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium">جاري تحميل الدرس...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen flex items-center justify-center ">
        <div className="text-center p-8 max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full  border border-red-400/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">حدث خطأ</h2>
          <p className="text-red-300">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen  overflow-hidden py-12 md:py-16">
      {/* تأثيرات خلفية */}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* رأس الدرس */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            الدرس {currentLesson.order}
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {currentLesson.title}
          </h1>
        </div>

        {/* بطاقات المحتوى الثلاث */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-12">
          {/* بطاقة الشرح النظري */}
          <div className="group relative backdrop-blur-xl bg-slate-400 border border-white/10 rounded-3xl p-6 shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/20 flex items-center justify-center text-2xl">📖</div>
                <h2 className="text-xl font-bold text-white">الشرح النظري</h2>
              </div>
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed"
                   dangerouslySetInnerHTML={{ __html: currentLesson.theory_content }} />
            </div>
          </div>

          {/* بطاقة الكود الخاطئ */}
          <div className="group relative backdrop-blur-xl bg-red-500/5 border border-red-400/20 rounded-3xl p-6 shadow-lg hover:shadow-red-500/10 transition-all duration-300">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400/20 to-red-600/20 border border-red-400/20 flex items-center justify-center text-2xl">⚠️</div>
                <h2 className="text-xl font-bold text-red-300">كود خاطئ</h2>
              </div>
              <CodeBlock
                code={currentLesson.vulnerable_code}
                language={currentLesson.language || 'javascript'}
                title="كود يحتوي على ثغرة"
              />
              {currentLesson.vulnerableExplanation && (
                <p className="text-sm text-red-300/80 mt-3">{currentLesson.vulnerableExplanation}</p>
              )}
            </div>
          </div>

          {/* بطاقة الكود الآمن */}
          <div className="group relative backdrop-blur-xl bg-green-500/5 border border-green-400/20 rounded-3xl p-6 shadow-lg hover:shadow-green-500/10 transition-all duration-300">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400/20 to-emerald-600/20 border border-green-400/20 flex items-center justify-center text-2xl">✅</div>
                <h2 className="text-xl font-bold text-green-300">كود آمن</h2>
              </div>
              <CodeBlock
                code={currentLesson.secure_code}
                language={currentLesson.language || 'javascript'}
                title="حل آمن بعد المعالجة"
              />
            </div>
          </div>
        </div>

        {/* زر التوجه للفحص */}
        <div className="text-center">
          <button
            onClick={() => navigate(`/quiz/${currentLesson.order}`)}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-12 rounded-full text-lg shadow-2xl shadow-cyan-500/25 transition-all hover:scale-105 hover:shadow-cyan-500/40 overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
            <span className="relative">تقديم الفحص</span>
            <svg className="relative w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.05); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, 20px); }
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 10s ease-in-out infinite reverse;
        }
      `}</style>
    </section>
  );
}