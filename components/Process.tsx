import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ClipboardCheck, Ship, Truck, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "주문 및 접수",
    desc: "타오바오/1688 주문 및 배송대행 신청",
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    title: "입고 및 정밀검수",
    desc: "현지 창고 도착, 수량/파손/옵션 정밀 체크",
    icon: ClipboardCheck,
    color: "bg-cyan-100 text-cyan-600"
  },
  {
    id: 3,
    title: "선적 및 통관",
    desc: "최적의 루트로 선적 후 신속 통관 진행",
    icon: Ship,
    color: "bg-indigo-100 text-indigo-600"
  },
  {
    id: 4,
    title: "국내 배송 완료",
    desc: "고객 수령까지 안전하게 최종 배송",
    icon: Truck,
    color: "bg-green-100 text-green-600"
  }
];

const Process: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
           <span className="text-sungshin-cyan font-bold tracking-widest text-sm uppercase bg-cyan-50 px-4 py-2 rounded-full">Work Process</span>
           <h2 className="text-3xl md:text-4xl font-bold mt-6 text-slate-900">
             Seamless Logistics Flow
           </h2>
           <p className="text-slate-500 mt-4">복잡한 무역 과정을 성신컴퍼니만의 시스템으로 단순화했습니다.</p>
        </motion.div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-slate-100 z-0">
             <motion.div 
               initial={{ width: "0%" }}
               whileInView={{ width: "100%" }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, delay: 0.5 }}
               className="h-full bg-slate-200"
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className={`w-24 h-24 rounded-full ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative bg-white border-4 border-slate-50`}>
                  <step.icon className="w-10 h-10" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {step.id}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[200px] break-keep">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-sungshin-cyan font-semibold bg-cyan-50 px-6 py-3 rounded-full">
                <CheckCircle2 className="w-5 h-5" />
                <span>전 과정 실시간 트래킹 시스템 제공</span>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Process;