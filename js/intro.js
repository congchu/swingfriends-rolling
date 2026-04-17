/**
 * intro.js — 재즈 클럽 커튼 인트로 애니메이션
 */
(function () {
  const intro = document.getElementById("intro");
  if (!intro) return;

  // 인트로가 끝나면 커튼을 열고 제거
  const TOTAL_DURATION = 3400; // ms

  setTimeout(() => {
    intro.classList.add("intro--open");
  }, TOTAL_DURATION);

  // 커튼 애니메이션 끝나면 DOM에서 제거
  setTimeout(() => {
    intro.remove();
  }, TOTAL_DURATION + 1200);
})();
