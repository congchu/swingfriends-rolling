/**
 * data.js — Google Sheets 연동 데이터 로더
 *
 * Google Sheets에서 실시간으로 메시지를 가져옵니다.
 * SHEET_URL이 비어있으면 로컬 CSV 폴백으로 동작합니다.
 *
 * 컬럼 헤더(구글 시트 첫 행) → person id 매핑.
 * 시트 헤더를 바꿨으면 여기 COLUMN_MAP도 맞춰서 수정하세요.
 */

// env.js의 ENV.SCRIPT_URL을 사용 (doGet으로 시트 데이터를 JSON으로 반환)
const SHEET_URL = (typeof ENV !== "undefined" && ENV.SCRIPT_URL) || "";

// Google Sheets 컬럼 헤더 → person id 매핑
// (구글 폼 질문 텍스트 그대로)
const COLUMN_MAP = {
  "1) 제리 쌤":    "jerry",
  "2) 빨간구두 쌤": "redshoes",
  "3) 송히 쌤":    "songhi",
  "4) 그레이 쌤":  "gray",
  "5) 서벅 돔":    "seobuk",
  "6) 효 돔":      "hyo",
  "7) 스말러 돔":  "smaller",
  "8) 대니 돔":    "danny",
  "9) 이리 돔":    "iri",
  "10) 다정 돔":   "dajeong",
  "11) 초코 돔":   "choco",
};

// 로컬 CSV용 매핑 (기존 폴백)
const COLUMN_MAP_CSV = {
  "제리":    "jerry",
  "빨간구두": "redshoes",
  "송히":    "songhi",
  "그레이":  "gray",
  "서벅돔":  "seobuk",
  "효돔":    "hyo",
  "스말러돔": "smaller",
  "대니돔":  "danny",
  "이리돔":  "iri",
  "다정돔":  "dajeong",
  "초코돔":  "choco",
};

// 이름 컬럼 헤더
const SENDER_COLUMN = "작성자분의 닉네임을 알려주세요!";
const SENDER_COLUMN_CSV = "이름(선택)";

/**
 * people.json 로드
 * @returns {Promise<{teachers: Array, helpers: Array}>}
 */
async function loadPeople() {
  const res = await fetch("data/people.json");
  if (!res.ok) throw new Error("people.json 로드 실패");
  return res.json();
}

/**
 * row 배열 → person id별 메시지 맵 변환
 */
function parseRows(rows, columnMap, senderCol) {
  const map = new Map();
  Object.values(columnMap).forEach(id => map.set(id, []));

  rows.forEach(row => {
    const sender = (row[senderCol] || "").trim() || "익명";

    Object.entries(columnMap).forEach(([colName, personId]) => {
      const msg = (row[colName] || "").trim();
      if (msg) {
        map.get(personId).push({ from: sender, message: msg });
      }
    });
  });

  return map;
}

const CACHE_KEY = "swing_sheet_rows";

// 새로고침(F5, Cmd+R) 시 캐시 무효화
(function () {
  const nav = performance.getEntriesByType("navigation")[0];
  if (nav && nav.type === "reload") {
    try { sessionStorage.removeItem(CACHE_KEY); } catch (_) {}
  }
})();

/**
 * sessionStorage에서 캐시된 rows 반환 (있으면)
 */
function getCachedRows() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

/**
 * rows를 sessionStorage에 저장
 */
function cacheRows(rows) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(rows));
  } catch (_) {}
}

/**
 * Google Sheets에서 메시지 로드 (Apps Script doGet)
 */
async function fetchSheetRows() {
  const res = await fetch(SHEET_URL);
  if (!res.ok) throw new Error("Google Sheets 로드 실패");
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json.rows || [];
}

/**
 * 로컬 CSV에서 메시지 로드 (폴백)
 */
async function loadMessagesFromCSV() {
  const res = await fetch("data/린초 2_3 감사인사 - 설문지 응답 시트1.csv");
  if (!res.ok) throw new Error("CSV 로드 실패");
  const text = await res.text();

  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: h => h.trim(),
  });

  return parseRows(parsed.data, COLUMN_MAP, SENDER_COLUMN);
}

/**
 * 메시지 로드 — 캐시 → Google Sheets → 로컬 CSV 순서
 */
async function loadMessages() {
  // 1) sessionStorage 캐시 확인
  const cached = getCachedRows();
  if (cached) {
    return parseRows(cached, COLUMN_MAP, SENDER_COLUMN);
  }

  // 2) Google Sheets에서 fetch
  if (SHEET_URL) {
    try {
      const rows = await fetchSheetRows();
      cacheRows(rows);
      return parseRows(rows, COLUMN_MAP, SENDER_COLUMN);
    } catch (err) {
      console.warn("Google Sheets 로드 실패, 로컬 CSV로 폴백:", err);
      return await loadMessagesFromCSV();
    }
  }

  // 3) 로컬 CSV 폴백
  return await loadMessagesFromCSV();
}

/**
 * 두 데이터를 함께 로드하고 캐시
 */
let _cache = null;

async function loadAll() {
  if (_cache) return _cache;
  const [people, messages] = await Promise.all([loadPeople(), loadMessages()]);
  const allPeople = [...people.teachers, ...people.helpers];
  _cache = { people, allPeople, messages };
  return _cache;
}

// 전역으로 노출
window.SwingData = { loadAll, COLUMN_MAP };
