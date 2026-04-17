/**
 * home.js — 홈 페이지 렌더링
 */

(async () => {
  try {
    const { people, messages } = await SwingData.loadAll();
    renderGrid("teachers-grid", people.teachers, messages);
    renderGrid("helpers-grid", people.helpers, messages);
  } catch (err) {
    console.error("데이터 로드 실패:", err);
    showError();
  }
})();

/**
 * 폴라로이드 카드 그리드 렌더링
 */
function renderGrid(containerId, peopleList, messages) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = peopleList.map(person => {
    const count = (messages.get(person.id) || []).length;
    const hasPhoto = person.photo && person.photo !== "";

    return `
      <a class="person-card" href="person.html?id=${person.id}" aria-label="${person.name}의 롤링페이퍼 보기">
        <div class="card-photo-wrap">
          ${hasPhoto
            ? `<img
                class="card-photo"
                src="${person.photo}"
                alt="${person.name}"
                onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
              >
              <div class="card-photo-placeholder" style="display:none">${person.emoji || "🎵"}</div>`
            : `<div class="card-photo-placeholder">${person.emoji || "🎵"}</div>`
          }
        </div>
        <div class="card-name">${person.name}</div>
        <div class="card-role-badge">${person.role}</div>
        <div class="card-count">
          메시지 <span>${count}</span>개
        </div>
      </a>
    `;
  }).join("");

  // 카드 등장 애니메이션
  const cards = container.querySelectorAll(".person-card");
  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = `opacity .45s ${i * 0.07}s ease, transform .45s ${i * 0.07}s ease, box-shadow .25s, filter .3s`;

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100 + i * 70);
  });
}

function showError() {
  ["teachers-grid", "helpers-grid"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = `
      <p style="grid-column:1/-1;padding:24px;text-align:center;color:var(--sepia-mid);font-family:var(--font-serif);font-style:italic;">
        데이터를 불러오지 못했어요.<br>
        <small>로컬에서는 <code>npx serve .</code> 로 서버를 실행해주세요.</small>
      </p>`;
  });
}
