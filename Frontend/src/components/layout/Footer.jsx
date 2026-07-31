import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:text-left">
          
          {/* الشعار والوصف */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3 group mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all">
                <Shield className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-800 leading-tight">أمان كود</span>
                <span className="text-xs font-medium text-slate-400">SecureCode Academy</span>
              </div>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              منصة تفاعلية لتعليم كتابة كود آمن خالٍ من الثغرات عبر دروس وفحوصات تقييمية.
            </p>
          </div>

          {/* روابط سريعة */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors">الرئيسية</Link>
            <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors">الدروس</Link>
            <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors">عن المنصة</Link>
            <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors">اتصل بنا</Link>
          </div>

          {/* أيقونات التواصل */}
          <div className="flex justify-center md:justify-end gap-4">
            {/* GitHub */}
            <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-300 hover:border-cyan-400/30 hover:bg-white/10 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            {/* Twitter/X */}
            <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-300 hover:border-cyan-400/30 hover:bg-white/10 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-cyan-300 hover:border-cyan-400/30 hover:bg-white/10 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15.09V8.91L15.194 12Z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>

        {/* فاصل وحقوق النشر */}
        <div className="mt-10 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm">
            جميع الحقوق محفوظة © {currentYear} منصة أمان كود - تعلّم البرمجة الآمنة
          </p>
        </div>
      </div>
    </footer>
  );
}