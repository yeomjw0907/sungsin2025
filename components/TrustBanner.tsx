import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  "1688.com", "Taobao", "Alibaba", "Coupang", "Naver Shopping", 
  "11st", "Gmarket", "Auction", "TMALL", "JD.com",
  "FedEx", "EMS", "CJ Logistics", "Lotte Global"
];

const TrustBanner: React.FC = () => {
  return (
    <section className="py-8 bg-white border-b border-slate-100 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
      
      <div className="flex w-full">
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <div key={index} className="inline-flex items-center justify-center mx-8 md:mx-12 opacity-40 hover:opacity-100 transition-opacity cursor-default grayscale hover:grayscale-0">
              <span className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter uppercase font-sans">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBanner;