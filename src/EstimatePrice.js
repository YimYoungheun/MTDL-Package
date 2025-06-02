import React from 'react';

// 소수점 올림 함수
function ceil(num) {
  return Math.ceil(num);
}

// 종이 가격 데이터 (매끄러운, 러프한, 친환경, 옵션 전체)
const paperPrices = {
  '매끄러운': {
    AB: { '300g': 359390, '350g': 420690 },
    CCP: { '300g': 386260, '350g': 450640 },
    아이보리: { '300g': 235040, '350g': 272400 },
    'SC 마닐라': { '300g': 181630, '350g': 211550 }
  },
  '러프한': {
    올드밀: {
      비앙코: { '300g': 764500, '350g': 891000 },
      '엑스트라 화이트': { '300g': 695000, '350g': 810000 },
      '프리미엄 화이트': { '410g': 1215000 }
    },
    아코팩: {
      '웜 화이트': { '300g': 435000, '350g': 510000, '400g': 595000 },
      '네츄럴': { '300g': 435000, '350g': 510000, '400g': 595000 },
      '엑스트라 화이트': { '410g': 695000 }
    },
    녹차지: {
      백색: { '300g': 400000, '350g': 430000 }
    },
    매직패브릭: {
      검정색: { '300g': 470000, '350g': 510000, '400g': 590000 },
      진곤색: { '300g': 470000, '350g': 510000, '400g': 590000 },
      피색: { '300g': 470000, '350g': 510000, '400g': 590000 },
      진한밤색: { '300g': 470000, '350g': 510000, '400g': 590000 },
      체리색: { '300g': 470000, '350g': 510000, '400g': 590000 },
      클래식블랙: { '300g': 470000, '350g': 510000, '400g': 590000 }
    }
  },
  '친환경': {
    얼스팩: { '295g': 385000 },
    크라프트: { '300g': 380000, '337g': 410000 }
  }
};

const SHEET_WIDTH = 1081; // mm
const SHEET_HEIGHT = 768; // mm

function getDogaSize(width, length, height, bottomStyle) {
  width = parseInt(width);
  length = parseInt(length);
  height = parseInt(height);

  const dogaWidth = width * 2 + length * 2 + 16 + 5;
  let dogaHeight;

  if (bottomStyle === '맞뚜껑') {
    dogaHeight = 16 + length + height + length + 16 + 5;
  } else if (bottomStyle === '십자다루마' || bottomStyle === '삼면접착') {
    dogaHeight = (length * 0.75) + height + length + 16 + 5;
  } else {
    return null;
  }

  return {
    dogaWidth,
    dogaHeight
  };
}

function getPerSheetCount(dogaWidth, dogaHeight) {
  if (!dogaWidth || !dogaHeight) return 0;
  const row = Math.floor(SHEET_WIDTH / dogaWidth);
  const col = Math.floor(SHEET_HEIGHT / dogaHeight);
  return row * col;
}

// ⭐️ 종이별 단가 계산 함수 (친환경/러프한까지 적용)
function getUnitPrice(paperFeel, paperType, paperWeight, color, perSheetCount) {
  let paperPrice;
  if (paperFeel === '매끄러운') {
    paperPrice = paperPrices['매끄러운']?.[paperType]?.[paperWeight];
  } else if (paperFeel === '러프한') {
    // 색상 선택이 있는 재질
    if (color) {
      paperPrice = paperPrices['러프한']?.[paperType]?.[color]?.[paperWeight];
    } else {
      paperPrice = paperPrices['러프한']?.[paperType]?.[paperWeight];
    }
  } else if (paperFeel === '친환경') {
    paperPrice = paperPrices['친환경']?.[paperType]?.[paperWeight];
  }

  if (!paperPrice || !perSheetCount) return null;
  const pricePerSheet = ceil(paperPrice / 500); // 1장당 단가, 올림
  const unitPrice = ceil(pricePerSheet / perSheetCount); // 1개 단가, 올림
  return unitPrice;
}

// ⭐️ 코팅비 계산
function getCoatingFee(coatingType, totalQty, perSheetCount) {
  if (!coatingType || coatingType === '없음') return 0;
  const sheets = ceil(totalQty / perSheetCount);
  let baseFee = 80000;
  if (sheets > 250) {
    baseFee += (sheets - 250) * 100;
  }
  if (coatingType === '벨벳') {
    baseFee *= 2;
  }
  return baseFee;
}

// ⭐️ 톰슨 작업비 계산
function getThomsonFee(totalQty, perSheetCount) {
  const sheets = ceil(totalQty / perSheetCount);
  if (sheets <= 250) {
    return 70000;
  } else {
    return 70000 + (sheets - 250) * 70;
  }
}

const EstimatePrice = ({
  width,
  length,
  height,
  bottomStyle,
  paperFeel = '매끄러운',
  paperType = 'AB',
  paperWeight = '300g',
  color = '',
  quantity,
  coatingType = '없음'
}) => {
  if (!width || !length || !height || !bottomStyle || !quantity) {
    return <div style={{ color: 'gray', margin: '1rem 0' }}>모든 정보를 입력하면 예상 견적이 나옵니다.</div>;
  }

  // 도면 크기 계산
  const doga = getDogaSize(width, length, height, bottomStyle);
  if (!doga) return <div style={{ color: 'gray' }}>도면 계산이 불가능합니다.</div>;

  // 전지 1장당 배치 개수
  const perSheetCount = getPerSheetCount(doga.dogaWidth, doga.dogaHeight);
  if (perSheetCount < 1) {
    return <div style={{ color: 'crimson', fontWeight: 'bold' }}>전지(1091×788)로 도면 제작 불가</div>;
  }

  // 단가 계산
  const unitPrice = getUnitPrice(paperFeel, paperType, paperWeight, color, perSheetCount);
  if (!unitPrice) {
    return <div style={{ color: 'crimson' }}>종이 종류/두께를 다시 선택해 주세요.</div>;
  }

  // 총 견적 계산
  const totalQuantity = parseInt(quantity);
  const diecutFee = 180000; // 목형칼비(항상 포함)
  const plateFee = 100000;  // 판비

  // 인쇄비
  const sheetCount = ceil(totalQuantity / perSheetCount);
  const printFee = ceil(sheetCount / 250) * 80000;

  // 코팅비
  const coatingFee = getCoatingFee(coatingType, totalQuantity, perSheetCount);

  // 톰슨 작업비(가공비)
  const thomsonFee = getThomsonFee(totalQuantity, perSheetCount);

  // 전체 견적
  const estimate =
    unitPrice * totalQuantity +
    diecutFee +
    plateFee +
    printFee +
    coatingFee +
    thomsonFee;

  return (
    <div style={{ margin: '1rem 0', color: 'crimson', fontWeight: 'bold', fontSize: '1.3rem' }}>
      예상 견적: {estimate.toLocaleString()}원
    </div>
  );
};

export default EstimatePrice;
