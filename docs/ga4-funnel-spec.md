# GA4 퍼널 이벤트 명세서

## 목표
- 광고 유입 사용자의 관심 유도와 상담 전환 퍼널을 수치로 추적한다.
- 퍼널 기준: `광고유입 -> 히어로 상호작용 -> CTA 클릭 -> 상담 연결`.

## 권장 이벤트 구조

| 이벤트명 | 트리거 | 주요 파라미터 | 설명 |
|---|---|---|---|
| `page_view` | 페이지 진입 | `page_location`, `page_title` | 기본 진입 추적 |
| `live_hero_view` | 라이브 히어로 노출(최초 1회) | `hero_variant`, `page_path` | 히어로 노출 기준 분모 |
| `cta_click` | 상담 CTA 클릭 | `event_category`, `event_label`, `page_path` | 전환 핵심 이벤트 |
| `live_external_click` | 외부 라이브 이동 클릭 | `position`, `page_path` | 외부 이탈 추적 |
| `calculator_completed` | 관부가세 계산 완료 | `tool_name`, `main_category`, `total_tax` | 도구 사용 품질 추적 |
| `consult_intent` | 상담 채널 선택(카톡/전화) | `channel`, `source_section` | CTA 이후 의도 추적 |

## 이벤트 라벨 표준(권장)

- `event_category`
  - `Consult`
  - `Engagement`
  - `Tool`
- `event_label`
  - `Live Hero Kakao`
  - `Live Hero Call`
  - `Main CTA Kakao`
  - `Main CTA Call`
  - `Page CTA Kakao`
  - `Page CTA Call`
  - `Live Secondary External`

## 퍼널 리포트 정의

1. `page_view` (광고 랜딩 유입)
2. `live_hero_view`
3. `cta_click` with label contains `Kakao` or `Call`
4. 상담 채널 도착(콜 트래킹/카톡 채널 지표 연동 가능 시)

## 대시보드 핵심 KPI

- 히어로 노출 대비 CTA 클릭률
- CTA 클릭 대비 상담 연결률(가능 시)
- 외부 라이브 클릭률(이탈률 보정 지표)
- A/B 카피별 클릭률(`hero_variant` 기준)

## 운영 메모

- 이벤트명은 고정하고 파라미터로 확장해야 리포트가 안정적이다.
- `hero_variant`는 `A`/`B` 두 값만 허용한다.
- 외부 링크 클릭은 반드시 별도 이벤트로 분리한다.
