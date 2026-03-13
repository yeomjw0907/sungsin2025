import React from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  FileCheck,
  HelpCircle,
  Users,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import PageCTA from '../components/PageCTA';

const steps = [
  { step: 1, title: '신분증 준비', desc: '신분증(여권 또는 외국인등록증)만 준비하시면 됩니다. 나머지 서류·절차는 성신컴퍼니가 알아서 안내·처리해 드립니다.' },
  { step: 2, title: '방문·예약', desc: '선택하신 은행 방문 또는 예약 절차를 안내합니다. 비대면 가능 여부도 상담 시 확인 가능합니다.' },
  { step: 3, title: '개설 완료', desc: '계좌 개설 후 입출금·송금·결제 이용 방법까지 구매대행에 필요한 부분을 안내해 드립니다.' },
];

const targets = [
  '중국 구매대행으로 한국 계좌가 필요하신 분',
  '대리 송금·결제·정산용 한국 통장이 필요하신 분',
  '사업용·개인용 구매대행 계좌를 준비 중이신 분',
  '한국 체류 중 통장 개설이 어려워 안내가 필요하신 분',
];

const faqs = [
  { q: '구매대행용으로 한국 통장 개설이 가능한가요?', a: '네. 성신컴퍼니 고객님 중 상당수가 구매대행 목적으로 통장 개설을 이용하십니다. 체류·서류에 맞는 방법을 상담 시 안내해 드립니다.' },
  { q: '개설까지 소요 기간은 얼마나 되나요?', a: '신분증만 있으시면 1일 안에도 개설 가능합니다. 당일 처리되는 경우가 많으며, 나머지는 성신컴퍼니가 알아서 도와드립니다.' },
  { q: '비대면으로도 개설할 수 있나요?', a: '은행과 상품에 따라 비대면 개설이 가능한 경우가 있습니다. 상담을 통해 가능 여부를 확인해 드립니다.' },
];

const BankPage: React.FC = () => {
  return (
    <div className="pb-8">
      {/* Hero */}
      <section className="relative w-full bg-gradient-to-b from-slate-50 to-white py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sungshin-cyan/10 text-sungshin-cyan mb-6"
          >
            <CreditCard className="w-7 h-7" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-gray-900 mb-4"
          >
            통장 개설 도움
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto break-keep"
          >
            중국 구매대행 하시는 분들 중 한국 통장이 필요하신 분들을 성신컴퍼니가
            안내해 드립니다. 신분증만 있으면 되며, 나머지는 성신컴퍼니가 알아서 도와드립니다. 1일 안에도 개설 가능합니다.
          </motion.p>
        </div>
      </section>

      {/* 이런 분들께 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <Users className="w-6 h-6 text-sungshin-cyan" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">이런 분들께 도움을 드립니다</h2>
          </motion.div>
          <ul className="space-y-3">
            {targets.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 text-gray-700"
              >
                <CheckCircle2 className="w-5 h-5 text-sungshin-cyan shrink-0 mt-0.5" />
                <span className="break-keep">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* 필요한 서류 */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <FileText className="w-6 h-6 text-sungshin-cyan" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">필요한 것</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100"
          >
            <p className="text-gray-600 leading-relaxed break-keep mb-4">
              <strong className="text-gray-800">신분증(여권 또는 외국인등록증)만</strong> 있으면 됩니다.
              나머지 서류·절차는 성신컴퍼니가 알아서 안내하고 처리해 드리니, 부담 갖지 마시고 문의해 주세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 절차 3단계 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <HelpCircle className="w-6 h-6 text-sungshin-cyan" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">절차 안내</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <div className="w-10 h-10 rounded-full bg-sungshin-cyan text-white flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed break-keep">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-gray-500 text-sm text-center break-keep">
            가능한 은행, 소요 시간 등 구체적인 내용은 카카오톡 또는 전화 상담을 통해 안내해 드립니다.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <FileCheck className="w-6 h-6 text-sungshin-cyan" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">자주 묻는 질문</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-5 border border-slate-100"
              >
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-sungshin-cyan">Q.</span> {item.q}
                </h3>
                <p className="text-gray-600 text-sm pl-6 break-keep">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        title="통장 개설이 필요하신가요?"
        description="카카오톡 또는 전화로 문의하시면 친절히 안내해 드립니다."
      />
    </div>
  );
};

export default BankPage;
