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

  const REVIEW_BUCKET = 'kakao-reviews';
  const [reviewFiles, setReviewFiles] = useState<FileList | null>(null);
  const [reviewImages, setReviewImages] = useState<Array<{ name: string; url: string }>>([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewMessage, setReviewMessage] = useState<string>('');

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

  const refreshReviewImages = async () => {
    if (!supabase || !user) return;

    setReviewLoading(true);
    setReviewMessage('');
    const { data, error } = await supabase.storage.from(REVIEW_BUCKET).list('');
    if (error) {
      setReviewImages([]);
      setReviewMessage('후기 이미지 목록을 불러오지 못했습니다. Storage 버킷/정책을 확인하세요.');
      setReviewLoading(false);
      return;
    }

    const objects = (data ?? []) as Array<any>;
    const items = objects
      .map((obj) => {
        const name = String(obj?.name ?? '');
        if (!name) return null;
        const { data: publicUrlData } = supabase.storage.from(REVIEW_BUCKET).getPublicUrl(name);
        return { name, url: publicUrlData.publicUrl };
      })
      .filter(Boolean) as Array<{ name: string; url: string }>;

    // 업로드 파일명 기준 최신 우선 정렬
    items.sort((a, b) => b.name.localeCompare(a.name));
    setReviewImages(items);
    setReviewLoading(false);
  };

  useEffect(() => {
    if (!user || !supabase) return;
    refreshReviewImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, supabase]);

  const sanitizeBaseName = (name: string) => {
    // Windows/URL 안전 문자만 남기고 길이는 적당히 제한합니다.
    return name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9-_가-힣]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 50);
  };

  const handleUploadReviews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !user) return;
    if (!reviewFiles || reviewFiles.length === 0) {
      setReviewMessage('업로드할 이미지를 선택하세요.');
      return;
    }

    setReviewLoading(true);
    setReviewMessage('');

    try {
      const files = Array.from(reviewFiles);
      const now = Date.now();

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const extMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
        const ext = extMatch?.[1] ? extMatch[1].toLowerCase() : 'png';
        const base = sanitizeBaseName(file.name);
        const objectName = `${now}_${i}_${base}.${ext}`;

        const { error } = await supabase.storage.from(REVIEW_BUCKET).upload(objectName, file, {
          upsert: false,
          contentType: file.type || undefined,
        });
        if (error) throw error;
      }

      setReviewFiles(null);
      setReviewMessage('업로드 완료!');
      await refreshReviewImages();
    } catch (err: any) {
      setReviewMessage(err?.message || '업로드에 실패했습니다.');
      setReviewLoading(false);
    }
  };

  const handleDeleteReview = async (name: string) => {
    if (!supabase || !user) return;
    setReviewLoading(true);
    setReviewMessage('');

    const { error } = await supabase.storage.from(REVIEW_BUCKET).remove([name]);
    if (error) {
      setReviewMessage('삭제에 실패했습니다.');
      setReviewLoading(false);
      return;
    }

    setReviewMessage('삭제 완료!');
    await refreshReviewImages();
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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">카카오 후기 이미지 관리</h2>
          <p className="text-slate-600 text-sm mb-6">
            아래에서 이미지를 업로드/삭제하면 홈 화면의 카카오 후기 섹션이 자동으로 업데이트됩니다.
          </p>

          <form onSubmit={handleUploadReviews} className="space-y-4">
            <div>
              <label htmlFor="review-images" className="block text-sm font-medium text-gray-700 mb-2">
                후기 이미지 업로드
              </label>
              <input
                id="review-images"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setReviewFiles(e.target.files)}
                className="w-full"
              />
              <p className="mt-1 text-xs text-slate-500">
                권장: JPG/PNG. 업로드 순서는 파일명이 최신 우선으로 정렬됩니다.
              </p>
            </div>

            {reviewMessage && (
              <p className={`text-sm px-4 py-2 rounded-lg ${reviewMessage.includes('실패') ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'}`}>
                {reviewMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={reviewLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-sungshin-cyan text-white font-semibold hover:bg-sungshin-cyan/90 transition-colors disabled:opacity-60"
            >
              {reviewLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : '업로드'}
            </button>
          </form>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">현재 이미지</h3>
              <span className="text-sm text-slate-500">{reviewImages.length}개</span>
            </div>

            {reviewLoading && reviewImages.length === 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-32 rounded-xl bg-slate-100 animate-pulse" />
                ))}
              </div>
            ) : reviewImages.length === 0 ? (
              <div className="text-slate-500 text-sm py-4">아직 업로드된 후기가 없습니다.</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {reviewImages.map((img) => (
                  <div key={img.name} className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img src={img.url} alt="후기 이미지" className="w-full h-32 object-cover bg-white" />
                    <button
                      type="button"
                      disabled={reviewLoading}
                      onClick={() => handleDeleteReview(img.name)}
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white text-xs px-2 py-1 rounded-lg border border-slate-200 text-slate-700 disabled:opacity-60"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminPage;
