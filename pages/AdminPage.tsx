import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Save, Radio, ExternalLink, Loader2, MousePointerClick, Activity, Users } from 'lucide-react';
import { getSupabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line, BarChart, Bar } from 'recharts';

const AdminPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [adminCheckLoading, setAdminCheckLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [liveYoutubeUrl, setLiveYoutubeUrl] = useState('');
  const [liveM3u8Url, setLiveM3u8Url] = useState('');
  const [liveFallbackUrl, setLiveFallbackUrl] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState<'success' | 'error' | null>(null);

  const REVIEW_BUCKET = 'kakao-reviews';
  const [reviewFiles, setReviewFiles] = useState<FileList | null>(null);
  const [reviewImages, setReviewImages] = useState<Array<{ name: string; url: string }>>([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewMessage, setReviewMessage] = useState<string>('');
  const [trafficLoading, setTrafficLoading] = useState(false);
  const [trafficError, setTrafficError] = useState('');
  const [trafficRangeDays, setTrafficRangeDays] = useState<7 | 14 | 30>(7);
  const [trafficPageFilter, setTrafficPageFilter] = useState<'all' | '/' | '/bank' | '/phone' | '/extras'>('all');
  const [trafficLabelFilter, setTrafficLabelFilter] = useState<string>('all');
  const [trafficLabelOptions, setTrafficLabelOptions] = useState<string[]>([]);
  const [trafficStats, setTrafficStats] = useState({
    sessions: 0,
    heroViews: 0,
    ctaClicks: 0,
    kakaoClicks: 0,
    callClicks: 0,
    externalClicks: 0,
    ctaClicksToday: 0,
    conversionRate: 0,
  });
  const [trafficTrend, setTrafficTrend] = useState<
    Array<{
      date: string;
      heroViews: number;
      ctaClicks: number;
      kakaoClicks: number;
      callClicks: number;
      externalClicks: number;
      conversionRate: number;
    }>
  >([]);

  const supabase = getSupabase();
  const labelNameMap: Record<string, string> = {
    'Live Hero Kakao': '라이브 첫 화면 - 카카오 상담 버튼',
    'Live Hero Call': '라이브 첫 화면 - 전화 상담 버튼',
    'Main CTA Kakao': '하단 CTA - 카카오 상담 버튼',
    'Main CTA Call': '하단 CTA - 전화 상담 버튼',
    'Page CTA Kakao': '서브페이지 CTA - 카카오 상담 버튼',
    'Page CTA Call': '서브페이지 CTA - 전화 상담 버튼',
    fallback_card: '라이브 영상 카드 클릭',
    secondary_link: '외부 라이브 링크 클릭',
    variant_A: '라이브 카피 A안 노출',
    variant_B: '라이브 카피 B안 노출',
  };
  const toLabelDisplayName = (label: string): string => labelNameMap[label] ?? `기타 (${label})`;

  type EventLogRow = {
    event_name: string;
    event_label: string | null;
    page_path: string | null;
    session_id: string | null;
    created_at: string;
  };

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
      .in('key', ['live_youtube_url', 'live_m3u8_url', 'live_fallback_url'])
      .then(({ data }) => {
        const rowMap: Record<string, string> = {};
        (data || []).forEach((row: { key: string; value: string }) => {
          rowMap[row.key] = row.value ?? '';
        });
        setLiveYoutubeUrl(rowMap.live_youtube_url ?? '');
        setLiveM3u8Url(rowMap.live_m3u8_url ?? '');
        setLiveFallbackUrl(rowMap.live_fallback_url ?? '');
      });
  }, [user, supabase]);

  useEffect(() => {
    if (!supabase) {
      setAdminCheckLoading(false);
      setIsAdmin(false);
      return;
    }
    if (!user) {
      setAdminCheckLoading(false);
      setIsAdmin(false);
      return;
    }

    let cancelled = false;
    setAdminCheckLoading(true);
    supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setIsAdmin(false);
        } else {
          setIsAdmin(!!data);
        }
      })
      .finally(() => {
        if (!cancelled) setAdminCheckLoading(false);
      });

    return () => {
      cancelled = true;
    };
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
        { key: 'live_youtube_url', value: liveYoutubeUrl.trim() },
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

  const refreshTrafficStats = async () => {
    if (!supabase || !user) return;
    setTrafficLoading(true);
    setTrafficError('');

    const rangeStart = new Date(Date.now() - trafficRangeDays * 24 * 60 * 60 * 1000).toISOString();
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();

    const { data, error } = await supabase
      .from('event_logs')
      .select('event_name, event_label, page_path, session_id, created_at')
      .gte('created_at', rangeStart)
      .order('created_at', { ascending: false })
      .limit(5000);

    if (error) {
      setTrafficError('트래픽 데이터를 불러오지 못했습니다.');
      setTrafficLoading(false);
      return;
    }

    const allRows = (data ?? []) as EventLogRow[];
    const pageRows =
      trafficPageFilter === 'all'
        ? allRows
        : allRows.filter((row) => {
            const path = row.page_path || '';
            if (trafficPageFilter === '/extras') return path.startsWith('/extras');
            return path === trafficPageFilter;
          });
    const labelSet = new Set(
      pageRows
        .map((row) => (row.event_label || '').trim())
        .filter((label) => label.length > 0)
    );
    const nextLabelOptions = Array.from(labelSet).sort((a, b) => a.localeCompare(b));
    setTrafficLabelOptions(nextLabelOptions);
    if (trafficLabelFilter !== 'all' && !labelSet.has(trafficLabelFilter)) {
      setTrafficLabelFilter('all');
    }
    const rows =
      trafficLabelFilter === 'all'
        ? pageRows
        : pageRows.filter((row) => (row.event_label || '') === trafficLabelFilter);
    const sessionSet = new Set(
      rows
        .map((row) => row.session_id)
        .filter((value): value is string => typeof value === 'string' && value.length > 0)
    );

    const heroViews = rows.filter((row) => row.event_name === 'live_hero_view').length;
    const ctaClicks = rows.filter((row) => row.event_name === 'cta_click').length;
    const kakaoClicks = rows.filter(
      (row) => row.event_name === 'cta_click' && (row.event_label ?? '').toLowerCase().includes('kakao')
    ).length;
    const callClicks = rows.filter(
      (row) => row.event_name === 'cta_click' && (row.event_label ?? '').toLowerCase().includes('call')
    ).length;
    const externalClicks = rows.filter((row) => row.event_name === 'live_external_click').length;
    const ctaClicksToday = rows.filter(
      (row) => row.event_name === 'cta_click' && row.created_at >= startOfToday
    ).length;
    const conversionRate = heroViews > 0 ? Number(((ctaClicks / heroViews) * 100).toFixed(1)) : 0;

    const buckets = new Map<
      string,
      { heroViews: number; ctaClicks: number; kakaoClicks: number; callClicks: number; externalClicks: number }
    >();
    for (let i = trafficRangeDays - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate()
      ).padStart(2, '0')}`;
      buckets.set(k, { heroViews: 0, ctaClicks: 0, kakaoClicks: 0, callClicks: 0, externalClicks: 0 });
    }

    rows.forEach((row) => {
      const key = row.created_at.slice(0, 10);
      const bucket = buckets.get(key);
      if (!bucket) return;
      if (row.event_name === 'live_hero_view') bucket.heroViews += 1;
      if (row.event_name === 'cta_click') {
        bucket.ctaClicks += 1;
        const label = (row.event_label ?? '').toLowerCase();
        if (label.includes('kakao')) bucket.kakaoClicks += 1;
        if (label.includes('call')) bucket.callClicks += 1;
      }
      if (row.event_name === 'live_external_click') bucket.externalClicks += 1;
    });

    setTrafficTrend(
      Array.from(buckets.entries()).map(([date, values]) => ({
        date: date.slice(5),
        conversionRate: values.heroViews > 0 ? Number(((values.ctaClicks / values.heroViews) * 100).toFixed(1)) : 0,
        ...values,
      }))
    );

    setTrafficStats({
      sessions: sessionSet.size,
      heroViews,
      ctaClicks,
      kakaoClicks,
      callClicks,
      externalClicks,
      ctaClicksToday,
      conversionRate,
    });
    setTrafficLoading(false);
  };

  useEffect(() => {
    if (!user || !supabase) return;
    refreshReviewImages();
    void refreshTrafficStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, supabase, trafficRangeDays, trafficPageFilter, trafficLabelFilter]);

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

  if (authLoading || adminCheckLoading) {
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

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <h1 className="text-xl font-bold text-gray-900 mb-3">접근 권한이 없습니다</h1>
          <p className="text-sm text-slate-600 mb-6">
            현재 계정은 관리자 권한이 없어 관리 페이지에 접근할 수 없습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-sungshin-navy text-white font-semibold hover:bg-sungshin-navy/90"
            >
              로그아웃
            </button>
            <Link
              to="/"
              className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
            >
              홈으로
            </Link>
          </div>
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

      <main className="container mx-auto p-4 md:p-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex items-center justify-between gap-3 mb-5">
            <h2 className="text-xl font-bold text-gray-900">트래픽 요약</h2>
            <div className="flex items-center gap-2 flex-wrap justify-end">
              {[7, 14, 30].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setTrafficRangeDays(days as 7 | 14 | 30)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    trafficRangeDays === days
                      ? 'bg-sungshin-cyan text-white border-sungshin-cyan'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  최근 {days}일
                </button>
              ))}
              <select
                value={trafficPageFilter}
                onChange={(e) =>
                  setTrafficPageFilter(e.target.value as 'all' | '/' | '/bank' | '/phone' | '/extras')
                }
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700"
              >
                <option value="all">전체 페이지</option>
                <option value="/">메인(/)</option>
                <option value="/bank">통장(/bank)</option>
                <option value="/phone">핸드폰(/phone)</option>
                <option value="/extras">부가 기능(/extras)</option>
              </select>
              <select
                value={trafficLabelFilter}
                onChange={(e) => setTrafficLabelFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700"
              >
                <option value="all">전체 이벤트 라벨</option>
                {trafficLabelOptions.map((label) => (
                  <option key={label} value={label}>
                    {toLabelDisplayName(label)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            * 이벤트 라벨 필터를 선택하면 특정 버튼/영역의 성과만 따로 확인할 수 있습니다.
          </p>
          {trafficError && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg mb-4">{trafficError}</p>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
              <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                <Users className="w-4 h-4" />
                방문 세션
              </p>
              <p className="text-2xl font-black text-slate-900">
                {trafficLoading ? '-' : trafficStats.sessions}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
              <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                <Activity className="w-4 h-4" />
                라이브 히어로 노출
              </p>
              <p className="text-2xl font-black text-slate-900">
                {trafficLoading ? '-' : trafficStats.heroViews}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
              <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                <MousePointerClick className="w-4 h-4" />
                상담 클릭
              </p>
              <p className="text-2xl font-black text-slate-900">
                {trafficLoading ? '-' : trafficStats.ctaClicks}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
              <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                <ExternalLink className="w-4 h-4" />
                외부 라이브 클릭
              </p>
              <p className="text-2xl font-black text-slate-900">
                {trafficLoading ? '-' : trafficStats.externalClicks}
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-600">
                오늘 상담 클릭:
                <span className="ml-2 font-bold text-slate-900">
                  {trafficLoading ? '-' : trafficStats.ctaClicksToday}
                </span>
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-600">
                카카오/전화 클릭:
                <span className="ml-2 font-bold text-slate-900">
                  {trafficLoading ? '-' : `${trafficStats.kakaoClicks} / ${trafficStats.callClicks}`}
                </span>
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm text-slate-600">
                상담 전환율:
                <span className="ml-2 font-bold text-slate-900">
                  {trafficLoading ? '-' : `${trafficStats.conversionRate}%`}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-base font-bold text-gray-900 mb-3">이벤트 추이 (최근 {trafficRangeDays}일)</h3>
            <div className="h-72 rounded-xl border border-slate-200 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#fff',
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="heroViews" name="히어로 노출" stroke="#0056b3" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="ctaClicks" name="상담 클릭" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="externalClicks" name="외부 클릭" stroke="#f59e0b" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-base font-bold text-gray-900 mb-3">상담 채널 추이 (카카오/전화)</h3>
            <div className="h-72 rounded-xl border border-slate-200 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#fff',
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="kakaoClicks" name="카카오 클릭" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="callClicks" name="전화 클릭" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-base font-bold text-gray-900 mb-3">일자별 전환율 추이</h3>
            <div className="h-64 rounded-xl border border-slate-200 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: 'none',
                      borderRadius: '10px',
                      color: '#fff',
                    }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="conversionRate" name="전환율(%)" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

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
              <label htmlFor="live_youtube" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                YouTube 라이브 URL (권장)
              </label>
              <input
                id="live_youtube"
                type="url"
                value={liveYoutubeUrl}
                onChange={(e) => setLiveYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-sungshin-cyan focus:border-transparent text-sm"
              />
              <p className="mt-1 text-xs text-slate-500">
                입력하면 유튜브 라이브가 최우선으로 노출됩니다.
              </p>
            </div>
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
                YouTube 라이브 URL이 비어 있을 때만 사용됩니다.
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
