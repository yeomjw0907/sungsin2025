import React, { useEffect } from 'react';
import { AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area } from 'recharts';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { TrendingUp, Award, ThumbsUp } from 'lucide-react';

const data = [
  { year: '2019', revenue: 20 },
  { year: '2020', revenue: 35 },
  { year: '2021', revenue: 50 },
  { year: '2022', revenue: 75 },
  { year: '2023', revenue: 120 },
  { year: '2024', revenue: 180 },
  { year: '2025', revenue: 300 },
];

const CountUp = ({ to }: { to: number }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
  
    useEffect(() => {
      if (isInView) {
        animate(count, to, { duration: 2 });
      }
    }, [isInView, to]);
  
    return <motion.span ref={ref}>{rounded}</motion.span>;
};

const GrowthChart: React.FC = () => {
  return (
    <section className="py-32 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 flex flex-col justify-center"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-8 leading-tight">
              Unstoppable <br/>
              <span className="text-sungshin-blue relative">
                Growth Engine.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-sungshin-blue/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h2>
            
            <div className="space-y-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-lg transition-all"
              >
                <div className="bg-blue-50 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-sungshin-blue" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">지속적인 성장</h4>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                    매년 50% 이상의 압도적인 성장률.<br/>
                    수많은 셀러와 함께 성공 신화를 만듭니다.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-lg transition-all"
              >
                <div className="bg-yellow-50 p-3 rounded-xl">
                  <ThumbsUp className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-slate-900">고객 만족도 98%</h4>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                    업계 최고 수준의 재이용률.<br/>
                    빠른 피드백과 정확한 업무 처리의 결과입니다.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-2/3 bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 md:p-12 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Award className="w-64 h-64 text-slate-900" />
             </div>

            <div className="flex justify-between items-end mb-8 relative z-10">
              <div>
                 <h3 className="text-xl font-bold text-slate-900">Yearly Revenue Growth</h3>
                 <p className="text-slate-400 text-sm">2019 - 2025 (Projected)</p>
              </div>
              <div className="text-right">
                 <span className="flex items-center justify-end text-3xl font-black text-sungshin-blue">
                    +<CountUp to={150} />%
                 </span>
                 <span className="text-xs font-bold text-green-500 uppercase tracking-wide">Overall Growth</span>
              </div>
            </div>

            <div className="h-[400px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0056b3" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0056b3" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} 
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' }}
                    contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        color: '#fff', 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' 
                    }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => [`${value}`, 'Revenue Index']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#0056b3" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)"
                    animationDuration={2000}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GrowthChart;