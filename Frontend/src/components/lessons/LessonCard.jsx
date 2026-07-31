import { useNavigate } from 'react-router-dom';

export default function LessonCard({ lesson }) {
  const navigate = useNavigate();

  // تحويل حالة الدرس إلى الأحرف الكبيرة لتتوافق مع مفاتيح التصميم
  const status = lesson.status?.toUpperCase() || 'LOCKED';

  const handleClick = () => {
    if (status === 'LOCKED') return; // لا يفعل شيئاً إذا كان مقفلاً
    navigate(`/lesson/${lesson.order}`);
  };

  const stateClasses = {
    COMPLETED: 'border-green-400 bg-green-50 dark:bg-green-900/20 cursor-pointer',
    ACTIVE: 'border-blue-500 bg-white dark:bg-gray-800 shadow-xl cursor-pointer hover:scale-[1.02] transform transition',
    LOCKED: 'border-gray-300 bg-gray-100 dark:bg-gray-700/30 cursor-not-allowed opacity-70',
  };

  const statusIcon = {
    COMPLETED: (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    ACTIVE: (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 0 1 0 1.971l-11.54 6.347a1.125 1.125 0 0 1-1.667-.985V5.653Z" />
      </svg>
    ),
    LOCKED: (
      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  };

  return (
    <div
      onClick={handleClick}
      className={`border-2 rounded-2xl p-5 flex items-center gap-4 ${stateClasses[status] || stateClasses.LOCKED} transition-all duration-300`}
    >
      {/* صورة الدرس إن وُجدت */}
      {lesson.image && (
        <img
          src={lesson.image}
          alt={lesson.title}
          className="w-12 h-12 object-cover rounded-lg shrink-0"
        />
      )}

      {/* أيقونة الحالة */}
      <div className="shrink-0">{statusIcon[status] || statusIcon.LOCKED}</div>

      {/* عنوان الدرس (ووصفه إن وُجد) */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{lesson.title}</h3>
        {lesson.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{lesson.description}</p>
        )}
      </div>

      {/* وسوم الحالة */}
      {status === 'COMPLETED' && (
        <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 text-xs px-2 py-1 rounded-full">مكتمل</span>
      )}
      {status === 'ACTIVE' && (
        <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs px-2 py-1 rounded-full">الحالي</span>
      )}
      {status === 'LOCKED' && (
        <span className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">مقفل</span>
      )}
    </div>
  );
}