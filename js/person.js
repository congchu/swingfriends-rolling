/**
 * person.js — 개인 롤링페이퍼 페이지
 *
 * URL: person.html?id=jerry
 */

// 포스트잇 배경색 — 테마별로 theme.js에서 주입, 없으면 기본값
const NOTE_COLORS = (window.SWING_THEME && window.SWING_THEME.notes) || [
  "#fef9e7", // 크림
  "#fde8d8", // 피치
  "#ede8f5", // 라벤더
  "#e3f0e8", // 민트
  "#e3eef8", // 스카이
];

// 결정론적 랜덤 (같은 인덱스 = 항상 같은 값, 새로고침해도 포스트잇 위치 안 바뀜)
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

(async () => {
  const params = new URLSearchParams(location.search);
  const personId = params.get("id");

  if (!personId) {
    location.href = "index.html";
    return;
  }

  try {
    const { allPeople, messages } = await SwingData.loadAll();

    const idx = allPeople.findIndex(p => p.id === personId);
    if (idx === -1) {
      location.href = "index.html";
      return;
    }

    const person = allPeople[idx];
    const personMessages = messages.get(personId) || [];

    // 페이지 제목
    document.title = `${person.name}에게 | 스윙프렌즈 롤링페이퍼`;

    // 헤더 렌더
    renderHeader(person, personMessages.length);

    // 상단 네비 렌더
    renderNavPeople(allPeople, idx);

    // 이전/다음 버튼
    renderArrows(allPeople, idx);

    // 포스트잇 렌더
    renderPostits(personMessages);

    // 최소 3초 로딩 표시 후 오버레이 숨김
    const overlay = document.getElementById("loadingOverlay");
    const elapsed = performance.now();
    const remaining = Math.max(0, 3000 - elapsed);
    setTimeout(() => { if (overlay) overlay.classList.add("hide"); }, remaining);

  } catch (err) {
    console.error("데이터 로드 실패:", err);
    document.getElementById("corkboardInner").innerHTML = `
      <p style="padding:48px;text-align:center;font-family:var(--font-serif);font-style:italic;color:var(--brown)">
        데이터를 불러오지 못했어요 😢<br>
        <small>로컬에서는 <code>npx serve .</code> 로 서버를 실행해주세요.</small>
      </p>`;
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) overlay.classList.add("hide");
  }
})();

// 인물별 baby 사진 번호 매핑
const BABY_MAP = {
  jerry: 1, redshoes: 2, songhi: 3, gray: 4,
  seobuk: 5, hyo: 6, smaller: 7, danny: 8,
  iri: 9, dajeong: 10, choco: 11
};

function renderHeader(person, count) {
  // 이름 & 역할
  document.getElementById("personRoleBadge").textContent =
    '//' + (person.class ? `${person.role} · ${person.class}` : person.role).toUpperCase();
  document.getElementById("personName").textContent = person.name;

  // 메시지 카운트
  const countEl = document.getElementById("personMessageCount");
  countEl.innerHTML = count > 0
    ? `<strong>${count}</strong>개의 감사 메시지`
    : "아직 메시지가 없어요";

  // 메시지 스탯바 (최대 20개 기준 비율)
  const msgBar = document.getElementById("msgStatBar");
  if (msgBar) msgBar.style.width = Math.min(100, (count / 20) * 100) + '%';

  // 랜덤 스탯바
  const fills = document.querySelectorAll('.char-stat-fill:not(#msgStatBar)');
  fills.forEach(f => { f.style.width = (50 + Math.random() * 50) + '%'; });

  // Baby 사진 슬라이더
  const num = BABY_MAP[person.id] || 1;
  const photo1 = document.getElementById("personPhoto");
  const photo2 = document.getElementById("personPhoto2");
  photo1.src = `images/baby/${num}_${person.id}-1.png`;
  photo1.alt = person.name;
  photo2.src = `images/baby/${num}_${person.id}-2.png`;
  photo2.alt = person.name;

  // 슬라이더 로직
  const slider = document.getElementById("charSlider");
  const dots = document.querySelectorAll(".char-dot");
  let current = 0;

  function goTo(idx) {
    current = idx;
    slider.style.transform = `translateX(-${idx * 50}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === idx));
  }

  document.getElementById("charPrev").onclick = () => goTo(current === 0 ? 1 : 0);
  document.getElementById("charNext").onclick = () => goTo(current === 1 ? 0 : 1);
  dots.forEach((d, i) => { d.onclick = () => goTo(i); });
}

function renderNavPeople(allPeople, currentIdx) {
  const container = document.getElementById("navPeopleScroll");
  container.innerHTML = allPeople.map((p, i) => `
    <button
      class="nav-person-btn${i === currentIdx ? " active" : ""}"
      onclick="location.href='person.html?id=${p.id}'"
    >${p.name}</button>
  `).join("");

  // 현재 버튼이 보이도록 스크롤
  setTimeout(() => {
    const activeBtn = container.querySelector(".active");
    if (activeBtn) {
      activeBtn.scrollIntoView({ inline: "center", behavior: "smooth", block: "nearest" });
    }
  }, 100);
}

function renderArrows(allPeople, currentIdx) {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const prevName = document.getElementById("prevName");
  const nextName = document.getElementById("nextName");

  const prev = allPeople[currentIdx - 1];
  const next = allPeople[currentIdx + 1];

  if (prev) {
    prevBtn.disabled = false;
    prevName.textContent = prev.name;
    prevBtn.onclick = () => location.href = `person.html?id=${prev.id}`;
  }

  if (next) {
    nextBtn.disabled = false;
    nextName.textContent = next.name;
    nextBtn.onclick = () => location.href = `person.html?id=${next.id}`;
  }
}

function renderPostits(msgs) {
  const container = document.getElementById("corkboardInner");
  const emptyState = document.getElementById("emptyState");

  if (msgs.length === 0) {
    container.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  const rand = seededRandom(msgs.length * 31 + 7);

  container.innerHTML = msgs.map((msg, i) => {
    const color = NOTE_COLORS[i % NOTE_COLORS.length];
    // -6 ~ +6도 사이 회전
    const rot = (rand() * 12 - 6).toFixed(2);
    // 살짝 다른 압정 색도 랜덤
    const pinColors = ["#e8773a", "#e84a4a", "#4a90d9", "#4ab86a", "#9b59b6"];
    const pinColor = pinColors[Math.floor(rand() * pinColors.length)];

    return `
      <div
        class="postit"
        style="--note-bg:${color};--rot:${rot}deg;--pin:${pinColor}"
      >
        <p class="postit-message">${escapeHtml(msg.message)}</p>
        <p class="postit-from">— ${escapeHtml(msg.from)}</p>
      </div>
    `;
  }).join("");

  // 포스트잇 등장 애니메이션
  const notes = container.querySelectorAll(".postit");
  notes.forEach((note, i) => {
    note.style.opacity = "0";
    note.style.transform = `rotate(${note.style.getPropertyValue("--rot")}) translateY(16px)`;
    setTimeout(() => {
      note.style.transition = `opacity .4s ${i * 0.06}s ease, transform .4s ${i * 0.06}s ease, box-shadow .25s`;
      note.style.opacity = "1";
      note.style.transform = `rotate(var(--rot))`;
    }, 80);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
