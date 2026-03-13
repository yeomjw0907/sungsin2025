-- Supabase SQL Editor에서 실행하세요.
-- site_config 테이블 생성 및 RLS 설정

-- 테이블 생성
CREATE TABLE IF NOT EXISTS public.site_config (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- 초기 데이터 (라이브 URL)
INSERT INTO public.site_config (key, value) VALUES
  ('live_m3u8_url', ''),
  ('live_fallback_url', 'https://live.douyin.com/598222931159?enter_from_merge=link_share&enter_method=copy_link_share&action_type=click&from=web_code_link')
ON CONFLICT (key) DO NOTHING;

-- RLS 활성화
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- 읽기: 모든 사용자(anon 포함)
CREATE POLICY "site_config_select_all"
  ON public.site_config FOR SELECT
  USING (true);

-- 쓰기: 로그인한 사용자만
CREATE POLICY "site_config_insert_authenticated"
  ON public.site_config FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "site_config_update_authenticated"
  ON public.site_config FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "site_config_delete_authenticated"
  ON public.site_config FOR DELETE
  TO authenticated
  USING (true);
