import React from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  FileCheck,
  HelpCircle,
  Users,
  FileText,
  CheckCircle2,
  MessageCircle,
  Phone,
} from 'lucide-react';
import PageCTA from '../components/PageCTA';

const steps = [
  { step: 1, title: '통신사·요금제 선택', desc: '구매대행·업무용에 맞는 통신사·요금제를 안내합니다. 인증·연락 용도에 맞는 옵션도 설명해 드립니다.' },
  { step: 2, title: '신분증 준비·방문', desc: '신분증(여권 또는 외국인등록증)만 준비하시면 됩니다. 이후 개통 절차는 전담 매니저가 단계별로 안내합니다.' },
  { step: 3, title: '개통 완료', desc: '개통 후 USIM·요금 납부·인증용 사용 방법 등 필요한 안내를 해 드립니다.' },
];

const targets = [
  '중국 구매대행 업무에 필요한 중국 휴대폰 번호를 준비하시는 분',
  '쇼핑몰 운영·결제 인증·고객 응대용 중국 번호가 필요하신 분',
  '장기 체류 또는 사업 운영 목적으로 안정적인 중국 번호가 필요하신 분',
];

const stayTypes = [
  { label: '단기 체류', desc: '여행·출장 등 단기 방문 시 선불 요금제·여행용 USIM 등이 적합할 수 있습니다. 구매대행 초기 세팅 시에도 이용하시는 분이 많습니다.' },
  { label: '장기 체류(외국인등록)', desc: '월정액 요금제·자급제 등 선택지가 넓어집니다. 구매대행 업무용으로 장기 사용하시는 분들께 안내해 드립니다.' },
  { label: '사업자', desc: '사업자 등록 여부에 따라 요금제·개통 절차가 달라질 수 있습니다. 상담 시 구매대행 목적에 맞게 안내해 드립니다.' },
];

const faqs = [
  { q: '구매대행용으로 중국 휴대폰 개통이 필요한가요?', a: '쇼핑몰 가입·결제 인증·업체 연락 등에 중국 번호가 필요한 경우가 많습니다. 성신컴퍼니 고객님 중에도 구매대행 목적으로 개통을 이용하시는 분이 많습니다.' },
  { q: '개통까지 얼마나 걸리나요?', a: '신분증이 준비되어 있으면 1일 내 개통 가능한 경우가 많습니다. 체류 조건과 통신사에 따라 소요 시간은 달라질 수 있습니다.' },
  { q: '외국인등록증 없이도 가능한가요?', a: '단기 방문 시 여권만으로 가능한 상품이 있을 수 있습니다. 체류 형태에 맞는 방법을 상담을 통해 안내해 드립니다.' },
];

const PhonePage: React.FC = () => {
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
            <Smartphone className="w-7 h-7" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-gray-900 mb-4"
          >
            구매대행 업무용 중국 번호 개통 지원
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto break-keep"
          >
            쇼핑몰 인증, 결제, 고객 소통에 필요한 중국 번호 개통을 전담 매니저가 빠르게 지원합니다.
            신분증만 준비하시면 나머지 절차는 성신컴퍼니가 안내해 드립니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
          >
            <a
              href="http://pf.kakao.com/_xfUgUn/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#FEE500] text-gray-900 px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              전담 매니저 상담 요청
            </a>
            <a
              href="tel:010-3213-1319"
              className="inline-flex items-center justify-center gap-2 bg-sungshin-cyan text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <Phone className="w-5 h-5" />
              전화 상담 연결
            </a>
          </motion.div>
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
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">이런 분들께 적합합니다</h2>
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

      {/* 체류 형태별 */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <FileText className="w-6 h-6 text-sungshin-cyan" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">체류 형태별 안내</h2>
          </motion.div>
          <div className="space-y-4">
            {stayTypes.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-5 border border-slate-100"
              >
                <h3 className="font-bold text-gray-900 mb-2">{item.label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed break-keep">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 필요한 서류 */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">준비 서류</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100"
          >
            <p className="text-gray-600 leading-relaxed break-keep">
              <strong className="text-gray-800">신분증(여권 또는 외국인등록증)만</strong> 있으면 됩니다.
              이후 개통 절차는 전담 매니저가 안내해 드립니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 절차 3단계 */}
      <section className="py-12 md:py-16 bg-slate-50">
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
                className="bg-white rounded-2xl p-6 border border-slate-100"
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
            통신사 선택, 소요 기간 등 구체적인 내용은 카카오톡 또는 전화 상담을 통해 안내해 드립니다.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-white">
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
                className="bg-slate-50 rounded-xl p-5 border border-slate-100"
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
        title="인증부터 고객 응대까지, 업무용 번호를 안정적으로 준비하세요"
        description="체류 조건에 맞는 개통 옵션을 확인하고 빠르게 상담받으세요."
      />
    </div>
  );
};

export default PhonePage;
