import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Phone, Zap } from 'lucide-react';
import { logSiteEvent } from '../lib/eventLogger';
import { KAKAO_OPEN_CHAT_PURCHASE } from '../lib/kakaoLinks';

const TEL_URL = 'tel:010-3213-1319';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const CTA: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const trackClick = (label: string) => {
    void logSiteEvent({ event_name: 'cta_click', event_label: label });
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'Consult',
        event_label: label,
      });
    }
  };

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
             animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
             transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -top-20 -right-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-sungshin-cyan/30 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" 
          />
          <motion.div 
             animate={reduceMotion ? undefined : { scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
             transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="absolute -bottom-20 -left-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-sungshin-pink/20 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" 
          />

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sungshin-cyan font-bold text-xs md:text-sm mb-6 md:mb-8 border border-white/10">
                <Zap className="w-4 h-4 fill-sungshin-cyan" />
                <span>전담 매니저 빠른 상담</span>
            </div>

            <h2 className="text-3xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 leading-tight tracking-tight">
              상담 한 번으로
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-sungshin-cyan to-white">
                운영 리스크를 줄이세요
              </span>
            </h2>
            
            <p className="text-base md:text-2xl text-slate-300 mb-10 md:mb-12 leading-relaxed break-keep font-light max-w-2xl">
              사업 규모와 품목에 맞는 무역·물류 실행안을
              <br className="hidden md:block" />
              <span className="text-white font-semibold">전담 매니저가 직접 안내합니다.</span>
            </p>
            
            <div className="w-full max-w-xl flex flex-col sm:flex-row gap-3">
              <motion.a
                href={KAKAO_OPEN_CHAT_PURCHASE}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                onClick={() => trackClick('Main CTA Kakao')}
                className="inline-flex w-full sm:w-auto flex-1 items-center justify-center gap-2 bg-[#FEE500] text-gray-900 px-8 py-4 rounded-xl text-base font-bold transition-all shadow-[0_10px_40px_-10px_rgba(254,229,0,0.55)]"
              >
                <MessageCircle className="w-5 h-5" />
                전담 매니저 상담 요청
              </motion.a>
              <motion.a
                href={TEL_URL}
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                onClick={() => trackClick('Main CTA Call')}
                className="inline-flex w-full sm:w-auto flex-1 items-center justify-center gap-2 bg-sungshin-cyan text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-[0_10px_40px_-10px_rgba(0,160,233,0.55)]"
              >
                <Phone className="w-5 h-5" />
                전화 상담 연결
              </motion.a>
            </div>
            
            <p className="mt-6 md:mt-8 text-xs text-slate-500 font-medium">
              * 카카오톡 또는 전화로 연결되며, 문의 내용에 맞춰 전담 매니저가 안내합니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;