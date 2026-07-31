import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSingleLesson,
  fetchQuiz,
  submitQuiz,
  clearQuizResult,
} from '../../redux/slices/progressSlice';
import {
  HelpCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  ClipboardList,
  Trophy,
  RefreshCw,
} from 'lucide-react';

export default function QuizPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    enrolledLessons,
    currentLesson,
    currentQuiz,
    quizResult,
    isSubmitting,
    isQuizLoading,
  } = useSelector((state) => state.progress);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [attempts, setAttempts] = useState(0);

  const lessonIdNum = Number(lessonId);
  const currentProgressLesson = enrolledLessons.find((l) => l.order === lessonIdNum);

  useEffect(() => {
    if (currentProgressLesson && currentProgressLesson.status !== 'locked') {
      dispatch(fetchSingleLesson(lessonIdNum));
      dispatch(fetchQuiz(lessonIdNum));
    }
  }, [dispatch, lessonIdNum, currentProgressLesson]);

  useEffect(() => {
    return () => {
      dispatch(clearQuizResult());
      setSelectedAnswers({});
    };
  }, [dispatch]);

  if (enrolledLessons.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!currentProgressLesson || currentProgressLesson.status === 'locked') {
    return <Navigate to="/dashboard" replace />;
  }

  if (!currentLesson || isQuizLoading || !currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          <p className="text-slate-500 font-medium">جاري تحميل الفحص...</p>
        </div>
      </div>
    );
  }

  const quiz = currentQuiz;
  const questions = quiz.questions || [];
  const isFormComplete = questions.every((q) => selectedAnswers[q.id]);

  const handleOptionChange = (questionId, choiceId) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
  };

  const handleSubmit = () => {
    if (!isFormComplete) return;
    const answers = questions.map((q) => ({
      question_id: q.id,
      selected_choice_id: selectedAnswers[q.id],
    }));
    dispatch(submitQuiz({ lessonId: lessonIdNum, answers }))
      .unwrap()
      .then(() => setAttempts((prev) => prev + 1))
      .catch(() => {});
  };

  // صفحة النجاح الاحترافية
  if (quizResult?.passed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-emerald-50 to-white p-4">
        <div className="max-w-md w-full bg-white border border-emerald-200 rounded-3xl shadow-2xl shadow-emerald-100/50 p-8 text-center">
          <div className="mx-auto w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
            <Trophy className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">تهانينا! 🎉</h1>
          <p className="text-slate-600 mb-2">لقد اجتزت الفحص بنجاح</p>
          {quizResult.score != null && (
            <div className="inline-block px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 font-bold text-sm mb-6">
              النتيجة: {Math.round(quizResult.score)}%
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition"
            >
              <ArrowRight className="w-4 h-4" />
              العودة للدروس
            </button>
            {quizResult.next_lesson_order && (
              <button
                onClick={() => navigate(`/lesson/${quizResult.next_lesson_order}`)}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition"
              >
                الدرس التالي
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // واجهة الفحص الرئيسية
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50/30 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* رأس الصفحة */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-3">
            <ClipboardList className="w-4 h-4" />
            فحص الدرس {currentLesson.order}
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">
            {currentLesson.title}
          </h1>
          <p className="text-slate-500 mt-2">أجب عن الأسئلة لفتح الدرس التالي</p>
        </div>

        {/* شريط تقدم الأسئلة */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center justify-between text-sm text-slate-500 mb-2">
            <span>الأسئلة المُجابة</span>
            <span className="font-bold text-slate-700">
              {Object.keys(selectedAnswers).length} / {questions.length}
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transition-all duration-500"
              style={{ width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* بطاقة الفشل (إن وجدت) */}
        {quizResult && !quizResult.passed && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6 flex items-start gap-3 shadow-sm">
            <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-800">لم تنجح هذه المرة</p>
              <p className="text-red-600 text-sm">{quizResult.message || 'يمكنك المحاولة مرة أخرى.'}</p>
            </div>
          </div>
        )}

        {/* الأسئلة */}
        <div className="space-y-6 mb-8">
          {questions.map((question, qIndex) => (
            <div key={question.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-sm font-bold">
                  {qIndex + 1}
                </span>
                <h3 className="text-lg font-bold text-slate-800">{question.text}</h3>
              </div>
              <div className="space-y-2.5">
                {question.choices.map((choice) => {
                  const isSelected = selectedAnswers[question.id] === choice.id;
                  return (
                    <label
                      key={choice.id}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={choice.id}
                        checked={isSelected}
                        onChange={() => handleOptionChange(question.id, choice.id)}
                        className="hidden"
                      />
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="text-slate-700 text-sm md:text-base">{choice.text}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* زر التقديم */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !isFormComplete}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 transition-all text-lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              جارٍ تقديم الإجابات...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              تقديم الإجابات
            </>
          )}
        </button>

        {attempts > 0 && !quizResult?.passed && (
          <p className="text-center text-sm text-slate-400 mt-4 flex items-center justify-center gap-1">
            <RefreshCw className="w-4 h-4" />
            عدد المحاولات: {attempts}
          </p>
        )}

        <button
          onClick={() => navigate(`/lesson/${lessonIdNum}`)}
          className="mt-6 flex items-center gap-2 text-slate-500 hover:text-slate-700 transition mx-auto bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للدرس
        </button>
      </div>
    </div>
  );
}