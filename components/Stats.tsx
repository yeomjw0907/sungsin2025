import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { StatItem } from '../types';
import { TrendingUp, Users, Package, MapPin, Activity } from 'lucide-react';

const stats = [
  { id: 1, label: "보유 고객", value: 10000, suffix: "+", color: "text-white", icon: Users },
  { id: 2, label: "월 LCL 출고", value: 500, suffix: " CBM", color: "text-sungshin-cyan", icon: Package },
  { id: 3, label: "전자상거래 건수", value: 100000, suffix: "+", color: "text-sungshin-pink", icon: TrendingUp },
  { id: 4, label: "본사 고객 방문", value: 100, suffix: "명+", color: "text-sungshin-yellow", icon: MapPin },
  { id: 5, label: "회원 증가율", value: 84, suffix: "%", color: "text-green-400", icon: Activity },
];

const Counter = ({ value, suffix, color }: { value: number, suffix: string, color: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, value, { duration: 2.5, ease: "easeOut" });
      return animation.stop;
    }
  }, [isInView, value]);

  return (
    <div className={`text-3xl md:text-5xl font-black mb-2 ${color} tracking-tight flex items-baseline justify-center gap-1`} ref={ref}>
       <motion.span>{rounded}</motion.span>
       <span className="text-2xl md:text-4xl">{suffix}</span>
    </div>
  );
};

const Stats: React.FC = () => {
  return (
    <section className="py-24 bg-sungshin-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sungshin-cyan/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sungshin-pink/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 animate-pulse" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-sungshin-cyan font-bold tracking-widest text-xs uppercase mb-4 border border-white/10 shadow-[0_0_15px_rgba(0,160,233,0.3)]">
            Performance Report
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            2025 BUSINESS <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sungshin-cyan via-blue-400 to-sungshin-blue">HIGHLIGHTS</span>
          </h2>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto break-keep">
            고객의 신뢰로 증명된 성신컴퍼니의 압도적인 성과.<br/>
            수치로 증명하는 1등 파트너의 역량을 확인하세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className={`flex flex-col items-center p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-sungshin-cyan/50 transition-all group ${index === 4 ? "col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                <stat.icon className={`w-7 h-7 ${stat.color} drop-shadow-lg`} />
              </div>
              
              <Counter value={stat.value} suffix={stat.suffix} color={stat.color} />
              
              <span className="text-sm font-bold text-gray-400 text-center uppercase tracking-wide group-hover:text-white transition-colors">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;