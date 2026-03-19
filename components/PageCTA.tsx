import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';

const KAKAO_URL = 'https://pf.kakao.com/_xdxhxexj';
const TEL_URL = 'tel:010-3213-1319';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface PageCTAProps {
  title: string;
  description?: string;
}

const PageCTA: React.FC<PageCTAProps> = ({ title, description }) => {
  const reduceMotion = useReducedMotion();
  const trackClick = (label: string) => {
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
          className="relative rounded-[2rem] md:rounded-[2.5rem] px-6 py-12 md:p-16 overflow-hidden shadow-2xl text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sungshin-navy to-slate-800" />
          <motion.div
            animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
            transition={reduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-20 -right-20 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-sungshin-cyan/30 rounded-full blur-[80px] pointer-events-none"
          />
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
              {title}
            </h2>
            {description && (
              <p className="text-slate-300 mb-8 text-sm md:text-base break-keep">
                {description}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <motion.a
                href={KAKAO_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                onClick={() => trackClick('Page CTA Kakao')}
                className="inline-flex items-center justify-center gap-2 bg-[#FEE500] text-gray-900 px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                전담 매니저 상담 요청
              </motion.a>
              <motion.a
                href={TEL_URL}
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                onClick={() => trackClick('Page CTA Call')}
                className="inline-flex items-center justify-center gap-2 bg-sungshin-cyan text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                <Phone className="w-5 h-5" />
                전화 상담 연결
              </motion.a>
            </div>
            <p className="mt-6 text-xs text-slate-500 font-medium">
              * 카카오톡 오픈채널 또는 전화로 편하게 문의해 주세요
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PageCTA;
