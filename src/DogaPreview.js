// DogaPreview.js
import React from 'react';

// 절지(종이) 종류와 크기 정보
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

// 절지별로 배치 가능 여부/끼워박기 가능 여부 계산
function getSheetRecommendation(dogaWidth, dogaHeight, dogaHeightKkiwo) {
  for (const sheet of SHEETS) {
    let countGaro = Math.floor(sheet.width / dogaWidth);
    if (countGaro > 4) countGaro = 4;
    if (countGaro > 0) {
      // 남는 세로 공간
      const remHeight = sheet.height - dogaHeight;
      if (remHeight >= 0) {
        // 기본 배치 가능
        return {
          sheet: sheet.name,
          count: countGaro,
          kkiwo: false,
        };
      } else if (countGaro > 1) {
        // 끼워박기 시도(가로로 2개 이상 배치할 때만 의미 있음)
        const remHeightKkiwo = sheet.height - dogaHeightKkiwo;
        if (remHeightKkiwo >= 0) {
          return {
            sheet: sheet.name,
            count: countGaro,
            kkiwo: true,
          };
        }
      }
    }
  }
  // 어느 절지에도 불가능하면
  return null;
}

export default function DogaPreview({ width, length, height, bottomStyle }) {
  // 입력값을 정수로 변환
  const w = parseInt(width, 10);
  const l = parseInt(length, 10);
  const h = parseInt(height, 10);

  // 입력값이 없으면 미리보기 안보임
  if (!(w > 0 && l > 0 && h > 0 && bottomStyle)) return null;

  // 전개도/끼워박기/추천 절지 계산
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
