import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { useState } from 'react';
import { 
  Shield, 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard, 
  User, 
  BookOpen,
  ChevronRight
} from 'lucide-react';

export default function Header() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-sm shadow-slate-200/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          
          {/* الشعار - Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-all duration-300 group-hover:scale-105">
              <Shield className="w-5 h-5 text-white "  strokeWidth={2.5} />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent leading-tight">
              الكود النظيف            
              </span>
              <span className="text-xs font-medium text-slate-500 tracking-wide">SecureCode Academy</span>
            </div>
          </Link>

          {/* روابط سطح المكتب - Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {!user || !token ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-slate-600 hover:text-slate-900 font-medium rounded-xl hover:bg-slate-100 transition-all duration-200"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  className="group flex items-center gap-2 px-6 py-2.5 bg-emerald-400 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-200"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>ابدأ التعلم</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </>
            ) : (
              <>
                {/* معلومات المستخدم */}
                <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-sm shadow shadow-blue-500/20">
                    {user?.name?.charAt(0)?.toUpperCase() || <User className="w-4 h-4" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800 leading-tight">
                      {user?.name || 'مستخدم'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {user?.role === 'admin' ? 'مدير النظام' : 'طالب'}
                    </span>
                  </div>
                </div>

                {/* لوحة التحكم */}
                <Link
                  to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                  className="flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:text-slate-900 font-medium rounded-xl hover:bg-slate-100 transition-all duration-200"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{user?.role === 'admin' ? 'لوحة الإدارة' : 'لوحة التحكم'}</span>
                </Link>

                {/* تسجيل الخروج */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl border border-red-200/60 transition-all duration-200 shadow-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>خروج</span>
                </button>
              </>
            )}
          </nav>

          {/* زر القائمة المتنقلة - Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* القائمة المتنقلة - Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 border-t border-slate-200/60 mt-2 pt-6 animate-in slide-in-from-top-2 duration-200">
            {!user || !token ? (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-5 py-3.5 text-slate-600 hover:text-slate-900 font-medium rounded-xl hover:bg-slate-100 transition-all text-center"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-all"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>ابدأ التعلم الآن</span>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* معلومات المستخدم في الموبايل */}
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold shadow shadow-blue-500/20">
                    {user?.name?.charAt(0)?.toUpperCase() || <User className="w-5 h-5" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">{user?.name || 'مستخدم'}</span>
                    <span className="text-sm text-slate-500">
                      {user?.role === 'admin' ? 'مدير النظام' : 'حساب طالب'}
                    </span>
                  </div>
                </div>

                {/* رابط لوحة التحكم للموبايل */}
                <Link
                  to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-5 py-3.5 text-slate-700 hover:text-slate-900 font-medium rounded-xl hover:bg-slate-100 transition-all"
                >
                  <LayoutDashboard className="w-5 h-5 text-blue-500" />
                  <span>{user?.role === 'admin' ? 'لوحة الإدارة' : 'لوحة التحكم'}</span>
                </Link>

                {/* زر الخروج للموبايل */}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-3 w-full px-6 py-3.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-xl border border-red-200/60 transition-all shadow-sm"
                >
                  <LogOut className="w-5 h-5" />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}