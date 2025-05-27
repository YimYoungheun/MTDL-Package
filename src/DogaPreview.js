import React from 'react';

const SHEETS = [
  { name: '국4절', width: 318, height: 469 },
  { name: '4절', width: 394, height: 545 },
  { name: '국2절', width: 465, height: 636 },
  { name: '2절', width: 545, height: 788 },
  { name: '국전지', width: 636, height: 939 },
  { name: '전지', width: 1091, height: 788 },
];

// 전개도 가로 계산식
function getDogaWidth(w, l) {
  return (w * 2) + (l * 2) + 16 + 10;
}
// 전개도 세로(높이) 계산식
function getDogaHeight(l, h, bottomStyle) {
  if (bottomStyle === '맞뚜껑') {
    return (16 + l) * 2 + h + 20;
  }
  if (bottomStyle === '십자다루마' || bottomStyle === '삼면접착') {
    return (l * 0.75) + h + l + 16 + 20;
  }
  return 0;
}
// 끼워박기 세로 계산식
function getDogaHeightKkiwo(l, h, bottomStyle) {
  if (bottomStyle === '맞뚜껑') {
    return 16 + l + h + l + 16 + 5 + h + l + 16 + 20;
  }
  if (bottomStyle === '십자다루마' || bottomStyle === '삼면접착') {
    return (l * 0.75) + h + l + 16 + 5 + h + (l * 0.75) + 20;
  }
  return 0;
}

function getMaxGaroBatch(dogaWidth, maxWidth) {
  // 1개씩, 최대 6개까지 반복하며 도면 가로*n이 절지보다 작으면 증가
  for (let n = 6; n >= 1; n--) {
    if ((dogaWidth * n) <= maxWidth) {
      return n;
    }
  }
  return 0;
}

// 실제 알고리즘: 절지별, 가로 최대 6개, 필요시 세로 끼워박기까지
function getSheetRecommendation(dogaWidth, dogaHeight, dogaHeightKkiwo) {
  for (const sheet of SHEETS) {
    // 6~1개까지 배치 시도 (최대 가로 배치 우선)
    for (let countGaro = 6; countGaro >= 1; countGaro--) {
      // 5개, 6개 하리꼬미는 없음 등, 실제 규칙도 추가 가능
      // 여기선 요청대로 최대 6개까지 허용
      if ((dogaWidth * countGaro) <= sheet.width) {
        // 기본 배치
        if (dogaHeight <= sheet.height) {
          return {
            sheet: sheet.name,
            count: countGaro,
            kkiwo: false,
          };
        }
        // 세로 끼워박기 시도(가로배치 2개 이상에서만 의미 있음)
        if (countGaro > 1 && dogaHeightKkiwo <= sheet.height) {
          return {
            sheet: sheet.name,
            count: countGaro,
            kkiwo: true,
          };
        }
      }
    }
  }
  return null;
}

export default function DogaPreview({ width, length, height, bottomStyle }) {
  const w = parseInt(width, 10);
  const l = parseInt(length, 10);
  const h = parseInt(height, 10);

  if (!(w > 0 && l > 0 && h > 0 && bottomStyle)) return null;

  const dogaWidth = getDogaWidth(w, l);
  const dogaHeight = getDogaHeight(l, h, bottomStyle);
  const dogaHeightKkiwo = getDogaHeightKkiwo(l, h, bottomStyle);
  const result = getSheetRecommendation(dogaWidth, dogaHeight, dogaHeightKkiwo);

  return (
    <div style={{ marginTop: 16, padding: 12, background: "#f5f6fa", borderRadius: 10 }}>
      <div style={{ fontWeight: 'bold', marginBottom: 5 }}>전개도/끼워박기/절지 안내</div>
      <div>전개도 크기: <b>{dogaWidth} × {dogaHeight} mm</b></div>
      <div>끼워박기 세로: <b>{dogaHeightKkiwo} mm</b></div>
      {result ? (
        <div style={{marginTop:10,background:"#eaffea",borderRadius:8,padding:8}}>
          <b>추천 절지: {result.sheet}</b><br />
          <b>가로로 {result.count}개 배치</b><br />
          {result.kkiwo ? <b style={{color:'crimson'}}>끼워박기 도면</b> : <span>끼워박기 없음</span>}
        </div>
      ) : (
        <div style={{marginTop:10, color:"crimson", fontWeight:'bold'}}>
          도면 적용 불가능
        </div>
      )}
    </div>
  );
}
