import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

/* ===== صور SVG كبيرة وواضحة ===== */
const StatsIllustration = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full" fill="none">
    {/* دائرة خلفية */}
    <circle cx="200" cy="150" r="140" fill="#ECFDF5" />
    <circle cx="200" cy="150" r="100" fill="#D1FAE5" />
    
    {/* أشخاص متعددين (إحصائية المتعلمين) */}
    <circle cx="200" cy="100" r="25" fill="#10B981" />
    <path d="M165 135 Q165 110 200 110 Q235 110 235 135" fill="#10B981" />
    
    <circle cx="130" cy="130" r="20" fill="#059669" />
    <path d="M100 160 Q100 138 130 138 Q160 138 160 160" fill="#059669" />
    
    <circle cx="270" cy="130" r="20" fill="#047857" />
    <path d="M240 160 Q240 138 270 138 Q300 138 300 160" fill="#047857" />

    {/* كتب صغيرة (إحصائية الدروس) */}
    <rect x="50" y="200" width="35" height="45" rx="5" fill="#3B82F6" />
    <rect x="55" y="208" width="25" height="6" rx="2" fill="#BFDBFE" />
    <rect x="55" y="220" width="20" height="5" rx="2" fill="#BFDBFE" />
    
    <rect x="95" y="200" width="35" height="45" rx="5" fill="#3B82F6" />
    <rect x="100" y="208" width="25" height="6" rx="2" fill="#BFDBFE" />
    
    {/* درع أخضر متناسق (إحصائية الشهادات) */}
    <path d="M300 190 L325 205 L325 235 Q325 250 300 260 Q275 250 275 235 L275 205 Z" fill="#10B981" />
    <path d="M300 200 L320 210 L320 232 Q320 243 300 250 Q280 243 280 232 L280 210 Z" fill="#34D399" />
    
    {/* نجمة صغيرة فوق الدرع */}
  <path d="M300 215 L303 223 L312 225 L305 230 L307 238 L300 234 L293 238 L295 230 L288 225 L297 223 Z" fill="#FBBF24" />
  </svg>
);

const stats = [
  { value: '+5000', label: 'متعلم', color: 'emerald' },
  { value: '+100', label: 'درس تفاعلي', color: 'blue' },
  { value: '+500', label: 'شهادة ممنوحة', color: 'purple' },
];

const colorMap = {
  emerald: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    gradient: 'from-emerald-500 to-green-600',
    shadow: 'shadow-emerald-500/20',
  },
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    gradient: 'from-blue-500 to-cyan-600',
    shadow: 'shadow-blue-500/20',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    gradient: 'from-purple-500 to-pink-600',
    shadow: 'shadow-purple-500/20',
  },
};

export default function CTASection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-white via-slate-50 to-emerald-50/30 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, #10b981 1.5px, transparent 1.5px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
          >
            <div className="w-80 md:w-96 lg:w-full max-w-lg">
              <StatsIllustration />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.5, type: 'spring' }}
              className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold"
            >
              <Sparkles className="w-4 h-4" />
              انضم إلى مجتمع المبرمجين الآمنين
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
              ابدأ رحلتك نحو{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                  إتقان الأمن البرمجي
                </span>
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="absolute -bottom-2 left-0 w-full h-3"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path d="M0 8 Q50 0 100 8" stroke="#10B981" strokeWidth="3" fill="none" strokeLinecap="round" />
                </motion.svg>
              </span>
            </h2>

            <p className="text-lg md:text-xl text-slate-600 max-w-lg mb-8 font-medium leading-relaxed">
              انضم إلى أكثر من 5000 متعلم وابدأ الآن في تعلم كيفية كتابة كود آمن خالٍ من الثغرات، واحصل على شهادة معتمدة.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="mb-12"
            >
              <Link
                to="/register"
                className="group relative inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-2xl text-lg shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all hover:-translate-y-1 active:scale-95"
              >
                <span>سجّل الآن مجاناً</span>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-emerald-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
              </Link>
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, idx) => {
                const c = colorMap[stat.color];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 + idx * 0.15 }}
                    whileHover={{ y: -4 }}
                    className={`relative ${c.bg} border ${c.border} rounded-2xl p-4 text-center shadow-md hover:shadow-lg transition-shadow`}
                  >
                    <span className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${c.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </span>
                    <p className="text-slate-600 font-medium text-sm mt-1">{stat.label}</p>
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r ${c.gradient} rounded-full opacity-50`} />
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 }}
              className="mt-8 flex items-center gap-3 text-slate-500 text-sm"
            >
              <Shield className="w-5 h-5 text-emerald-600" />
              <span>منصّة موثوقة من قبل <span className="font-bold text-slate-800">آلاف المطورين العرب</span></span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}