/**
 * write.js — 메시지 입력폼 로직
 *
 * Google Apps Script 웹앱 URL을 SCRIPT_URL에 넣으면
 * 폼 제출 시 구글 시트에 자동 저장됩니다.
 */

// ★ 여기에 Google Apps Script 배포 URL을 넣으세요
const SCRIPT_URL = "";

const PEOPLE = [
  { id: "jerry",    name: "제리",    role: "리더 선생님",   emoji: "🕺", group: "teacher" },
  { id: "redshoes", name: "빨간구두", role: "팔로워 선생님", emoji: "👠", group: "teacher" },
  { id: "songhi",   name: "송히",    role: "팔로워 선생님", emoji: "💃", group: "teacher" },
  { id: "gray",     name: "그레이",  role: "리더 선생님",   emoji: "🎶", group: "teacher" },
  { id: "seobuk",   name: "서벅돔",  emoji: "⭐", role: "도우미", group: "helper" },
  { id: "hyo",      name: "효돔",    emoji: "✨", role: "도우미", group: "helper" },
  { id: "smaller",  name: "스말러돔", emoji: "🌟", role: "도우미", group: "helper" },
  { id: "danny",    name: "대니돔",  emoji: "💫", role: "도우미", group: "helper" },
  { id: "iri",      name: "이리돔",  emoji: "🎵", role: "도우미", group: "helper" },
  { id: "dajeong",  name: "다정돔",  emoji: "🌸", role: "도우미", group: "helper" },
  { id: "choco",    name: "초코돔",  emoji: "🍫", role: "도우미", group: "helper" },
];

function renderPeopleList() {
  const container = document.getElementById("peopleList");

  const teachers = PEOPLE.filter(p => p.group === "teacher");
  const helpers  = PEOPLE.filter(p => p.group === "helper");

  container.innerHTML = `
    <div class="write-group">
      <div class="write-group-label"><span>🎓</span> 선생님께</div>
      ${teachers.map(personCard).join("")}
    </div>
    <div class="write-group">
      <div class="write-group-label"><span>⭐</span> 도우미에게</div>
      ${helpers.map(personCard).join("")}
    </div>
  `;
}

function personCard(p) {
  return `
    <div class="write-person">
      <div class="write-person-header" data-target="${p.id}">
        <span class="write-person-emoji">${p.emoji}</span>
        <span class="write-person-name">${p.name}</span>
        <span class="write-person-role">${p.role}</span>
        <span class="write-person-toggle">+</span>
      </div>
      <div class="write-person-body" id="body-${p.id}" hidden>
        <textarea
          class="write-textarea"
          id="msg-${p.id}"
          name="${p.name}"
          placeholder="${p.name}에게 한마디..."
          rows="3"
        ></textarea>
      </div>
    </div>
  `;
}

// 아코디언 토글
document.getElementById("peopleList").addEventListener("click", e => {
  const header = e.target.closest(".write-person-header");
  if (!header) return;

  const id = header.dataset.target;
  const body = document.getElementById("body-" + id);
  const toggle = header.querySelector(".write-person-toggle");

  const isOpen = !body.hidden;
  body.hidden = isOpen;
  toggle.textContent = isOpen ? "+" : "−";
  header.closest(".write-person").classList.toggle("write-person--open", !isOpen);

  if (!isOpen) {
    body.querySelector("textarea").focus();
  }
});

// 폼 제출
document.getElementById("writeForm").addEventListener("submit", async e => {
  e.preventDefault();

  if (!SCRIPT_URL) {
    alert("SCRIPT_URL이 설정되지 않았습니다.\njs/write.js 파일에서 Google Apps Script URL을 입력해주세요.");
    return;
  }

  const sender = document.getElementById("senderName").value.trim() || "익명";

  // 메시지가 하나라도 있는지 확인
  const messages = {};
  let hasAny = false;
  PEOPLE.forEach(p => {
    const val = document.getElementById("msg-" + p.id).value.trim();
    if (val) {
      messages[p.name] = val;
      hasAny = true;
    }
  });

  if (!hasAny) {
    alert("메시지를 하나 이상 작성해주세요!");
    return;
  }

  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = "보내는 중...";

  try {
    const payload = { sender, ...messages };

    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // no-cors 모드에서는 응답을 읽을 수 없지만, 전송 자체는 됨
    document.getElementById("writeForm").hidden = true;
    document.getElementById("writeDone").hidden = false;
  } catch (err) {
    alert("전송 중 오류가 발생했습니다. 다시 시도해주세요.");
    console.error(err);
  } finally {
    btn.disabled = false;
    btn.textContent = "메시지 보내기";
  }
});

// 한 번 더 쓰기
document.getElementById("btnAgain").addEventListener("click", () => {
  document.getElementById("writeForm").hidden = false;
  document.getElementById("writeDone").hidden = true;
  document.getElementById("writeForm").reset();
  // 모든 아코디언 닫기
  document.querySelectorAll(".write-person-body").forEach(el => el.hidden = true);
  document.querySelectorAll(".write-person-toggle").forEach(el => el.textContent = "+");
  document.querySelectorAll(".write-person--open").forEach(el => el.classList.remove("write-person--open"));
});

// 초기화
renderPeopleList();
