import { useRef } from 'react';
import { UserPlus, BookOpen, Code2, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// صور توضيحية SVG مخصصة لكل خطوة
const Illustrations = {
  Register: () => (
<svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    {/* تدرجات حديثة */}
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#ECFDF5" />
      <stop offset="100%" stopColor="#D1FAE5" />
    </linearGradient>
    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#34D399" />
      <stop offset="100%" stopColor="#059669" />
    </linearGradient>
    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#10B981" />
      <stop offset="100%" stopColor="#047857" />
    </linearGradient>
    <linearGradient id="plusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#059669" />
      <stop offset="100%" stopColor="#065F46" />
    </linearGradient>
    
    {/* ظل ناعم */}
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.1" />
    </filter>
  </defs>

  {/* خلفية دائرية بتدرج */}
  <circle cx="100" cy="95" r="85" fill="url(#bgGrad)" />
  <circle cx="100" cy="95" r="65" fill="#D1FAE5" opacity="0.5" />

  {/* الظل الخارجي للشخص */}
  <g filter="url(#shadow)">
    {/* الرأس - أكبر قليلاً وأكثر تناسقاً مع الجسم */}
    <circle cx="100" cy="70" r="30" fill="url(#avatarGrad)" />
    
    {/* تفاصيل الوجه: عيون لطيفة */}
    <circle cx="88" cy="63" r="3.5" fill="white" />
    <circle cx="112" cy="63" r="3.5" fill="white" />
    <circle cx="88" cy="63" r="2" fill="#064E3B" />
    <circle cx="112" cy="63" r="2" fill="#064E3B" />
    
    {/* ابتسامة خفيفة */}
    <path d="M92 80 Q100 88 108 80" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    
    {/* الجسم - منحنى أكثر طبيعية */}
    <path d="M50 135 Q50 105 100 105 Q150 105 150 135 Q150 150 100 150 Q50 150 50 135 Z" fill="url(#bodyGrad)" />
  </g>

  {/* أيقونة + بأسلوب عصري */}
  <g transform="translate(100, 180)">
    <circle cx="0" cy="0" r="16" fill="url(#plusGrad)" filter="url(#shadow)" />
    <line x1="-7" y1="0" x2="7" y2="0" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <line x1="0" y1="-7" x2="0" y2="7" stroke="white" strokeWidth="3" strokeLinecap="round" />
  </g>
</svg>
  ),
  Courses: () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="#EFF6FF" />
      <circle cx="100" cy="100" r="70" fill="#DBEAFE" />
      {/* كتب */}
      <rect x="55" y="65" width="40" height="55" rx="5" fill="#3B82F6" />
      <rect x="105" y="65" width="40" height="55" rx="5" fill="#3B82F6" />
      <rect x="65" y="75" width="20" height="8" rx="2" fill="#BFDBFE" />
      <rect x="115" y="75" width="20" height="8" rx="2" fill="#BFDBFE" />
      <rect x="65" y="90" width="15" height="6" rx="2" fill="#BFDBFE" />
      <rect x="115" y="90" width="15" height="6" rx="2" fill="#BFDBFE" />
      {/* مسار متقطع بين الكتب */}
      <path d="M95 95 L105 95" stroke="#60A5FA" strokeWidth="3" strokeDasharray="3 3" />
    </svg>
  ),
  Code: () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="#F0FDFA" />
      <circle cx="100" cy="100" r="70" fill="#CCFBF1" />
      {/* شاشة كود */}
      <rect x="50" y="60" width="100" height="80" rx="8" fill="#0F172A" />
      <rect x="65" y="80" width="35" height="6" rx="3" fill="#EF4444" opacity="0.8" />
      <rect x="65" y="95" width="60" height="6" rx="3" fill="#10B981" opacity="0.8" />
      <rect x="65" y="110" width="45" height="6" rx="3" fill="#F59E0B" opacity="0.8" />
      {/* قفل أخضر على الشاشة */}
      <circle cx="135" cy="75" r="12" fill="#10B981" />
      <path d="M130 75 V68 A5 5 0 0 1 140 68 V75" stroke="white" strokeWidth="2" fill="none" />
      <rect x="132" y="75" width="6" height="5" rx="1" fill="white" />
    </svg>
  ),
  Exam: () => (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="#FAF5FF" />
      <circle cx="100" cy="100" r="70" fill="#F3E8FF" />
      {/* درع */}
      <path d="M100 55 L130 70 L130 110 Q130 135 100 150 Q70 135 70 110 L70 70 Z" fill="#A855F7" />
      <path d="M100 65 L120 77 L120 108 Q120 127 100 138 Q80 127 80 108 L80 77 Z" fill="#C084FC" />
      {/* علامة صح */}
      <path d="M88 105 L96 113 L112 93" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const steps = [
  {
    step: '01',
    title: 'سجّل حساباً',
    desc: 'أنشئ حسابك المجاني لتبدأ رحلتك في تعلم الأمان البرمجي. بضع ثوانٍ فقط.',
    icon: <UserPlus className="w-8 h-8" strokeWidth={1.5} />,
    illustration: <Illustrations.Register />,
    color: 'emerald',
  },
  {
    step: '02',
    title: 'اختر مساراً تعليمياً',
    desc: 'تصفح الدروس المصنفة حسب الثغرات مثل XSS و SQL Injection، وابدأ من أي مستوى.',
    icon: <BookOpen className="w-8 h-8" strokeWidth={1.5} />,
    illustration: <Illustrations.Courses />,
    color: 'blue',
  },
  {
    step: '03',
    title: 'ادرس الكود الخاطئ والآمن',
    desc: 'شاهد مثالاً حياً لكود ضعيف، ثم تعلّم كيفية تحصينه خطوة بخطوة مع شرح مفصّل.',
    icon: <Code2 className="w-8 h-8" strokeWidth={1.5} />,
    illustration: <Illustrations.Code />,
    color: 'cyan',
  },
  {
    step: '04',
    title: 'اجتز الفحص وافتح التالي',
    desc: 'أجب عن أسئلة تقييمية ذكية، وعند النجاح يُفتح الدرس التالي تلقائياً.',
    icon: <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />,
    illustration: <Illustrations.Exam />,
    color: 'purple',
  },
];

const colorClasses = {
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    gradient: 'from-emerald-400 to-green-500',
    border: 'border-emerald-200',
    shadow: 'shadow-emerald-100',
    dot: 'bg-emerald-400',
    line: 'border-emerald-200',
  },
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    gradient: 'from-blue-400 to-cyan-500',
    border: 'border-blue-200',
    shadow: 'shadow-blue-100',
    dot: 'bg-blue-400',
    line: 'border-blue-200',
  },
  cyan: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
    gradient: 'from-cyan-400 to-blue-500',
    border: 'border-cyan-200',
    shadow: 'shadow-cyan-100',
    dot: 'bg-cyan-400',
    line: 'border-cyan-200',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    gradient: 'from-purple-400 to-pink-500',
    border: 'border-purple-200',
    shadow: 'shadow-purple-100',
    dot: 'bg-purple-400',
    line: 'border-purple-200',
  },
};

export default function HowItWorksSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-white via-slate-50 to-emerald-50/50 overflow-hidden"
    >
      {/* خلفية مزخرفة */}
      <div className="absolute inset-0 pointer-events-none">
        {/* بقع ضوئية كبيرة */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-50/10 rounded-full blur-3xl" />
        
        {/* نقاط خضراء شبكية */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, #10b981 1.5px, transparent 1.5px)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* نقاط أكبر متناثرة */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #059669 2px, transparent 2px)`,
            backgroundSize: '120px 120px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس القسم */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 mb-4 px-5 py-2 bg-emerald-100/80 text-emerald-700 rounded-full text-sm font-bold tracking-wide shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            كيف تبدأ؟
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-5 tracking-tight">
            في أربع خطوات {' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                كود آمن
              </span>
              {/* خط تحت الكلمة */}
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 8 Q50 0 100 8" stroke="#10B981" strokeWidth="3" fill="none" strokeLinecap="round" />
              </motion.svg>
            </span>
          </h2>
          
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            رحلة تعليمية تفاعلية مصممة لتحويلك إلى مطوّر واعٍ بأمان التطبيقات.
          </p>
        </motion.div>

        {/* الخطوات */}
        <div className="relative">
          {/* خط زمني مركزي (للمشهدات الكبيرة) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
            <div className="h-full bg-gradient-to-b from-emerald-300 via-blue-300 to-purple-300 opacity-20 rounded-full" />
          </div>

          <div className="space-y-16 lg:space-y-28">
            {steps.map((step, idx) => {
              const colors = colorClasses[step.color];
              const isEven = idx % 2 === 0;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 60 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: idx * 0.2, ease: 'easeOut' }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* البطاقة النصية */}
                  <div className={`flex-1 w-full ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:text-left'}`}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.01 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`relative bg-white/90 backdrop-blur-sm border ${colors.border} rounded-3xl p-8 shadow-xl ${colors.shadow} hover:shadow-2xl transition-shadow duration-500 group`}
                    >
                      {/* رقم الخطوة العائم */}
                      <div className={`absolute top-0 ${isEven ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} -translate-y-1/2`}>
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.gradient} text-white flex items-center justify-center text-2xl font-black shadow-lg transform ${isEven ? 'rotate-3' : '-rotate-3'} group-hover:rotate-0 transition-transform`}>
                          {step.step}
                        </div>
                      </div>

                      {/* الأيقونة */}
                      <div className={`inline-flex p-3 rounded-2xl ${colors.bg} ${colors.text} mb-4`}>
                        {step.icon}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {step.desc}
                      </p>

                      {/* تأثير توهج عند التحويم */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </motion.div>
                  </div>

                  {/* الصورة التوضيحية المركزية (تظهر على lg) */}
                  <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-40 h-40 relative z-10">
                    {/* نقطة الاتصال */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 ${colors.dot} rounded-full shadow-md ring-4 ring-white z-20`} />
                    
                    {/* الدائرة الخارجية مع حركة دوران */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                      className="absolute inset-0"
                    >
                      <div className="w-full h-full rounded-full border-2 border-dashed border-slate-200 opacity-30" />
                    </motion.div>

                    {/* الصورة التوضيحية */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring' }}
                      className="relative w-28 h-28 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-2 overflow-hidden"
                    >
                      {step.illustration}
                    </motion.div>
                  </div>

                  {/* الجانب الفارغ للمحاذاة */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* تذييل: نقاط تفاعلية */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="flex justify-center gap-4 mt-20"
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full bg-gradient-to-br ${colorClasses[step.color].gradient} shadow-md`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}