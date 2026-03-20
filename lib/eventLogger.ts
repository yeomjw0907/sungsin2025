import { getSupabase } from './supabase';

type SiteEventName =
  | 'live_hero_view'
  | 'cta_click'
  | 'live_external_click'
  | 'calculator_completed';

type SiteEventPayload = {
  event_name: SiteEventName;
  event_label?: string;
  page_path?: string;
  metadata?: Record<string, unknown>;
};

const SESSION_KEY = 'sungsin_session_id';
const DEDUPE_MS = 2000;
const recentEvents = new Map<string, number>();

const makeId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export const getOrCreateSessionId = (): string => {
  if (typeof window === 'undefined') return 'server';
  const existing = window.sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const next = makeId();
  window.sessionStorage.setItem(SESSION_KEY, next);
  return next;
};

export const logSiteEvent = async (payload: SiteEventPayload): Promise<void> => {
  const supabase = getSupabase();
  if (!supabase) return;

  const pagePath = payload.page_path || (typeof window !== 'undefined' ? window.location.pathname : '');
  const dedupeKey = `${payload.event_name}:${payload.event_label ?? ''}:${pagePath}`;
  const now = Date.now();
  const last = recentEvents.get(dedupeKey) ?? 0;
  if (now - last < DEDUPE_MS) return;
  recentEvents.set(dedupeKey, now);

  try {
    await supabase.from('event_logs').insert({
      event_name: payload.event_name,
      event_label: payload.event_label ?? null,
      page_path: pagePath,
      session_id: getOrCreateSessionId(),
      metadata: payload.metadata ?? {},
    });
  } catch {
    // 사용자 경험에 영향이 없도록 이벤트 실패는 무시합니다.
  }
};

