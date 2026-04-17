/**
 * theme.js — URL ?var=N 으로 테마 전환
 * HTML <head> 최상단에서 동기 로드 → FOUC 없음
 */
(function () {
  const THEMES = {
    1: {
      notes: ["#fef9e7", "#fde8d8", "#ede8f5", "#e3f0e8", "#e3eef8"],
    },
    2: {
      // 다크 재즈바
      notes: [
        "rgba(255,107,157,0.18)",
        "rgba(255,215,0,0.14)",
        "rgba(147,112,219,0.18)",
        "rgba(0,220,180,0.13)",
        "rgba(100,180,255,0.16)",
      ],
    },
    3: {
      // 봄날 파스텔
      notes: ["#fff0ea", "#ffeaf5", "#eaf5ff", "#eafff0", "#fffaea"],
    },
    4: {
      // 흑판 & 분필
      notes: [
        "rgba(255,255,240,0.13)",
        "rgba(245,215,110,0.16)",
        "rgba(255,180,100,0.13)",
        "rgba(150,255,180,0.11)",
        "rgba(180,220,255,0.13)",
      ],
    },
    5: {
      // 레트로 팝
      notes: ["#fff176", "#ff8a80", "#80d8ff", "#ccff90", "#ea80fc"],
    },
  };

  const params = new URLSearchParams(location.search);
  const num = parseInt(params.get("var")) || 1;
  const theme = THEMES[num] || THEMES[1];

  // data-theme 즉시 적용 (FOUC 방지)
  document.documentElement.setAttribute("data-theme", num);

  // 전역 노출 — person.js에서 note 색상 읽음
  window.SWING_THEME = { num, ...theme };
})();
