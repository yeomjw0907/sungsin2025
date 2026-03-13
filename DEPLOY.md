# 배포 가이드 (Vercel)

## 환경 변수

Vercel 대시보드 → 프로젝트 → Settings → Environment Variables 에서 설정하세요.

| 변수 | 설명 | 필수 |
|------|------|------|
| `VITE_SUPABASE_URL` | Supabase 프로젝트 URL (Project Settings → API) | 라이브 링크 관리 시 |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon public key | 라이브 링크 관리 시 |
| `VITE_DOUYIN_M3U8_URL` | 틱톡 M3U8 스트림 URL (Supabase 없거나 폴백용) | 선택 |

## Supabase 설정

1. [Supabase](https://supabase.com)에서 프로젝트 생성.
2. SQL Editor에서 [supabase/site_config.sql](supabase/site_config.sql) 내용 실행.
3. Authentication → Users 에서 관리자 계정 1개 생성(이메일/비밀번호).
4. `/admin` 에서 해당 계정으로 로그인 후 라이브 URL 설정.

## SPA 라우팅

`vercel.json` 에서 `/`, `/bank`, `/phone`, `/admin` 등 모든 경로를 `index.html`로 보내도록 설정되어 있습니다. 정적 파일(assets, reviews, js, css 등)은 그대로 제공됩니다.

## 카톡 후기 이미지

`public/reviews/` 에 `review-1.png` ~ `review-7.png` (또는 더 많은 파일)를 넣으면 메인 페이지 후기 섹션에 표시됩니다. [components/KakaoReviews.tsx](components/KakaoReviews.tsx) 의 `REVIEW_IMAGES` 배열에서 경로를 추가·수정할 수 있습니다.
