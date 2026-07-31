import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadLessonsList } from '../../redux/slices/progressSlice';
import {
  BookOpen,
  CheckCircle,
  Lock,
  TrendingUp,
  Award,
  Play,
  ArrowLeft,
  ChevronLeft,
} from 'lucide-react';

export default function LearnerDashboard() {
  const dispatch = useDispatch();
  const { enrolledLessons, isLoading, error } = useSelector((state) => state.progress);

  useEffect(() => {
    dispatch(loadLessonsList());
  }, [dispatch]);

  const completedCount = enrolledLessons.filter(l => l.status === 'completed').length;
  const totalCount = enrolledLessons.length;
  const progressPercent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;
  const lockedCount = enrolledLessons.filter(l => l.status === 'locked').length;
  const activeCount = enrolledLessons.filter(l => l.status === 'active').length;

  // حالة التحميل
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-600 font-medium">جاري تحميل الدروس...</p>
        </div>
      </div>
    );
  }

  // حالة الخطأ
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm">
          حدث خطأ: {error}
        </div>
      </div>
    );
  }

  // دالة لتنسيق حالة الدرس (نص + لون)
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return { text: 'مكتمل', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <CheckCircle className="w-3.5 h-3.5" /> };
      case 'active':
        return { text: 'نشط', bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: <Play className="w-3.5 h-3.5" /> };
      case 'locked':
        return { text: 'مقفل', bg: 'bg-slate-100 text-slate-500 border-slate-200', icon: <Lock className="w-3.5 h-3.5" /> };
      default:
        return { text: status, bg: 'bg-slate-50', icon: null };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50/30 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* العنوان مع أيقونة جذابة */}
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-blue-100 rounded-2xl shadow-sm">
            <Award className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">رحلتك التعليمية</h1>
            <p className="text-slate-500 mt-1 text-sm">تابع تقدمك نحو إتقان الأمان البرمجي</p>
          </div>
        </div>

        {/* بطاقات الإحصائيات بأربعة أعمدة */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-xl">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-slate-500">الإجمالي</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">{totalCount}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm text-slate-500">مكتملة</span>
            </div>
            <p className="text-3xl font-bold text-emerald-600">{completedCount}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cyan-50 rounded-xl">
                <TrendingUp className="w-5 h-5 text-cyan-600" />
              </div>
              <span className="text-sm text-slate-500">نشطة</span>
            </div>
            <p className="text-3xl font-bold text-cyan-600">{activeCount}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-50 rounded-xl">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-slate-500">مقفلة</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">{lockedCount}</p>
          </div>
        </div>

        {/* شريط التقدم الدائري والخطي */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-36 h-36 md:w-44 md:h-44">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-600"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${progressPercent}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl md:text-4xl font-black text-slate-900">{progressPercent}%</span>
                <span className="text-xs text-slate-400 mt-1">مكتمل</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-right">
              <h3 className="text-xl font-bold text-slate-800 mb-1">تقدمك الإجمالي</h3>
              <p className="text-slate-500 mb-4">
                أكملت <span className="font-bold text-slate-700">{completedCount}</span> من{" "}
                <span className="font-bold text-slate-700">{totalCount}</span> دروس
              </p>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              {progressPercent === 100 && (
                <p className="mt-3 text-emerald-600 font-semibold flex items-center justify-center md:justify-start gap-1">
                  <CheckCircle className="w-4 h-4" /> لقد أتممت جميع الدروس، أحسنت!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* قسم الدروس الجديد كلياً */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-500" />
            الدروس المتاحة
          </h2>

          {enrolledLessons.length > 0 ? (
            <div className="space-y-4">
              {enrolledLessons.map((lesson) => {
                const statusInfo = getStatusBadge(lesson.status);
                const isLocked = lesson.status === 'locked';
                const isActive = lesson.status === 'active';
                const isCompleted = lesson.status === 'completed';

                return (
                  <div
                    key={lesson.order}
                    className="group relative bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    {/* شريط جانبي حسب الحالة */}
                    <div
                      className={`absolute right-0 top-0 bottom-0 w-1.5 ${
                        isCompleted
                          ? 'bg-emerald-500'
                          : isActive
                          ? 'bg-blue-500'
                          : 'bg-slate-300'
                      }`}
                    />

                    <div className="p-5 sm:p-6 pr-7 flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* أيقونة الدرس */}
                      <div
                        className={`p-3 rounded-xl ${
                          isCompleted
                            ? 'bg-emerald-50'
                            : isActive
                            ? 'bg-blue-50'
                            : 'bg-slate-100'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-emerald-600" />
                        ) : isActive ? (
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        ) : (
                          <Lock className="w-6 h-6 text-slate-400" />
                        )}
                      </div>

                      {/* معلومات الدرس */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-800 mb-1">{lesson.title}</h3>
                        <p className="text-slate-500 text-sm line-clamp-2">{lesson.description || 'درس تفاعلي لتعلم الأمان البرمجي'}</p>
                      </div>

                      {/* الحالة والزر */}
                      <div className="flex items-center gap-3 sm:flex-shrink-0">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${statusInfo.bg}`}
                        >
                          {statusInfo.icon}
                          {statusInfo.text}
                        </span>

                        {isLocked ? (
                          <button
                            disabled
                            className="inline-flex items-center gap-1 px-4 py-2 bg-slate-100 text-slate-400 rounded-xl text-sm font-semibold cursor-not-allowed"
                          >
                            <Lock className="w-4 h-4" />
                            مقفل
                          </button>
                        ) : (
                          <Link
                            to={`/lesson/${lesson.order}`} // تأكد من المسار الصحيح
                            className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all"
                          >
                            {isActive ? (
                              <>
                                <Play className="w-4 h-4" /> ابدأ
                              </>
                            ) : (
                              <>
                                <ChevronLeft className="w-4 h-4" /> مراجعة
                              </>
                            )}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
              <BookOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-500 text-lg font-medium">لا توجد دروس متاحة حاليًا.</p>
              <p className="text-slate-400 text-sm mt-1">يرجى التحقق لاحقًا</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}