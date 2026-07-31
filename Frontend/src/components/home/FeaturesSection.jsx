import { useRef } from 'react';
import { Code2, Lock, ShieldCheck, GraduationCap, ArrowRight, Sparkles, Users } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// رسوم توضيحية SVG أصلية لكل ميزة
const FeatureIllustrations = {
  CodeComparison: () => (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* شاشة الكود الضعيف (يسار) */}
      <rect x="15" y="20" width="100" height="120" rx="8" fill="#FEE2E2" />
      <rect x="25" y="35" width="80" height="8" rx="3" fill="#EF4444" opacity="0.6" />
      <rect x="25" y="50" width="55" height="6" rx="2" fill="#EF4444" opacity="0.4" />
      <rect x="25" y="65" width="70" height="6" rx="2" fill="#EF4444" opacity="0.5" />
      <rect x="25" y="80" width="45" height="6" rx="2" fill="#EF4444" opacity="0.3" />
      <rect x="25" y="95" width="80" height="8" rx="3" fill="#EF4444" opacity="0.6" />
      {/* علامة خطأ */}
      <circle cx="40" cy="110" r="10" fill="#DC2626" />
      <path d="M35 105 L45 115 M45 105 L35 115" stroke="white" strokeWidth="2.5" />

      {/* سهم المقارنة */}
      <path d="M125 80 L145 80" stroke="#10B981" strokeWidth="3" strokeDasharray="4 4" />
      <path d="M140 75 L145 80 L140 85" stroke="#10B981" strokeWidth="3" />

      {/* شاشة الكود الآمن (يمين) */}
      <rect x="150" y="20" width="100" height="120" rx="8" fill="#D1FAE5" />
      <rect x="160" y="35" width="80" height="8" rx="3" fill="#10B981" opacity="0.7" />
      <rect x="160" y="50" width="55" height="6" rx="2" fill="#10B981" opacity="0.5" />
      <rect x="160" y="65" width="70" height="6" rx="2" fill="#10B981" opacity="0.6" />
      <rect x="160" y="80" width="45" height="6" rx="2" fill="#10B981" opacity="0.4" />
      <rect x="160" y="95" width="80" height="8" rx="3" fill="#10B981" opacity="0.7" />
      {/* قفل أمان */}
      <circle cx="215" cy="110" r="12" fill="#059669" />
      <path d="M209 110 V104 A6 6 0 0 1 221 104 V110" stroke="white" strokeWidth="2" fill="none" />
      <rect x="212" y="110" width="6" height="6" rx="1" fill="white" />
    </svg>
  ),
  LockedProgress: () => (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* مسار متصل بأقفال */}
      <path d="M40 130 Q80 130 90 90 Q100 50 130 50 Q160 50 170 90 Q180 130 220 130" stroke="#E2E8F0" strokeWidth="4" fill="none" />
      {/* النقطة الأولى (مفتوحة) */}
      <circle cx="40" cy="130" r="14" fill="#10B981" />
      <path d="M33 130 L38 135 L47 125" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* القفل الأوسط (مغلق) */}
      <rect x="118" y="36" width="24" height="28" rx="4" fill="#3B82F6" />
      <path d="M130 36 V28 A6 6 0 0 1 142 28 V36" stroke="#3B82F6" strokeWidth="3" fill="none" />
      <circle cx="130" cy="48" r="3" fill="white" />
      {/* النقطة الأخيرة (مقفلة) */}
      <circle cx="220" cy="130" r="14" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
      <Lock className="w-4 h-4 text-slate-400" style={{ transform: 'translate(106px, 55px)' }} /> {/* تمثيل SVG خارجي، نضبط عبر SVG حقيقي */}
      {/* بدلاً من Lucide داخل SVG سنستخدم مساراً مرسوماً */}
      <rect x="212" y="122" width="16" height="16" rx="3" fill="#94A3B8" />
      <path d="M220 122 V116 A4 4 0 0 1 228 116 V122" stroke="#94A3B8" strokeWidth="2" fill="none" />
    </svg>
  ),
  ExamCert: () => (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      {/* شهادة */}
      <rect x="50" y="25" width="160" height="130" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
      <rect x="65" y="40" width="130" height="4" rx="2" fill="#E2E8F0" />
      <rect x="65" y="52" width="100" height="3" rx="1.5" fill="#E2E8F0" />
      <rect x="65" y="62" width="115" height="3" rx="1.5" fill="#E2E8F0" />
      {/* ختم الإتمام */}
      <circle cx="190" cy="120" r="18" fill="#10B981" />
      <path d="M182 120 L188 126 L198 114" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* درع */}
      <path d="M130 85 L155 95 L155 120 Q155 140 130 150 Q105 140 105 120 L105 95 Z" fill="#3B82F6" opacity="0.8" />
      <path d="M130 92 L148 100 L148 118 Q148 133 130 141 Q112 133 112 118 L112 100 Z" fill="#60A5FA" />
      <path d="M123 115 L129 121 L139 109" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const features = [
  {
    title: 'أكواد حقيقية مع مقارنة فورية',
    desc: 'شاهد مثالاً لكود ضعيف وآخر محصّن جنباً إلى جنب. افهم الثغرة وخطوات إصلاحها عبر تطبيق عملي مباشر داخل الدرس.',
    icon: <Code2 className="w-8 h-8 text-blue-600" strokeWidth={1.8} />,
    gradient: 'from-blue-500 to-cyan-500',
    bgLight: 'bg-blue-50',
    illustration: <FeatureIllustrations.CodeComparison />,
    color: 'blue',
  },
  {
    title: 'نظام تقدم ذكي مقفل',
    desc: 'لا تخطي للدروس! يجب إكمال كل درس واجتياز فحصه بنجاح لفتح الدرس التالي، مما يضمن فهماً تراكمياً متقناً.',
    icon: <Lock className="w-8 h-8 text-emerald-600" strokeWidth={1.8} />,
    gradient: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50',
    illustration: <FeatureIllustrations.LockedProgress />,
    color: 'emerald',
  },
  {
    title: 'فحص فوري وشهادة إتمام',
    desc: 'اختبر فهمك مباشرة بعد كل درس بأسئلة عملية عن الثغرات، واحصل على شهادة احترافية بعد إنهاء المسار كاملاً.',
    icon: <ShieldCheck className="w-8 h-8 text-cyan-600" strokeWidth={1.8} />,
    gradient: 'from-cyan-500 to-blue-500',
    bgLight: 'bg-cyan-50',
    illustration: <FeatureIllustrations.ExamCert />,
    color: 'cyan',
  },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', shadow: 'shadow-blue-100' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', shadow: 'shadow-emerald-100' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', shadow: 'shadow-cyan-100' },
};

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-white via-slate-50/70 to-emerald-50/30 overflow-hidden"
    >
      {/* خلفية مزخرفة: بقع ضوئية ونقاط خضراء */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-emerald-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-50/20 rounded-full blur-3xl" />
        
        {/* نقاط خضراء شبكية */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, #10b981 2px, transparent 2px)`,
            backgroundSize: '50px 50px',
          }}
        />
        {/* نقاط صغيرة جداً */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #059669 1.5px, transparent 1.5px)`,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* رأس القسم مع حركة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 mb-4 px-5 py-2 bg-green-100/80 text-green-700 rounded-full text-sm font-bold tracking-wide shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            مميزات المنصة
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-5 tracking-tight">
            تعلّم{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                كتابة كود آمن
              </span>
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
            {' '}بفعالية
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto font-medium">
            منهجية مبنية على فهم الثغرات، تطبيق الحلول، والتقييم المستمر لضمان إتقانك الكامل لمبادئ الأمان البرمجي.
          </p>
        </motion.div>

        {/* بطاقات الميزات */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, idx) => {
            const colorSet = colorMap[feature.color];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative flex flex-col bg-white/90 backdrop-blur-sm rounded-3xl border ${colorSet.border} shadow-xl ${colorSet.shadow} hover:shadow-2xl transition-all duration-300 overflow-hidden`}
              >
                {/* شريط تدرج علوي يظهر عند التحويم */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* الصورة التوضيحية في الأعلى */}
                <div className="w-full h-48 flex items-center justify-center p-4 bg-gradient-to-b from-white to-transparent group-hover:scale-105 transition-transform duration-500">
                  {feature.illustration}
                </div>

                <div className="flex flex-col items-start p-8 pt-0 h-full">
                  {/* أيقونة مع خلفية */}
                  <div className={`mb-5 p-3 rounded-2xl ${colorSet.bg} border ${colorSet.border} shadow-sm group-hover:shadow-md transition-shadow`}>
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-slate-500 leading-relaxed flex-1 mb-6">
                    {feature.desc}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                    <span>اكتشف المزيد</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* إحصائية مع أيقونة المستخدمين */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white border border-emerald-200/80 rounded-2xl shadow-lg shadow-emerald-100/30">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-white flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
            <div className="text-slate-700 font-bold text-lg">
              انضم إلى <span className="text-emerald-600">+١,٢٠٠</span> مطوّر
            </div>
            <GraduationCap className="w-6 h-6 text-emerald-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}