import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import { motion, useReducedMotion } from 'framer-motion';
import { Radio, ExternalLink, AlertCircle, MessageCircle, Phone, RefreshCw } from 'lucide-react';
import { getSiteConfig } from '../lib/supabase';
import { logSiteEvent } from '../lib/eventLogger';
import { KAKAO_OPEN_CHAT_PURCHASE } from '../lib/kakaoLinks';

const FALLBACK_URL_DEFAULT =
  'https://live.douyin.com/598222931159?enter_from_merge=link_share&enter_method=copy_link_share&action_type=click&from=web_code_link';
const TEL_URL = 'tel:010-3213-1319';
const KAKAO_URL = KAKAO_OPEN_CHAT_PURCHASE;
const LIVE_HERO_VARIANT = (import.meta.env.VITE_LIVE_HERO_VARIANT as string | undefined) === 'B' ? 'B' : 'A';

const M3U8_VARIANTS = ['', '_hd5', '_zsd5', '_ld5'];

function parseYouTubeLiveEmbedUrl(rawValue: string): string | null {
  const source = (rawValue || '').trim();
  if (!source) return null;
  try {
    const url = new URL(source);
    let videoId = '';
    if (url.hostname.includes('youtu.be')) {
      videoId = url.pathname.replace('/', '').trim();
    } else if (url.hostname.includes('youtube.com')) {
      if (url.pathname.startsWith('/watch')) {
        videoId = url.searchParams.get('v')?.trim() || '';
      } else if (url.pathname.startsWith('/live/')) {
        videoId = url.pathname.split('/').filter(Boolean)[1] || '';
      } else if (url.pathname.startsWith('/embed/')) {
        videoId = url.pathname.split('/').filter(Boolean)[1] || '';
      }
    }
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
  } catch {
    return null;
  }
}

function buildM3u8Candidates(rawValue: string): string[] {
  const source = (rawValue || '').trim();
  if (!source) return [];

  const candidates: string[] = [];
  const pushUnique = (value: string) => {
    const normalized = value.replace(/\\\//g, '/').trim();
    if (!normalized || candidates.includes(normalized)) return;
    candidates.push(normalized);
  };

  // 1) URL 하나만 넣은 일반 케이스
  if (source.startsWith('http')) {
    pushUnique(source);
  }

  // 2) stream_data 텍스트 전체를 붙여 넣은 케이스도 자동 파싱
  const matchedUrls = source.match(/https:\/\/pull-hls-[^"\\\s]+\.m3u8\?[^"\\\s]+/g) || [];
  matchedUrls.forEach(pushUnique);

  // 3) stream-<id> 기반 변형 URL 후보 자동 생성
  const expanded: string[] = [];
  for (const url of candidates) {
    expanded.push(url);
    const baseMatch = url.match(/^(https:\/\/pull-hls-[^/]+\/stage\/stream-\d+)(?:_(?:hd5|zsd5|ld5))?\/index\.m3u8(\?.*)$/);
    if (!baseMatch) continue;
    const [, base, query] = baseMatch;
    for (const variant of M3U8_VARIANTS) {
      expanded.push(`${base}${variant}/index.m3u8${query}`);
    }
  }

  return Array.from(new Set(expanded));
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const LiveStream: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const hlsNetworkRetryRef = useRef(0);
  const hlsMediaRecoverRef = useRef(0);
  const hasTrackedHeroView = useRef(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [fallbackReason, setFallbackReason] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(true);
  const [activeCandidateIndex, setActiveCandidateIndex] = useState(0);
  const [activeCandidateTotal, setActiveCandidateTotal] = useState(0);
  const [configLoading, setConfigLoading] = useState(true);
  const [liveYoutubeUrl, setLiveYoutubeUrl] = useState<string | null>(null);
  const [liveM3u8Url, setLiveM3u8Url] = useState<string | null>(null);
  const [liveFallbackUrl, setLiveFallbackUrl] = useState<string | null>(null);

  // Supabase 또는 env에서 라이브 URL 결정
  const m3u8Url =
    liveM3u8Url !== null && liveM3u8Url !== undefined && liveM3u8Url !== ''
      ? liveM3u8Url
      : (import.meta.env.VITE_DOUYIN_M3U8_URL as string | undefined) || '';
  const fallbackUrl =
    liveFallbackUrl !== null && liveFallbackUrl !== undefined && liveFallbackUrl !== ''
      ? liveFallbackUrl
      : FALLBACK_URL_DEFAULT;
  const youtubeEmbedUrl = parseYouTubeLiveEmbedUrl(liveYoutubeUrl ?? '');

  useEffect(() => {
    let cancelled = false;
    setConfigLoading(true);
    getSiteConfig(['live_youtube_url', 'live_m3u8_url', 'live_fallback_url'])
      .then((config) => {
        if (cancelled) return;
        setLiveYoutubeUrl(config.live_youtube_url ?? null);
        setLiveM3u8Url(config.live_m3u8_url ?? null);
        setLiveFallbackUrl(config.live_fallback_url ?? null);
      })
      .catch(() => {
        if (!cancelled) {
          setLiveYoutubeUrl(null);
          setLiveM3u8Url(null);
          setLiveFallbackUrl(null);
        }
      })
      .finally(() => {
        if (!cancelled) setConfigLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (youtubeEmbedUrl) {
      setStreamError(null);
      setFallbackReason(null);
      setUseFallback(true);
      setActiveCandidateIndex(0);
      setActiveCandidateTotal(0);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      return;
    }

    const candidates = buildM3u8Candidates(m3u8Url || '');
    if (!candidates.length) {
      setFallbackReason('M3U8 값이 비어있거나 불러오지 못해 외부 라이브로 전환되었습니다.');
      setUseFallback(true);
      setActiveCandidateIndex(0);
      setActiveCandidateTotal(0);
      return;
    }

    // 1차 렌더에서 video가 없을 수 있으므로 먼저 폴백을 해제해 video를 렌더링
    if (useFallback) {
      setUseFallback(false);
      return;
    }
    if (!videoRef.current) return;

    setStreamError(null);
    setFallbackReason(null);
    setUseFallback(false);
    setActiveCandidateTotal(candidates.length);
    setActiveCandidateIndex(1);

    const video = videoRef.current;
    let cancelled = false;
    const destroyHls = () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
    const tryNextCandidate = (currentIndex: number, reason: string) => {
      const nextIndex = currentIndex + 1;
      if (nextIndex >= candidates.length) {
        setStreamError(reason);
        setFallbackReason(reason);
        setUseFallback(true);
        destroyHls();
        return;
      }
      setActiveCandidateIndex(nextIndex + 1);
      setStreamError(`스트림 ${nextIndex + 1}/${candidates.length} 자동 시도 중...`);
      attachCandidate(nextIndex);
    };
    const attachCandidate = (candidateIndex: number) => {
      if (cancelled) return;
      const effectiveM3u8 = candidates[candidateIndex];
      hlsNetworkRetryRef.current = 0;
      hlsMediaRecoverRef.current = 0;

      if (Hls.isSupported()) {
        destroyHls();
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hlsRef.current = hls;
        hls.loadSource(effectiveM3u8);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setStreamError(null);
          setUseFallback(false);
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (!data.fatal) return;
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            if (hlsNetworkRetryRef.current < 2) {
              hlsNetworkRetryRef.current += 1;
              setStreamError(`연결 재시도 중 (${hlsNetworkRetryRef.current}/2)`);
              hls.startLoad();
              return;
            }
            tryNextCandidate(candidateIndex, '스트림 연결 실패 (URL 만료 또는 차단)');
            return;
          }
          if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            if (hlsMediaRecoverRef.current < 1) {
              hlsMediaRecoverRef.current += 1;
              setStreamError('재생 복구 시도 중...');
              hls.recoverMediaError();
              return;
            }
            tryNextCandidate(candidateIndex, '재생 실패 (코덱 미지원 가능)');
            return;
          }
          tryNextCandidate(candidateIndex, '재생 실패 (브라우저 환경 제한)');
        });
        return;
      }

      // Safari 등 네이티브 HLS 지원 브라우저
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = effectiveM3u8;
        const onError = () => {
          video.removeEventListener('error', onError);
          tryNextCandidate(candidateIndex, '스트림 연결 실패 (URL 만료 또는 차단)');
        };
        video.addEventListener('error', onError);
        setUseFallback(false);
        return;
      }

      tryNextCandidate(candidateIndex, '현재 브라우저는 HLS 재생을 지원하지 않습니다');
    };

    attachCandidate(0);
    return () => {
      cancelled = true;
      destroyHls();
      video.src = '';
    };
  }, [m3u8Url, useFallback, youtubeEmbedUrl]);

  const showFallbackCard = !youtubeEmbedUrl && (useFallback || streamError);
  const heroCopy =
    LIVE_HERO_VARIANT === 'B'
      ? {
          badge: '실시간 운영 공개',
          titleTop: '보여주기식 소개 대신',
          titleBottom: '실제 운영 현장을 공개합니다',
          body: '24시간 운영 화면으로 검수, 포장, 출고 흐름을 투명하게 보여드립니다. 광고 문구보다 실행력을 먼저 확인하세요.',
        }
      : {
          badge: 'LIVE 운영중',
          titleTop: '중국 무역 현장을',
          titleBottom: '실시간으로 공개합니다',
          body: '실시간 성신 작업 현황을 확인해 보세요.',
        };
  const trackCtaClick = (label: string) => {
    void logSiteEvent({ event_name: 'cta_click', event_label: label });
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        event_category: 'Consult',
        event_label: label,
      });
    }
  };
  const trackExternalClick = (position: string) => {
    void logSiteEvent({ event_name: 'live_external_click', event_label: position });
    if (window.gtag) {
      window.gtag('event', 'live_external_click', {
        position,
      });
    }
  };

  useEffect(() => {
    if (hasTrackedHeroView.current) return;
    hasTrackedHeroView.current = true;
    void logSiteEvent({ event_name: 'live_hero_view', event_label: `variant_${LIVE_HERO_VARIANT}` });
    if (window.gtag) {
      window.gtag('event', 'live_hero_view', {
        hero_variant: LIVE_HERO_VARIANT,
        page_path: window.location.pathname,
      });
    }
  }, []);

  if (configLoading) {
    return (
      <section className="relative w-full bg-gradient-to-b from-slate-50 to-white py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <p className="text-sm font-semibold text-sungshin-cyan mb-2">실시간 운영 현황</p>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-3 break-keep">
              {heroCopy.titleTop}
              <span className="md:hidden"> </span>
              <br className="hidden md:block" />
              {heroCopy.titleBottom}
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-3xl break-keep">
              {heroCopy.body}
            </p>
          </div>
          <div
            className="w-full rounded-2xl bg-slate-200 animate-pulse"
            style={{ paddingBottom: '56.25%' }}
          />
          <p className="text-center text-slate-500 text-sm mt-4">로딩 중...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-50 to-white py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-sungshin-cyan/30 bg-sungshin-cyan/10 px-4 py-2 text-sungshin-cyan text-xs md:text-sm font-semibold mb-4">
            <Radio className="w-4 h-4" />
            {heroCopy.badge}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-3 break-keep">
            {heroCopy.titleTop}
            <span className="md:hidden"> </span>
            <br className="hidden md:block" />
            {heroCopy.titleBottom}
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl break-keep mb-4">
            {heroCopy.body}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">검수/포장 실시간 진행</span>
            <span className="inline-flex items-center rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">전담팀 상시 운영</span>
            <span className="inline-flex items-center rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">상담 즉시 연결</span>
          </div>
        </div>

        {youtubeEmbedUrl && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 bg-black"
            style={{ paddingBottom: '56.25%' }}
          >
            <iframe
              src={youtubeEmbedUrl}
              title="YouTube Live"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </motion.div>
        )}

        {!youtubeEmbedUrl && m3u8Url && !showFallbackCard && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 bg-black"
            style={{ paddingBottom: '56.25%' }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-contain"
              controls
              playsInline
              muted={false}
              autoPlay
            />
            <p className="absolute bottom-2 left-2 right-2 text-center text-xs text-white/70 bg-black/40 py-1 rounded">
              M3U8 스트림 · URL 만료 시 재생이 끊길 수 있습니다
            </p>
            {activeCandidateTotal > 1 && (
              <p className="absolute top-2 left-2 text-xs text-white/90 bg-black/50 px-2 py-1 rounded inline-flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                자동 시도 {activeCandidateIndex}/{activeCandidateTotal}
              </p>
            )}
          </motion.div>
        )}

        {(streamError || (showFallbackCard && fallbackReason)) && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-amber-800">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">
              {streamError || fallbackReason}. 아래 버튼으로 틱톡에서 시청하세요.
            </span>
          </div>
        )}

        {showFallbackCard && (
          <motion.a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 bg-gradient-to-br from-sungshin-navy to-slate-800 focus:outline-none focus:ring-4 focus:ring-sungshin-cyan/40"
            style={{ paddingBottom: '56.25%' }}
            whileHover={reduceMotion ? undefined : { scale: 1.01 }}
            whileTap={reduceMotion ? undefined : { scale: 0.99 }}
            onClick={() => trackExternalClick('fallback_card')}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white p-6">
              <div className="p-5 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30">
                <ExternalLink className="w-12 h-12 md:w-16 md:h-16" />
              </div>
              <span className="text-lg md:text-xl font-bold">라이브를 외부 페이지에서 여세요</span>
              <span className="text-sm text-white/80 text-center">
                틱톡/도우인 정책상 사이트 내부 재생이 차단될 수 있습니다.
              </span>
            </div>
          </motion.a>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          <motion.a
            href={KAKAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#FEE500] text-gray-900 px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            onClick={() => trackCtaClick('Live Hero Kakao')}
          >
            <MessageCircle className="w-5 h-5" />
            전담 매니저 상담 요청
          </motion.a>
          <motion.a
            href={TEL_URL}
            className="inline-flex items-center justify-center gap-2 bg-sungshin-cyan hover:bg-sungshin-cyan/90 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            whileHover={reduceMotion ? undefined : { scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            onClick={() => trackCtaClick('Live Hero Call')}
          >
            <Phone className="w-5 h-5" />
            전화 상담 연결
          </motion.a>
        </div>

        <div className="mt-4 text-center">
          <motion.a
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
            whileHover={reduceMotion ? undefined : { scale: 1.01 }}
            whileTap={reduceMotion ? undefined : { scale: 0.99 }}
            onClick={() => trackExternalClick('secondary_link')}
          >
            <ExternalLink className="w-4 h-4" />
            외부 라이브 페이지에서 보기
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default LiveStream;
