import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Save, Radio, ExternalLink, Loader2 } from 'lucide-react';
import { getSupabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

const AdminPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [liveM3u8Url, setLiveM3u8Url] = useState('');
  const [liveFallbackUrl, setLiveFallbackUrl] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<'success' | 'error' | null>(null);

  const supabase = getSupabase();

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!user || !supabase) return;
    supabase
      .from('site_config')
      .select('key, value')
      .in('key', ['live_m3u8_url', 'live_fallback_url'])
      .then(({ data }) => {
        const rowMap: Record<string, string> = {};
        (data || []).forEach((row: { key: string; value: string }) => {
          rowMap[row.key] = row.value ?? '';
        });
        setLiveM3u8Url(rowMap.live_m3u8_url ?? '');
        setLiveFallbackUrl(rowMap.live_fallback_url ?? '');
      });
  }, [user, supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!supabase) {
      setLoginError('Supabase가 설정되지 않았습니다. 환경 변수를 확인하세요.');
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoginError(error.message || '로그인에 실패했습니다.');
      return;
    }
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveMessage(null);
    if (!supabase || !user) return;
    setSaveLoading(true);
    const { error } = await supabase.from('site_config').upsert(
      [
        { key: 'live_m3u8_url', value: liveM3u8Url.trim() },
        { key: 'live_fallback_url', value: liveFallbackUrl.trim() },
      ],
      { onConflict: 'key' }
    );
    setSaveLoading(false);
    if (error) {
      setSaveMessage('error');
      return;
    }
    setSaveMessage('success');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-sungshin-cyan" />
      </div>
    );
  }

  if (!supabase) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <p className="text-gray-700 mb-4">
            Supabase가 설정되지 않았습니다. <code className="text-sm bg-slate-100 px-1 rounded">.env</code>에
            VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY를 설정하세요.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sungshin-cyan font-semibold hover:underline"
          >
            홈으로
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
        >
          <h1 className="text-xl font-bold text-gray-900 mb-2">성신컴퍼니 관리자</h1>
          <p className="text-gray-500 text-sm mb-6">로그인하여 라이브 링크를 관리하세요.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sungshin-cyan focus:border-transparent"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sungshin-cyan focus:border-transparent"
              />
            </div>
            {loginError && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-sungshin-navy text-white font-semibold hover:bg-sungshin-navy/90 transition-colors"
            >
              로그인
            </button>
          </form>
          <p className="mt-6 text-center">
            <Link to="/" className="text-sm text-slate-500 hover:text-sungshin-cyan">
              홈으로 돌아가기
            </Link>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-sungshin-navy text-white py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold">성신컴퍼니 관리자</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300 truncate max-w-[180px]">{user.email}</span>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
            <Link
              to="/"
              className="text-sm text-slate-300 hover:text-white transition-colors"
            >
              홈
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Radio className="w-5 h-5 text-sungshin-cyan" />
            라이브 링크 설정
          </h2>
          <p className="text-slate-600 text-sm mb-6">
            메인 페이지 라이브 섹션에 사용되는 URL입니다. 저장 후 메인 페이지에서 확인하세요.
          </p>

          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label htmlFor="live_m3u8" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                M3U8 스트림 URL (선택)
              </label>
              <input
                id="live_m3u8"
                type="url"
                value={liveM3u8Url}
                onChange={(e) => setLiveM3u8Url(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sungshin-cyan focus:border-transparent text-sm"
              />
              <p className="mt-1 text-xs text-slate-500">
                비우면 폴백 링크(티크톡 라이브 페이지)만 표시됩니다.
              </p>
            </div>
            <div>
              <label htmlFor="live_fallback" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                폴백 URL (라이브 보기 버튼 링크)
              </label>
              <input
                id="live_fallback"
                type="url"
                value={liveFallbackUrl}
                onChange={(e) => setLiveFallbackUrl(e.target.value)}
                placeholder="https://live.douyin.com/..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sungshin-cyan focus:border-transparent text-sm"
              />
            </div>

            {saveMessage === 'success' && (
              <p className="text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg">저장되었습니다.</p>
            )}
            {saveMessage === 'error' && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">저장에 실패했습니다.</p>
            )}

            <button
              type="submit"
              disabled={saveLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-sungshin-cyan text-white font-semibold hover:bg-sungshin-cyan/90 transition-colors disabled:opacity-60"
            >
              {saveLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              저장
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminPage;
