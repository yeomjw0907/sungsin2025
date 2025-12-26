import React from 'react';
import { Phone, MapPin, Mail, FileText, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20 border-t border-slate-900 text-sm">
      <div className="container mx-auto px-6">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
            <div>
                <h2 className="text-3xl font-black text-white tracking-tight mb-2">SUNGSHIN COMPANY</h2>
                <p className="text-slate-500 font-medium">Total Logistics & Trade Solution Partner</p>
            </div>
            <a href="https://www.ck79.kr/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white font-bold hover:text-sungshin-cyan transition-colors">
                Visit Official Website <ArrowUpRight className="w-4 h-4" />
            </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 mb-20">
          
          {/* Korea Entity Info */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg flex items-center gap-3">
                <span className="w-8 h-[2px] bg-sungshin-cyan block"></span>
                한국 본사 (KOREA HQ)
            </h3>
            
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                <p className="font-bold text-white text-base mb-4">어진무역상사 (성신컴퍼니)</p>
                <div className="space-y-3">
                    <div className="flex gap-4">
                        <span className="text-slate-600 w-20 shrink-0">대표</span>
                        <span className="text-slate-300">가인웅</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-600 w-20 shrink-0">이메일</span>
                        <span className="text-slate-300">sungshincompany@naver.com</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-600 w-20 shrink-0">대표연락처</span>
                        <span className="text-slate-300">010-3213-1319</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-600 w-20 shrink-0">사무실</span>
                        <span className="text-slate-300">032-815-9779</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-600 w-20 shrink-0">주소</span>
                        <span className="text-slate-300">인천광역시 미추홀구 석정로 282번길 34 푸른빌딩 4층</span>
                    </div>
                    
                    <div className="h-px bg-slate-800 my-3" />
                    
                    <div className="grid grid-cols-2 gap-4 text-xs">
                         <div>
                            <span className="text-slate-600 block mb-1">개인정보책임</span>
                            <span className="text-slate-400">가인웅</span>
                         </div>
                         <div>
                            <span className="text-slate-600 block mb-1">사업자번호</span>
                            <span className="text-slate-400">131-32-04882</span>
                         </div>
                         <div className="col-span-2">
                            <span className="text-slate-600 block mb-1">통신판매업</span>
                            <span className="text-slate-400">제2019-인천연수구-0508호</span>
                         </div>
                    </div>
                </div>
            </div>
          </div>

          {/* China Entity Info */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-lg flex items-center gap-3">
                <span className="w-8 h-[2px] bg-green-500 block"></span>
                중국 법인 (CHINA BRANCH)
            </h3>
             <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                <p className="font-bold text-white text-base mb-4">威海诚心代行国际贸易有限公司</p>
                <div className="space-y-3">
                    <div className="flex gap-4">
                        <span className="text-slate-600 w-20 shrink-0">법정대표인</span>
                        <span className="text-slate-300">蔡广学 (Cai Guangxue)</span>
                    </div>
                     <div className="flex gap-4">
                        <span className="text-slate-600 w-20 shrink-0">TEL / FAX</span>
                        <span className="text-slate-300">+86) 0631-599-5540</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-600 w-20 shrink-0">주소 (CN)</span>
                        <span className="text-slate-300">山东省 威海市 环翠区凤林街道海南路9号 诚心国际</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-slate-600 w-20 shrink-0">주소 (EN)</span>
                        <span className="text-slate-300 text-xs leading-relaxed">No. 9, Hainan Road, Fenglin Sub-district, Huancui District, Weihai City, Shandong Province</span>
                    </div>

                    <div className="h-px bg-slate-800 my-3" />

                    <div className="grid grid-cols-2 gap-4 text-xs">
                         <div>
                            <span className="text-slate-600 block mb-1">신용코드</span>
                            <span className="text-slate-400">91371000MA3T67Q306</span>
                         </div>
                         <div>
                            <span className="text-slate-600 block mb-1">수출입코드</span>
                            <span className="text-slate-400">3700MA3T67Q30</span>
                         </div>
                         <div className="col-span-2">
                             <span className="text-slate-600 block mb-1">지사정보</span>
                             <span className="text-slate-400">广州 (Guangzhou), 义乌 (Yiwu) 지사 운영 중</span>
                         </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-900 text-xs text-slate-600">
          <p>© 2025 SUNGSHIN COMPANY. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition-colors">이용약관</a>
             <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
             <a href="#" className="hover:text-white transition-colors">사업자정보확인</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;