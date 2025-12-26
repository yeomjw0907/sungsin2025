import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Globe, ShieldCheck, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-sungshin-navy">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" 
            alt="Global Logistics Background" 
            className="w-full h-full object-cover opacity-30"
          />
        </motion.div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-sungshin-navy/80 via-sungshin-navy/50 to-sungshin-navy" />
        <div className="absolute inset-0 bg-gradient-to-r from-sungshin-navy/90 via-transparent to-sungshin-navy/90" />
      </div>

      {/* Abstract Animated Grid */}
      <div className="absolute inset-0 z-0 opacity-20 perspective-[1000px]">
         <div 
           className="absolute inset-0"
           style={{ 
             backgroundImage: 'linear-gradient(rgba(0, 160, 233, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 160, 233, 0.2) 1px, transparent 1px)', 
             backgroundSize: '60px 60px',
             transform: 'rotateX(60deg) scale(2)'
           }} 
         />
      </div>

      {/* Floating Particles/Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-sungshin-cyan/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-sungshin-pink/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Main Content */}
      <motion.div style={{ y: y2 }} className="container mx-auto px-4 z-10 text-center relative mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center gap-4"
        >
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-sungshin-cyan tracking-widest uppercase">
            <Globe className="w-3 h-3" />
            Global Network
          </div>
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold text-sungshin-pink tracking-widest uppercase">
            <Zap className="w-3 h-3" />
            Fast Delivery
          </div>
        </motion.div>

        <motion.h1 
          initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative text-9xl md:text-[180px] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 tracking-tighter select-none drop-shadow-2xl mb-4 md:mb-2"
        >
          2025
          {/* Shine Effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full -skew-x-12"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", repeatDelay: 3 }}
          />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 mt-4 md:mt-6"
        >
          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            성신컴퍼니 <span className="text-sungshin-cyan inline-block relative">
              연말결산
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-sungshin-cyan" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h2>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed break-keep"
        >
          중국-한국 무역 & 물류의 <span className="text-white font-semibold">새로운 기준</span>.<br/>
          압도적인 성과로 증명된 One-Stop Solution을 경험하세요.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4"
        >
             <a 
               href="https://www.ck79.kr/" 
               target="_blank" 
               rel="noopener noreferrer"
               className="bg-sungshin-cyan hover:bg-cyan-400 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(0,160,233,0.3)] transition-all transform hover:scale-105 flex items-center gap-2 group"
             >
                성신컴퍼니 바로가기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/50 uppercase tracking-widest">Scroll Down</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
            <motion.div 
               animate={{ y: [0, 12, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
               className="w-1 h-1.5 bg-white rounded-full"
            />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;