import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// public/reviews/ 에 저장한 카톡 후기 이미지 경로 (review-1.png ~ review-7.png 등 추가)
const REVIEW_IMAGES = [
  '/reviews/review-1.png',
  '/reviews/review-2.png',
  '/reviews/review-3.png',
  '/reviews/review-4.png',
  '/reviews/review-5.png',
  '/reviews/review-6.png',
  '/reviews/review-7.png',
];

const CARD_WIDTH = 280;
const GAP = 16;

const KakaoReviews: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const step = CARD_WIDTH + GAP;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="p-2 rounded-xl bg-sungshin-cyan/10">
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-sungshin-cyan" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              성신컴퍼니 카카오톡 후기
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-0.5">
              카카오톡으로 주고받은 실제 상담 후기입니다.
            </p>
          </div>
        </motion.div>

        <div className="relative">
          {/* 좌우 화살표 (데스크톱) */}
          <div className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-2">
            <motion.button
              type="button"
              onClick={() => scroll('left')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-sungshin-cyan transition-colors"
              aria-label="이전 후기"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          </div>
          <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-2">
            <motion.button
              type="button"
              onClick={() => scroll('right')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-sungshin-cyan transition-colors"
              aria-label="다음 후기"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* 가로 스크롤 영역 */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto overflow-y-hidden py-4 -mx-4 px-4 md:mx-0 md:px-12 scroll-smooth"
            style={{
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {REVIEW_IMAGES.map((src, index) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-[260px] md:w-[280px] rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-50"
                style={{
                  scrollSnapAlign: 'start',
                  maxHeight: '420px',
                }}
              >
                <img
                  src={src}
                  alt={`고객 후기 ${index + 1}`}
                  className="w-full h-full object-contain object-top"
                  style={{ maxHeight: '420px', minHeight: '320px' }}
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent && !parent.querySelector('.placeholder')) {
                      const span = document.createElement('span');
                      span.className = 'placeholder flex items-center justify-center w-full text-slate-400 text-sm p-8';
                      span.style.minHeight = '320px';
                      span.textContent = '후기 이미지';
                      parent.appendChild(span);
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KakaoReviews;
