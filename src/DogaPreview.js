// 도면/끼워박기/절지 안내 예시
import React, { useState } from 'react';

const SHEETS = [
  { name: '국4절', width: 318, height: 469 },
  { name: '4절', width: 394, height: 545 },
  { name: '국2절', width: 465, height: 636 },
  { name: '2절', width: 545, height: 788 },
  { name: '국전지', width: 636, height: 939 },
  { name: '전지', width: 1091, height: 788 },
];

function getDogaWidth(w, l) {
  return (w * 2) + (l * 2) + 16 + 10;
}
function getDogaHeight(l, h, bottomStyle) {
  if (bottomStyle === '맞뚜껑') {
    return (16 + l) * 2 + h + 20;
  }
  if (bottomStyle === '십자다루마' || bottomStyle === '삼면접착') {
    return (l * 0.75) + h + l + 16 + 20;
  }
  return 0;
}
function getDogaHeight_Kkiwo(l, h, bottomStyle) {
  if (bottomStyle === '맞뚜껑') {
    return 16 + l + h + l + 16 + 5 + h + l + 16 + 20;
  }
  if (bottomStyle === '십자다루마' || bottomStyle === '삼면접착') {
    return (l * 0.75) + h + l + 16 + 5 + h + (l * 0.75) + 20;
  }
  return 0;
}

// 끼워박기 여부 및 절지 추천 알고리즘
function getSheetRecommendation(dogaWidth, dogaHeight, dogaHeightKkiwo) {
  for (const sheet of SHEETS) {
    // 가로로 최대 4개까지 배치
    let countGaro = Math.floor(sheet.width / dogaWidth);
    if (countGaro > 4) countGaro = 4;
    if (countGaro > 0) {
      // 남는 세로 공간 계산
      const remHeight = sheet.height - dogaHeight;
      if (remHeight >= 0) {
        // 기본 배치
        return {
          sheet: sheet.name,
          count: countGaro,
          kkiwo: false,
        };
      } else if (countGaro > 1) {
        // 세로 끼워박기 가능 여부 (가로배치 2개 이상일 때만 의미 있음)
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
  // 어느 절지에도 불가능한 경우
  return null;
}

export default function DogaPreview() {
  // 임시 입력값
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [bottomStyle, setBottomStyle] = useState('맞뚜껑');

  // 실제 수치 계산
  const w = parseInt(width);
  const l = parseInt(length);
  const h = parseInt(height);

  let dogaWidth = 0, dogaHeight = 0, dogaHeightKkiwo = 0, result = null;
  if (w > 0 && l > 0 && h > 0 && bottomStyle) {
    dogaWidth = getDogaWidth(w, l);
    dogaHeight = getDogaHeight(l, h, bottomStyle);
    dogaHeightKkiwo = getDogaHeight_Kkiwo(l, h, bottomStyle);
    result = getSheetRecommendation(dogaWidth, dogaHeight, dogaHeightKkiwo);
  }

  return (
    <div style={{maxWidth:400,margin:"auto"}}>
      <h3>도면 전개도/끼워박기/절지 안내 예시</h3>
      <input placeholder="가로(mm)" value={width} onChange={e=>setWidth(e.target.value)} style={{width:80}} />
      <input placeholder="세로(mm)" value={length} onChange={e=>setLength(e.target.value)} style={{width:80,marginLeft:8}} />
      <input placeholder="높이(mm)" value={height} onChange={e=>setHeight(e.target.value)} style={{width:80,marginLeft:8}} />
      <select value={bottomStyle} onChange={e=>setBottomStyle(e.target.value)} style={{marginLeft:8}}>
        <option value="맞뚜껑">맞뚜껑</option>
        <option value="십자다루마">십자다루마</option>
        <option value="삼면접착">삼면접착</option>
      </select>

      {w > 0 && l > 0 && h > 0 && (
        <div style={{marginTop:16,padding:8,background:"#eee",borderRadius:8}}>
          <div>전개도 크기: <b>{dogaWidth} × {dogaHeight} mm</b></div>
          <div>끼워박기 세로: <b>{dogaHeightKkiwo} mm</b></div>
        </div>
      )}
      {result && (
        <div style={{marginTop:16,padding:8,background:"#d6f5d6",borderRadius:8}}>
          <b>추천 절지: {result.sheet}</b><br />
          <b>가로로 {result.count}개 배치</b><br />
          {result.kkiwo ? <b style={{color:'crimson'}}>끼워박기 도면</b> : <span>끼워박기 없음</span>}
        </div>
      )}
      {w > 0 && l > 0 && h > 0 && !result && (
        <div style={{marginTop:16,color:"crimson",fontWeight:'bold'}}>
          도면 적용 불가능
        </div>
      )}
    </div>
  );
}
