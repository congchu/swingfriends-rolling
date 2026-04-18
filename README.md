# 스윙프렌즈 롤링페이퍼

스윙프렌즈 2025 봄학기 선생님 & 도우미에게 감사 메시지를 전하는 롤링페이퍼 사이트.

## 구성

- 선생님 4명: 제리, 빨강구두, 송히, 그레이
- 도우미 7명: 서벅돔, 효돔, 스말러돔, 대니돔, 이리돔, 다정돔, 초코돔
- 홈페이지 → 개인 롤링페이퍼 페이지 (포스트잇) / 메시지 작성 페이지

## 빠른 시작

```bash
cd swingfriends-rolling
npx serve .
# http://localhost:3000
```

> `fetch()`가 로컬 파일 CORS를 타므로 로컬 서버 필수.

## 데이터

- 메시지: Google Apps Script(`env.js`)를 통해 구글 시트에서 실시간 fetch, 실패 시 `data/messages.csv` fallback
- 사람 정보: `data/people.json`에서 이름, 역할 등 수정
- 이미지: `images/baby/` (캐릭터 셀렉트용), `images/material/` (소재)

## 테마

URL 파라미터 `?var=N`으로 전환:

| URL | 테마 |
|-----|------|
| `?var=1` (기본) | 빈티지 재즈 |
| `?var=2` | 다크 재즈바 |
| `?var=3` | 봄날 파스텔 |
| `?var=4` | 흑판 & 분필 |
| `?var=5` | 레트로 팝 |

개인 페이지에도 동일 적용: `person.html?id=jerry&var=2`

## 배포

Netlify drag & drop 또는 CLI:

```bash
npm i -g netlify-cli
netlify deploy --dir=. --prod
```

## 파일 구조

```
swingfriends-rolling/
├── index.html            # 홈
├── person.html           # 개인 롤링페이퍼 (?id=jerry)
├── write.html            # 메시지 작성
├── css/
│   ├── style.css         # 메인 스타일
│   ├── themes.css        # 테마별 스타일
│   └── hero.css          # 히어로 섹션
├── js/
│   ├── env.js            # Google Apps Script URL 설정
│   ├── theme.js          # ?var=N 테마 전환
│   ├── data.js           # 데이터 로더 (GAS → CSV fallback)
│   ├── home.js           # 홈 렌더링
│   ├── hero.js           # 히어로 키링 렌더링
│   ├── intro.js          # 인트로 애니메이션
│   ├── person.js         # 포스트잇 렌더링
│   └── write.js          # 메시지 작성/제출
├── data/
│   ├── people.json       # 선생님/도우미 정보
│   └── messages.csv      # CSV fallback 데이터
├── images/
│   ├── baby/             # 캐릭터 셀렉트 이미지
│   └── material/         # 소재 이미지
├── google-apps-script.js # GAS 서버 스크립트
├── netlify.toml
└── serve.json
```

## 디자인 참고

- 캐릭터 셀렉트 히어로 섹션: https://loox.app/lost-in-space

## 폰트

- 둥근모 (RoundedFixedsys) — 메인 UI 폰트, CDN 자동 로드
- 오목예쁜체 (OmuDaye) — 캐릭터 이름 등, CDN 자동 로드
