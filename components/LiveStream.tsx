import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import { motion } from 'framer-motion';
import { Radio, Play, ExternalLink, AlertCircle } from 'lucide-react';

const DOUYIN_LIVE_URL =
  'https://live.douyin.com/598222931159?enter_from_merge=link_share&enter_method=copy_link_share&action_type=click&from=web_code_link';

// 환경 변수: M3U8 주소가 있으면 스트리밍 재생 시도 (토큰 만료 시 .env에 새 주소 갱신)
const M3U8_URL = import.meta.env.VITE_DOUYIN_M3U8_URL as string | undefined;

const LiveStream: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(!M3U8_URL);

  useEffect(() => {
    if (!M3U8_URL || !videoRef.current) return;

    setStreamError(null);
    setUseFallback(false);

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });
      hlsRef.current = hls;

      hls.loadSource(M3U8_URL);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setStreamError(null);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setStreamError(data.type === Hls.ErrorTypes.NETWORK_ERROR ? '스트림 연결 실패 (URL 만료 또는 차단)' : '재생 오류');
          setUseFallback(true);
          hls.destroy();
          hlsRef.current = null;
        }
      });
      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    }

    // Safari 등 네이티브 HLS 지원 브라우저
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = M3U8_URL;
      const onError = () => {
        setStreamError('스트림 연결 실패 (URL 만료 또는 차단)');
        setUseFallback(true);
      };
      video.addEventListener('error', onError);
      return () => {
        video.removeEventListener('error', onError);
        video.src = '';
      };
    }

    setUseFallback(true);
  }, [M3U8_URL]);

  const showFallbackCard = useFallback || streamError;

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-50 to-white py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-sungshin-cyan/10">
            <Radio className="w-6 h-6 md:w-7 md:h-7 text-sungshin-cyan" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              성신컴퍼니 실시간 라이브
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-0.5">
              틱톡에서 진행 중인 라이브 방송을 만나보세요
            </p>
          </div>
        </div>

        {/* M3U8 스트리밍 플레이어 (URL 있을 때만, 오류 시 폴백) */}
        {M3U8_URL && !showFallbackCard && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
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
          </motion.div>
        )}

        {/* 스트림 오류 시 안내 */}
        {streamError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-amber-800">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{streamError}. 아래 버튼으로 틱톡에서 시청하세요.</span>
          </div>
        )}

        {/* 폴백: M3U8 없거나 재생 실패 시 틱톡 이동 카드 */}
        {showFallbackCard && (
          <motion.a
            href={DOUYIN_LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 bg-gradient-to-br from-sungshin-navy to-slate-800 focus:outline-none focus:ring-4 focus:ring-sungshin-cyan/40"
            style={{ paddingBottom: '56.25%' }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white p-6">
              <div className="p-5 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30">
                <Play className="w-12 h-12 md:w-16 md:h-16 fill-white" />
              </div>
              <span className="text-lg md:text-xl font-bold">지금 라이브 보기</span>
              <span className="text-sm text-white/80 flex items-center gap-1">
                <ExternalLink className="w-4 h-4" />
                클릭하면 틱톡 라이브 페이지로 이동합니다
              </span>
            </div>
          </motion.a>
        )}

        {/* 라이브영상 보러가기 버튼 */}
        <div className="mt-6 text-center">
          <motion.a
            href={DOUYIN_LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-sungshin-cyan hover:bg-sungshin-cyan/90 text-white px-6 py-4 rounded-xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="w-5 h-5" />
            라이브영상 보러가기
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default LiveStream;
