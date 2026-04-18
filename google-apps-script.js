/**
 * Google Apps Script — 스윙프렌즈 롤링페이퍼 메시지 수신
 *
 * === 설정 방법 ===
 *
 * 1. Google Sheets에서 새 스프레드시트 생성
 * 2. 첫 번째 행(헤더)에 아래 값을 순서대로 입력:
 *    타임스탬프 | 이름(선택) | 제리 | 빨강구두 | 송히 | 그레이 | 서벅돔 | 효돔 | 스말러돔 | 대니돔 | 이리돔 | 다정돔 | 초코돔
 *
 * 3. 확장 프로그램 > Apps Script 클릭
 * 4. 기존 코드 지우고 이 파일 내용 전체 붙여넣기
 * 5. 배포 > 새 배포 > 유형: 웹 앱
 *    - 실행 주체: 나
 *    - 액세스: 모든 사용자
 * 6. 배포 후 나오는 URL을 복사
 * 7. js/write.js의 SCRIPT_URL에 붙여넣기
 *
 * === 기존 CSV 워크플로우도 유지됨 ===
 * 시트에서 파일 > 다운로드 > CSV 하면 기존 messages.csv와 동일 포맷
 */

const COLUMNS = [
  "이름(선택)",
  "제리", "빨강구두", "송히", "그레이",
  "서벅돔", "효돔", "스말러돔", "대니돔", "이리돔", "다정돔", "초코돔"
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    const row = [new Date()]; // 타임스탬프

    // sender → 이름(선택) 컬럼
    row.push(data.sender || "");

    // 각 사람 이름으로 매핑
    const people = COLUMNS.slice(1); // 이름(선택) 제외
    people.forEach(name => {
      row.push(data[name] || "");
    });

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 — 시트 데이터를 JSON으로 반환
function doGet() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();

    if (data.length < 2) {
      return ContentService
        .createTextOutput(JSON.stringify({ rows: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const headers = data[0].map(h => String(h).trim());
    const rows = [];

    for (let i = 1; i < data.length; i++) {
      const row = {};
      headers.forEach((h, j) => {
        row[h] = data[i][j] != null ? String(data[i][j]).trim() : "";
      });
      rows.push(row);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ rows }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
