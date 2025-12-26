import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Plane, Building2, Anchor } from 'lucide-react';

const Locations: React.FC = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background World Map */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
         <img 
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" 
            alt="World Map" 
            className="w-full h-full object-cover grayscale"
         />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-sungshin-cyan font-bold tracking-widest text-sm uppercase bg-cyan-50 px-4 py-2 rounded-full">Global Network</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 text-slate-900">
            Connected Logistics
          </h2>
          <p className="text-slate-500 mt-4 text-lg">
            인천과 위해를 잇는 최적의 물류 라인으로<br/> 
            가장 빠르고 안전한 서비스를 제공합니다.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
           {/* Visual Map Connector Line */}
           <div className="hidden lg:block absolute top-[120px] left-[25%] right-[25%] h-[2px] bg-slate-100 overflow-hidden z-0">
             <motion.div 
               animate={{ x: [-100, 800] }}
               transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
               className="w-32 h-full bg-gradient-to-r from-transparent via-sungshin-cyan to-transparent"
             />
           </div>

           {/* Flight Icon Animation */}
           <motion.div 
              className="hidden lg:block absolute top-[104px] left-[45%] z-10 bg-white p-2 rounded-full shadow-sm border border-slate-100"
              animate={{ x: [-20, 20] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
           >
              <Plane className="w-6 h-6 text-sungshin-cyan" />
           </motion.div>
           
           <div className="grid lg:grid-cols-2 gap-12 relative z-10">
              {/* Weihai Card */}
              <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-300"
              >
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg text-white">
                        <Anchor className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                            <span className="text-green-600 font-bold text-sm tracking-wide">CHINA BRANCH</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">중국 위해 지사</h3>
                    </div>
                 </div>

                 <div className="bg-slate-50 rounded-xl p-5 mb-6">
                    <p className="text-slate-600 text-sm font-medium leading-relaxed mb-2">
                       山东省 威海市 环翠区凤林街道海南路9号 诚心国际
                    </p>
                    <p className="text-slate-400 text-xs">
                       威广物流北门/诚心物流
                    </p>
                 </div>
                 
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <span className="text-green-600 font-bold text-xs">01</span>
                        </div>
                        <span className="text-slate-700 font-medium">무역전담팀 & 국제물류팀 운영</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <span className="text-green-600 font-bold text-xs">02</span>
                        </div>
                        <span className="text-slate-700 font-medium">대규모 전자상거래 배대지 센터</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <span className="text-green-600 font-bold text-xs">03</span>
                        </div>
                        <span className="text-slate-700 font-medium">전문 검품 및 원산지 작업팀 상주</span>
                    </div>
                 </div>
              </motion.div>

              {/* Incheon Card */}
              <motion.div 
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-300"
              >
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sungshin-navy to-blue-900 flex items-center justify-center shadow-lg text-white">
                        <Building2 className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-sungshin-navy animate-pulse"/>
                            <span className="text-sungshin-navy font-bold text-sm tracking-wide">KOREA HQ</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">한국 인천 본사</h3>
                    </div>
                 </div>

                 <div className="bg-slate-50 rounded-xl p-5 mb-6">
                    <p className="text-slate-600 text-sm font-medium leading-relaxed mb-2">
                       인천광역시 미추홀구 석정로 282번길 34
                    </p>
                    <p className="text-slate-400 text-xs">
                       푸른빌딩 4층
                    </p>
                 </div>
                 
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <span className="text-sungshin-navy font-bold text-xs">01</span>
                        </div>
                        <span className="text-slate-700 font-medium">고객 소통 CS 전담팀</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <span className="text-sungshin-navy font-bold text-xs">02</span>
                        </div>
                        <span className="text-slate-700 font-medium">무역 상담 및 견적 의뢰</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <span className="text-sungshin-navy font-bold text-xs">03</span>
                        </div>
                        <span className="text-slate-700 font-medium">전략 기획 및 마케팅 본부</span>
                    </div>
                 </div>
              </motion.div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;