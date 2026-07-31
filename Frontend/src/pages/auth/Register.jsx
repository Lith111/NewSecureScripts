import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/authSlice";
import { X, Eye, EyeOff, User, Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";

export default function Register() {
  const [data, setdata] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(true);
  const { error, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const passwordsMatch = data.password === data.password2 || data.password2 === "";
  const dispatch = useDispatch();

  const addvalue = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setdata((values) => ({ ...values, [name]: value }));
  };

  const sendDatatoback = async () => {
    const resultAction = await dispatch(
      register({
        username: data.username,
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
      })
    );
    if (register.fulfilled.match(resultAction)) {
      navigate("/login");
    } else {
      setShowError(true);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-50 to-blue-50/30 overflow-hidden py-12 px-4">
      {/* زخارف خلفية ناعمة */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl" />

      {/* شبكة تقنية شفافة */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #0f172a 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />

      {/* البطاقة الرئيسية */}
      <div className="relative z-10 w-full max-w-md bg-white border border-slate-200/80 rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-10">
        {/* شريط علوي */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <span className="text-xs font-medium text-slate-400">منصة أمان كود</span>
        </div>

        <h2 className="text-3xl font-black text-slate-900 mb-1 text-center">
          إنشاء حساب جديد
        </h2>
        <p className="text-center text-slate-500 mb-8">
          ابدأ رحلتك لتعلم كتابة كود آمن خالٍ من الثغرات
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
        <div className="space-y-5 mb-6">
          {/* الاسم الأول والأخير */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <User className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="text"
                name="first_name"
                placeholder="الاسم الأول"
                className="w-full pl-3 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 placeholder-slate-400 transition-all text-sm"
                onChange={addvalue}
                value={data.first_name}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <User className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="text"
                name="last_name"
                placeholder="الاسم الأخير"
                className="w-full pl-3 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 placeholder-slate-400 transition-all text-sm"
                onChange={addvalue}
                value={data.last_name}
              />
            </div>
          </div>

          {/* اسم المستخدم */}
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              name="username"
              placeholder="اسم المستخدم"
              className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 placeholder-slate-400 transition-all"
              onChange={addvalue}
              value={data.username}
            />
          </div>

          {/* البريد الإلكتروني */}
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <Mail className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={addvalue}
              placeholder="البريد الإلكتروني"
              className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 placeholder-slate-400 transition-all"
            />
          </div>

          {/* كلمة المرور */}
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <Lock className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="كلمة المرور"
              className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 placeholder-slate-400 transition-all"
              name="password"
              value={data.password}
              onChange={addvalue}
            />
            <button
              type="button"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* تأكيد كلمة المرور */}
          <div className="relative">
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <ShieldCheck className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="تأكيد كلمة المرور"
              className={`w-full pl-4 pr-12 py-3.5 bg-slate-50 border rounded-xl focus:bg-white focus:ring-2 outline-none text-slate-800 placeholder-slate-400 transition-all ${
                !passwordsMatch
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
              }`}
              value={data.password2}
              name="password2"
              onChange={addvalue}
            />
            {!passwordsMatch && (
              <p className="text-red-500 text-xs mt-1 mr-2">كلمتا المرور غير متطابقتين</p>
            )}
          </div>
        </div>

        {/* زر إنشاء الحساب */}
        <button
          className="group relative w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl mb-4 shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isLoading}
          onClick={sendDatatoback}
        >
          <span className="flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                جاري إنشاء الحساب...
              </>
            ) : (
              <>
                إنشاء الحساب
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
        </button>

        {/* رابط تسجيل الدخول */}
        <p className="text-slate-500 text-center text-sm">
          لديك حساب بالفعل؟{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:text-blue-700 underline decoration-blue-300 hover:decoration-blue-500 transition"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </section>
  );
}