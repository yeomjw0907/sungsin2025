import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, FileCheck, HelpCircle } from 'lucide-react';
import PageCTA from '../components/PageCTA';

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
            성신컴퍼니가 해외 사업이나 이민·체류를 위해 한국 통장 개설이 필요하신 분들을
            안내해 드립니다.
          </motion.p>
        </div>
      </section>

      {/* 안내 문구 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="w-6 h-6 text-sungshin-cyan" />
                <h2 className="text-xl font-bold text-gray-900">대상</h2>
              </div>
              <p className="text-gray-600 leading-relaxed break-keep">
                해외에서 한국으로 송금·거래가 필요하신 분, 한국 체류 중 통장 개설이
                어려우신 분, 사업용 계좌가 필요하신 분 등 다양한 경우를 안내해 드립니다.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-6 h-6 text-sungshin-cyan" />
                <h2 className="text-xl font-bold text-gray-900">절차 안내</h2>
              </div>
              <p className="text-gray-600 leading-relaxed break-keep">
                필요한 서류, 가능한 은행, 개설 절차와 소요 시간 등 구체적인 내용은
                상담을 통해 안내해 드립니다. 카카오톡 또는 전화로 문의해 주세요.
              </p>
            </motion.div>
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
