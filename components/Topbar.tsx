import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, ExternalLink, Headphones, X } from 'lucide-react';

const Topbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Topbar - 성신컴퍼니 바로가기만 */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-sungshin-navy/95 backdrop-blur-sm text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end h-12 md:h-14">
            <motion.a
              href="https://www.ck79.kr/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-sm md:text-base font-semibold hover:text-sungshin-cyan transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>성신컴퍼니 바로가기</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* 플로팅 상담 메뉴 - 우측 하단 */}
      <div className="fixed bottom-6 right-6 z-50" ref={menuRef}>
        {/* 메인 버튼 */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-white transition-all ${
            isOpen ? 'bg-sungshin-cyan/90' : 'bg-sungshin-cyan hover:bg-sungshin-cyan/90'
          }`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 md:w-7 md:h-7" />
            ) : (
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
            )}
          </motion.div>
        </motion.button>

        {/* 메뉴 */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-4 bg-white rounded-2xl shadow-2xl overflow-hidden min-w-[200px]"
            >
              {/* 실시간 상담 (전화) */}
              <motion.a
                href="tel:02-1234-5678"
                whileHover={{ backgroundColor: '#f3f4f6' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-5 py-4 text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-100 active:bg-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-sungshin-cyan flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">실시간 상담</div>
                  <div className="text-xs text-gray-500">전화 문의</div>
                </div>
              </motion.a>

              {/* 오픈채널 상담 */}
              <motion.a
                href="https://pf.kakao.com/_xdxhxexj"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ backgroundColor: '#f3f4f6' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-5 py-4 text-gray-900 hover:bg-gray-50 transition-colors border-b border-gray-100 active:bg-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-gray-900" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">오픈채널 상담</div>
                  <div className="text-xs text-gray-500">카카오톡</div>
                </div>
              </motion.a>

              {/* 위챗 상담 */}
              <motion.a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ backgroundColor: '#f3f4f6' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-5 py-4 text-gray-900 hover:bg-gray-50 transition-colors active:bg-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">위챗 상담</div>
                  <div className="text-xs text-gray-500">WeChat</div>
                </div>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Topbar;
