import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Mail, Lock, X, ArrowLeft, LogIn } from "lucide-react";
import { login } from "../../redux/slices/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(true);
  const { error, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  const handleLogin = async () => {
    const resultAction = await dispatch(login({ username, password }));
    if (login.fulfilled.match(resultAction)) {
      navigate("/dashboard");
    } else {
      setShowError(true);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-blue-50/30 overflow-hidden py-12 px-4">
      {/* زخارف خلفية ناعمة */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl" />
      
      {/* شبكة تقنية خفيفة */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #0f172a 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* بطاقة تسجيل الدخول */}
      <div className="relative z-10 w-full max-w-md bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10">
        
        {/* شريط علوي مزخرف */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-xs font-medium text-slate-400">منصة أمان كود</span>
        </div>

        {/* العنوان */}
        <h2 className="text-3xl font-black text-slate-900 mb-1 text-center">
          أهلاً بك مجدداً
        </h2>
        <p className="text-center text-slate-500 mb-8">
          سجّل دخولك لمتابعة رحلتك في تعلم الأمان البرمجي
        </p>

        {/* رسالة الخطأ */}
        {error && showError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-start gap-2">
            <div className="flex-1 text-sm">{error}</div>
            <button
              onClick={() => setShowError(false)}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* حقول الإدخال */}
        <div className="space-y-5 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <Mail className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="اسم المستخدم"
              className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 placeholder-slate-400 transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <Lock className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="password"
              placeholder="كلمة المرور"
              className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 placeholder-slate-400 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* زر تسجيل الدخول */}
        <button
          disabled={isLoading}
          onClick={handleLogin}
          className="group relative w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-xl mb-4 shadow-lg shadow-emerald-900/10 hover:shadow-emerald-900/20 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                جاري تسجيل الدخول...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                تسجيل الدخول
              </>
            )}
          </span>
        </button>

        {/* رابط إنشاء حساب جديد */}
        <p className="text-slate-500 text-center text-sm">
          ليس لديك حساب؟{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:text-blue-700 underline decoration-blue-300 hover:decoration-blue-500 transition"
          >
            أنشئ حساباً جديداً
          </Link>
        </p>
      </div>
    </section>
  );
}