import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Sparkles, ChevronDown, Code2 } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';

// مكوّن الجسيمات الخضراء المتفاعلة
function ParticleField() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2.5 + 1;
        // ألوان خضراء متنوعة (من الزمردي إلى الأخضر الفاتح)
        const hue = 140 + Math.random() * 40; // 140-180 (أخضر/زمردي)
        this.color = `hsla(${hue}, 70%, 55%, 0.5)`;
        this.floatSpeed = 0.002 + Math.random() * 0.005;
      }
      update(mouseX, mouseY) {
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          this.x -= dx * force * 0.015;
          this.y -= dy * force * 0.015;
        } else {
          this.x += (this.baseX - this.x) * 0.02;
          this.y += (this.baseY - this.y) * 0.02;
        }
        // تحريك عائم خفيف
        this.baseX += Math.sin(Date.now() * this.floatSpeed) * 0.3;
        this.baseY += Math.cos(Date.now() * this.floatSpeed) * 0.3;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(mouseRef.current.x, mouseRef.current.y);
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouse = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouse);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

// تأثير كتابة متقدم مع وميض مؤشر
function Typewriter({ text, delay = 70 }) {
  const [display, setDisplay] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, delay);
    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <span>
      {display}
      <AnimatePresence>
        {showCursor && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1, times: [0, 0.2, 0.8, 1] }}
            className="ml-1 text-emerald-400 font-thin"
          >
            |
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default function HeroSection() {
  const scrollToHow = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  // متابعة الماوس للـ parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const rotateX = useTransform(springY, [-300, 300], [8, -8]);
  const rotateY = useTransform(springX, [-300, 300], [-8, 8]);
  const translateZ = useTransform(springY, [-300, 300], [-20, 20]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set(clientX - centerX);
    mouseY.set(clientY - centerY);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-emerald-50"
    >
      {/* حقل الجسيمات الخضراء المتفاعلة */}
      <ParticleField />

      {/* بقع ضوئية خلفية فاتحة */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.3, 1], x: [0, 60, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-200/20 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.2, 1], x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
        {/* القسم النصي */}
        <div className="flex-1 text-center lg:text-right">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6 text-slate-800">
              اكتب كوداً
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-500 bg-clip-text text-transparent">
                <Typewriter text="خالياً من الثغرات" delay={80} />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 mb-10 font-medium leading-relaxed">
              دروس تفاعلية، أمثلة حقيقية، وفحوصات تقييمية بعد كل درس، لضمان إتقانك لمهارات الأمان البرمجي.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-2xl text-lg shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-colors"
                >
                  <span className="relative z-10">ابدأ التعلم الآن</span>
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform relative z-10" />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-emerald-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity"
                    initial={false}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToHow}
                className="relative group flex items-center gap-3 bg-white border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/50 text-slate-700 font-bold py-4 px-10 rounded-2xl text-lg shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/70 transition-all"
              >
                <Shield className="w-5 h-5 text-emerald-500" />
                <span>كيف تعمل المنصة؟</span>
              </motion.button>
            </div>

            {/* مميزات زجاجية فاتحة */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {[
                { icon: <Code2 className="w-4 h-4" />, label: 'دروس تفاعلية', color: 'bg-blue-50 text-blue-600 border-blue-200' },
                { icon: <Shield className="w-4 h-4" />, label: 'كود آمن', color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
                { icon: <Sparkles className="w-4 h-4" />, label: 'فحص فوري', color: 'bg-cyan-50 text-cyan-600 border-cyan-200' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border ${item.color} shadow-sm text-sm font-semibold`}
                >
                  {item.icon}
                  {item.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* الواجهة البصرية ثلاثية الأبعاد بألوان فاتحة */}
        <div className="flex-1 flex justify-center perspective-[1200px]">
          <motion.div
            style={{ rotateX, rotateY, translateZ }}
            className="relative w-80 h-80 md:w-96 md:h-96"
          >
            {/* بطاقة الكود البيضاء */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl shadow-slate-200/50 p-6 overflow-hidden"
            >
              {/* خطوط كود وهمية */}
              <div className="space-y-3">
                {[...Array(7)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.random() * 60 + 40}%` }}
                    transition={{ delay: 0.7 + i * 0.1, duration: 0.8 }}
                    className={`h-2 rounded-full ${
                      i % 3 === 0 ? 'bg-emerald-200' : i % 3 === 1 ? 'bg-green-300' : 'bg-lime-200'
                    }`}
                  />
                ))}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                  className="h-2 rounded-full bg-amber-300"
                />
              </div>
              {/* درع وقفل في المنتصف */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative">
                  <Shield className="w-32 h-32 text-emerald-500/80 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-emerald-100 shadow-md">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            {/* جسيمات خضراء تدور حول البطاقة */}
            <motion.div
              className="absolute -inset-10 rounded-full border border-emerald-200/20"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <Sparkles className="w-4 h-4 text-green-500" />
              </div>
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Code2 className="w-5 h-5 text-lime-500" />
              </div>
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                <Code2 className="w-4 h-4 text-emerald-300" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* سهم سفلي نابض */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        animate={{ y: [0, 12, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        onClick={scrollToHow}
      >
        <ChevronDown className="w-10 h-10 text-slate-400" />
      </motion.div>
    </section>
  );
}