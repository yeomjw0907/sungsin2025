import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Truck, ShoppingCart, Package, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-sungshin-blue font-bold tracking-widest text-sm uppercase bg-blue-50 px-4 py-2 rounded-full">Business Areas</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-8 text-slate-900 leading-tight">
            Comprehensive <br className="md:hidden"/>
            <span className="text-sungshin-blue">Logistics Solutions</span>
          </h2>
          <p className="text-slate-600 mt-6 max-w-2xl mx-auto text-lg">
            무역, 물류, 전자상거래, 3PL/4PL까지.<br/>
            성신컴퍼니만의 체계적이고 전문적인 원스톱 시스템을 경험하세요.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
            {/* A. 무역 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe className="w-48 h-48 text-sungshin-blue" />
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-sungshin-blue group-hover:scale-110 transition-all duration-300">
                   <Globe className="text-sungshin-blue w-8 h-8 group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-3">
                  <span className="text-sungshin-blue/30 font-black text-3xl">01</span>
                  무역 (Trade)
                </h3>
                
                <div className="h-px w-full bg-slate-100 my-6" />

                <ul className="space-y-4 text-slate-600 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-sungshin-blue rounded-full mt-2 shrink-0"/>
                      <span>구매대행 (1688, 타오바오) & 시장조사</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-sungshin-blue rounded-full mt-2 shrink-0"/>
                      <span>OEM/ODM 전문 작업 진행</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-sungshin-blue rounded-full mt-2 shrink-0"/>
                      <span>공장 의뢰 및 샘플 제작 핸들링</span>
                    </li>
                </ul>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <p className="font-bold text-sungshin-blue mb-3 text-sm uppercase tracking-wide">Commission Rate</p>
                  <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex justify-between">
                        <span>2000만원 이상</span>
                        <span className="font-bold text-slate-900">1~2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>사업자통관</span>
                        <span className="font-bold text-slate-900">3~5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>결제대행</span>
                        <span className="font-bold text-slate-900">1%</span>
                      </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* B. 물류 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Truck className="w-48 h-48 text-sungshin-cyan" />
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-sungshin-cyan group-hover:scale-110 transition-all duration-300">
                   <Truck className="text-sungshin-cyan w-8 h-8 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-3">
                  <span className="text-sungshin-cyan/30 font-black text-3xl">02</span>
                  물류 (Logistics)
                </h3>

                <div className="h-px w-full bg-slate-100 my-6" />

                <ul className="space-y-4 text-slate-600 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-sungshin-cyan rounded-full mt-2 shrink-0"/>
                      <span>LCL/FCL 통관 및 전문 운송</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-sungshin-cyan rounded-full mt-2 shrink-0"/>
                      <span>항공특송 / 해운특송 서비스</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-sungshin-cyan rounded-full mt-2 shrink-0"/>
                      <span>검품, 입출고, 바코드 포장 시스템</span>
                    </li>
                </ul>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <p className="font-bold text-sungshin-cyan mb-3 text-sm uppercase tracking-wide">Key Features</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                        <span className="block font-bold text-slate-900 mb-1">주 6일</span>
                        <span className="text-xs text-slate-500">신속 출항</span>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                        <span className="block font-bold text-slate-900 mb-1">당일</span>
                        <span className="text-xs text-slate-500">TT 송금</span>
                      </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* C. 전자상거래 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <ShoppingCart className="w-48 h-48 text-indigo-500" />
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-500 group-hover:scale-110 transition-all duration-300">
                   <ShoppingCart className="text-indigo-500 w-8 h-8 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-3">
                  <span className="text-indigo-200 font-black text-3xl">03</span>
                  전자상거래 (E-Commerce)
                </h3>

                <div className="h-px w-full bg-slate-100 my-6" />

                <ul className="space-y-4 text-slate-600 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0"/>
                      <span>배송대행 (웨이하이, 이우, 광저우 센터)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0"/>
                      <span>1:1 온라인 판매 맞춤 직배송</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0"/>
                      <span>창고보관 및 전문 임가공 서비스</span>
                    </li>
                </ul>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <p className="font-bold text-indigo-500 mb-3 text-sm uppercase tracking-wide">Delivery Time</p>
                  <div className="flex justify-between items-center text-sm gap-2">
                     <div className="flex-1 text-center bg-white p-2 rounded border border-indigo-100">
                        <span className="block font-bold text-indigo-900">3-5일</span>
                        <span className="text-[10px] text-slate-500">항공</span>
                     </div>
                     <ArrowRight className="w-4 h-4 text-indigo-200" />
                     <div className="flex-1 text-center bg-white p-2 rounded border border-indigo-100">
                        <span className="block font-bold text-indigo-900">5-7일</span>
                        <span className="text-[10px] text-slate-500">해운</span>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* D. 3PL & 4PL */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Package className="w-48 h-48 text-slate-600" />
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-slate-800 group-hover:scale-110 transition-all duration-300">
                   <Package className="text-slate-600 w-8 h-8 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-2xl font-bold mb-2 text-slate-900 flex items-center gap-3">
                  <span className="text-slate-200 font-black text-3xl">04</span>
                  3PL & 4PL
                </h3>

                <div className="h-px w-full bg-slate-100 my-6" />

                <ul className="space-y-4 text-slate-600 mb-8">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-2 shrink-0"/>
                      <span>원산지 작업 (스티커, 도장, 미싱)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-2 shrink-0"/>
                      <span>제품 포장지 교체 및 세밀 분류</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-2 shrink-0"/>
                      <span>KC인증 스티커 및 한글표시사항</span>
                    </li>
                </ul>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <p className="font-bold text-slate-600 mb-3 text-sm uppercase tracking-wide">Custom Service</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    난이도 높은 스티커 작업부터 재포장, 분리포장, 나눔포장까지 <strong className="text-slate-900">모든 임가공 작업</strong>이 가능합니다.
                  </p>
                </div>
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;