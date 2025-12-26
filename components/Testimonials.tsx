import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    role: "스마트스토어 파워셀러",
    name: "김** 대표님",
    content: "기존 배대지의 느린 CS 때문에 매출 타격이 컸는데, 성신으로 옮기고 나서 배송 관련 클레임이 '0건'이 되었습니다. 특히 실시간 소통이 너무 편해요.",
    tags: ["빠른CS", "클레임제로"]
  },
  {
    id: 2,
    role: "의류 쇼핑몰 CEO",
    name: "박** 대표님",
    content: "사입부터 검수, 라벨갈이까지 한 번에 해결해주니 업무 효율이 200% 올랐습니다. 덕분에 저는 마케팅에만 집중할 수 있게 되었어요.",
    tags: ["올인원서비스", "매출상승"]
  },
  {
    id: 3,
    role: "쿠팡 로켓그로스 입점사",
    name: "이** 이사님",
    content: "대량 화물 들여올 때 통관 이슈가 늘 걱정이었는데, 성신컴퍼니의 전문적인 핸들링 덕분에 한 번도 문제 생긴 적이 없습니다. 정말 든든합니다.",
    tags: ["통관전문", "신뢰100%"]
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
            Partners' <span className="text-sungshin-blue">Success Stories</span>
          </h2>
          <p className="text-slate-500 text-lg">성신컴퍼니와 함께 성장한 파트너사들의 실제 이야기입니다.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 relative hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="absolute -top-4 -left-2 text-slate-100">
                <Quote className="w-16 h-16 transform -scale-x-100" />
              </div>
              
              <div className="relative z-10">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                
                <p className="text-slate-700 text-lg font-medium leading-relaxed mb-6 break-keep">
                  "{review.content}"
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {review.tags.map(tag => (
                    <span key={tag} className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-md font-bold">#{tag}</span>
                  ))}
                </div>
                
                <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sungshin-blue to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                      {review.name.charAt(0)}
                   </div>
                   <div>
                      <h4 className="font-bold text-slate-900">{review.name}</h4>
                      <p className="text-xs text-slate-500">{review.role}</p>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;