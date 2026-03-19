import React, { useEffect, useMemo, useState } from 'react';
import { Calculator, PackageSearch, Lock } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomsTaxCalculator from '../components/CustomsTaxCalculator';

type ToolKey = 'customsTax' | 'coupangEntry';

const toolMenus: Array<{ key: ToolKey; label: string; description: string; enabled: boolean; path: string }> = [
  {
    key: 'customsTax',
    label: '관부가세 계산기',
    description: '수입 상품의 예상 관세/부가세를 계산합니다.',
    enabled: true,
    path: '/extras/customs-tax',
  },
  {
    key: 'coupangEntry',
    label: '쿠팡 수수료 계산기',
    description: '추후 제공 예정',
    enabled: false,
    path: '/extras/coupang-fee',
  },
];

const ExtrasPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<ToolKey>(
    location.pathname.includes('coupang-fee') ? 'coupangEntry' : 'customsTax'
  );

  useEffect(() => {
    setActiveTool(location.pathname.includes('coupang-fee') ? 'coupangEntry' : 'customsTax');
  }, [location.pathname]);

  const selectedTool = useMemo(
    () => toolMenus.find((menu) => menu.key === activeTool) ?? toolMenus[0],
    [activeTool]
  );

  return (
    <div className="bg-slate-50">
      <section className="px-4 py-10 md:py-14">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 md:mb-10">
            <p className="text-sm font-semibold text-sungshin-cyan mb-2">SUNGSHIN SOLUTIONS</p>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">부가 기능</h1>
            <p className="text-base text-gray-600">운영 효율을 높이는 실무형 기능을 순차적으로 제공해 드립니다.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 md:gap-8">
            <aside className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm h-fit">
              <div className="space-y-2">
                {toolMenus.map((menu) => {
                  const isActive = menu.key === selectedTool.key;

                  return (
                    <button
                      key={menu.key}
                      type="button"
                      onClick={() => {
                        setActiveTool(menu.key);
                        navigate(menu.path);
                      }}
                      className={`w-full text-left rounded-xl border px-4 py-3 transition-all ${
                        isActive
                          ? 'border-sungshin-cyan bg-sungshin-cyan/10'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      } ${menu.enabled ? '' : 'cursor-not-allowed opacity-75'}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          {menu.key === 'customsTax' ? (
                            <Calculator className="w-4 h-4 text-sungshin-cyan" />
                          ) : (
                            <PackageSearch className="w-4 h-4 text-gray-500" />
                          )}
                          <span className="font-semibold text-gray-900">{menu.label}</span>
                        </div>
                        {!menu.enabled && <Lock className="w-4 h-4 text-gray-400" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{menu.description}</p>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="min-w-0">
              {selectedTool.key === 'customsTax' ? (
                <CustomsTaxCalculator />
              ) : (
                <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 text-center">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">준비 중입니다</h3>
                  <p className="text-gray-600">쿠팡 수수료 계산기는 다음 업데이트에서 제공될 예정입니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExtrasPage;
