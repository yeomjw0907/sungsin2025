import React from 'react';
import { motion } from 'framer-motion';

const images = [
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    alt: "Warehouse Overview",
    span: "md:col-span-2 md:row-span-2",
    title: "대규모 물류 센터",
    desc: "최적화된 적재 시스템"
  },
  {
    src: "https://images.unsplash.com/photo-1494412574643-35d324698420?q=80&w=2068&auto=format&fit=crop",
    alt: "Quality Control",
    span: "md:col-span-1 md:row-span-1",
    title: "정밀 검수",
    desc: "꼼꼼한 품질 확인"
  },
  {
    src: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070&auto=format&fit=crop",
    alt: "Shipping",
    span: "md:col-span-1 md:row-span-1",
    title: "신속 출고",
    desc: "매일 컨테이너 작업"
  },
  {
    src: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2070&auto=format&fit=crop",
    alt: "Office Team",
    span: "md:col-span-2 md:row-span-1",
    title: "전문 운영팀",
    desc: "실시간 CS 대응"
  }
];

const Gallery: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-end items-end mb-12 gap-6"
        >
          <p className="text-slate-400 max-w-sm text-sm md:text-base leading-relaxed text-right">
            성신컴퍼니는 페이퍼 컴퍼니가 아닙니다.<br/>
            실제 운영 중인 대규모 물류 센터와 전문 인력이<br/>
            고객님의 화물을 가장 안전하게 책임집니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px] md:h-[500px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group rounded-2xl overflow-hidden ${img.span} bg-slate-800`}
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                 <h4 className="text-xl font-bold text-white">{img.title}</h4>
                 <p className="text-sungshin-cyan text-sm">{img.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;