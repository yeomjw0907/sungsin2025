import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles } from 'lucide-react';

const Intro: React.FC = () => {
  return (
    <section className="hidden md:block py-28 bg-white relative overflow-hidden">
       {/* Decorative Background Elements */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-slate-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-slate-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
       </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
        >
            <div className="flex items-center justify-center gap-2 mb-4">
               <Sparkles className="w-5 h-5 text-sungshin-yellow" />
               <span className="text-sungshin-navy font-bold tracking-widest text-sm uppercase">Our Leadership</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Vision for <span className="text-sungshin-blue relative inline-block">
                Excellence
                <span className="absolute bottom-1 left-0 w-full h-2 bg-blue-100 -z-10"></span>
              </span>
            </h2>
            <p className="text-slate-500 mt-6 text-lg max-w-2xl mx-auto break-keep">
              성신컴퍼니를 이끄는 두 대표의 약속.<br/>
              고객과 함께 성장하는 진정한 파트너십을 지향합니다.
            </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
          {/* China CEO */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50, delay: 0.1 }}
            className="group relative bg-white rounded-[2rem] p-8 lg:p-12 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Quote className="w-24 h-24 text-sungshin-cyan transform rotate-12" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-5 mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden shadow-inner relative group-hover:scale-105 transition-transform duration-300 shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                            <span className="text-slate-400 text-xs font-bold">IMAGE</span>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-slate-500 font-bold tracking-wider text-xs uppercase">China Branch</span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">채광학 <span className="text-base font-normal text-slate-400">대표</span></h3>
                    </div>
                </div>
                
                <blockquote className="flex-grow">
                    <p className="text-slate-700 text-lg lg:text-xl leading-relaxed font-medium italic mb-6 break-keep relative">
                      <span className="text-sungshin-cyan text-4xl absolute -top-4 -left-2 opacity-30">"</span>
                      성신컴퍼니는 지속적인 혁신과 도전으로 '고객 만족의 그날까지' 노력하는 글로벌 리딩 무역 & 물류 기업으로 도약하겠습니다.
                      <span className="text-sungshin-cyan text-4xl absolute -bottom-4 -right-2 opacity-30">"</span>
                    </p>
                </blockquote>

                <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-end">
                    <div className="text-sm text-slate-400 font-medium">Global Logistics Expert</div>
                    <div className="font-handwriting text-2xl text-slate-600 opacity-60 rotate-[-5deg]">Cai Guangxue</div>
                </div>
            </div>
          </motion.div>

          {/* Korea CEO */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
            className="group relative bg-sungshin-navy rounded-[2rem] p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-sungshin-navy to-slate-900 z-0"></div>
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Quote className="w-24 h-24 text-white transform rotate-12" />
            </div>

            <div className="relative z-10 flex flex-col h-full text-white">
                <div className="flex items-center gap-5 mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 overflow-hidden shadow-inner relative group-hover:scale-105 transition-transform duration-300 border border-white/10 shrink-0">
                         <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                            <span className="text-white/40 text-xs font-bold">IMAGE</span>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-sungshin-cyan animate-pulse"></span>
                            <span className="text-sungshin-cyan font-bold tracking-wider text-xs uppercase">Korea HQ</span>
                        </div>
                        <h3 className="text-2xl font-black text-white">가인웅 <span className="text-base font-normal text-slate-400">대표</span></h3>
                    </div>
                </div>

                <blockquote className="flex-grow">
                    <p className="text-gray-200 text-lg lg:text-xl leading-relaxed font-medium italic mb-6 break-keep relative">
                      <span className="text-white text-4xl absolute -top-4 -left-2 opacity-20">"</span>
                      성신컴퍼니는 고객님들이 필요하는 부분을 먼저 찾아내서 끊임없이 움직이고, 사업 발전의 마중물 같은 기업이 되도록 동행하겠습니다.
                      <span className="text-white text-4xl absolute -bottom-4 -right-2 opacity-20">"</span>
                    </p>
                </blockquote>

                <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-end">
                    <div className="text-sm text-slate-400 font-medium">Strategic Planning</div>
                    <div className="font-handwriting text-2xl text-white opacity-60 rotate-[-5deg]">Ga In-woong</div>
                </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Intro;