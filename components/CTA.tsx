import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Zap } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[2rem] md:rounded-[2.5rem] px-6 py-12 md:p-24 overflow-hidden shadow-2xl text-center group"
        >
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sungshin-navy to-slate-800"></div>
          <motion.div 
             animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -top-20 -right-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-sungshin-cyan/30 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" 
          />
          <motion.div 
             animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute -bottom-20 -left-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-sungshin-pink/20 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" 
          />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sungshin-cyan font-bold text-xs md:text-sm mb-6 md:mb-8 border border-white/10">
                <Zap className="w-4 h-4 fill-sungshin-cyan" />
                <span>Start Your Journey Today</span>
            </div>

            <h2 className="text-3xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-tight tracking-tight">
              Ready to Expand
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sungshin-cyan to-white">
                Global Business?
              </span>
            </h2>
            
            <p className="text-base md:text-2xl text-slate-300 mb-10 md:mb-12 leading-relaxed break-keep font-light max-w-2xl">
              성신컴퍼니의 전문적인 무역/물류 솔루션과 함께라면, <br className="hidden md:block" />
              귀사의 비즈니스는 <span className="text-white font-semibold">전 세계로 뻗어나갈 수 있습니다.</span>
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <a 
                href="https://www.ck79.kr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative inline-flex w-full sm:w-auto justify-center items-center gap-4 bg-sungshin-cyan text-white px-8 py-5 md:px-12 md:py-6 rounded-2xl md:rounded-full text-lg md:text-xl font-bold transition-all shadow-[0_10px_40px_-10px_rgba(0,160,233,0.5)] overflow-hidden group"
              >
                {/* Button Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10 pointer-events-none" />
                
                <span>공식 홈페이지 바로가기</span>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>
            
            <p className="mt-6 md:mt-8 text-xs text-slate-500 font-medium">
              * 클릭 시 성신컴퍼니 공식 사이트(ck79.kr)로 이동합니다
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;