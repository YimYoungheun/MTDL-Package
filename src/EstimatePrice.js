import React from 'react';

// --- 종이 가격표 (직접 사용하신 paperPrices를 사용/추가하세요!) ---
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
      '네츄럴': { '300g': 435000, '350g': 510000 },
      '엑스트라 화이트': { '410g': 0 } // 수정 필요
    },
    녹차지: {
      백색: { '300g': 400000, '350g': 430000 }
    }
  }
  // ... 필요시 추가
};

// --- 도면 사이즈 계산 (+30, +20 여백) ---
function getDogaSize(width, length, height, bottomStyle) {
  const dogaWidth = Number(width) + Number(height) + 30;
  const dogaHeight = Number(length) + Number(height) + 20;
  return { dogaWidth, dogaHeight };
}

// --- 전지 1장 내 효율 ---
function getPerSheetCount(dogaWidth, dogaHeight) {
  const SHEET_W = 1091, SHEET_H = 788;
  const countW = Math.floor(SHEET_W / dogaWidth);
  const countH = Math.floor(SHEET_H / dogaHeight);
  return countW > 0 && countH > 0 ? countW * countH : 0;
}

// --- 종이 1장 단가 계산 ---
function getUnitPrice(paperFeel, paperType, paperWeight, color, perSheetCount) {
  // 매끄러운(3depth)
  if (paperFeel === '매끄러운') {
    if (paperPrices['매끄러운'][paperType] && paperPrices['매끄러운'][paperType][paperWeight]) {
      const totalPrice = paperPrices['매끄러운'][paperType][paperWeight];
      return Math.ceil(totalPrice / 500 / perSheetCount);
    }
  }
  // 러프한(4depth)
  if (paperFeel === '러프한') {
    if (
      paperPrices['러프한'][paperType] &&
      paperPrices['러프한'][paperType][color] &&
      paperPrices['러프한'][paperType][color][paperWeight]
    ) {
      const totalPrice = paperPrices['러프한'][paperType][color][paperWeight];
      return Math.ceil(totalPrice / 500 / perSheetCount);
    }
  }
  // 없으면 0원
  return 0;
}

// --- 인쇄비/판비 ---
function getPrintFee(mainPrintColor, spotPrintColor, totalQty, perSheetCount, printNone) {
  if (printNone) return { plate: 0, print: 0 };
  let plateFee = 0;
  let printFee = 0;
  const colorNum = mainPrintColor ? parseInt(mainPrintColor[0], 10) || 0 : 0;
  const spotNum = spotPrintColor ? parseInt(spotPrintColor.replace('별색 ', '').replace('도', ''), 10) || 0 : 0;
  const totalColor = colorNum + spotNum;

  // 전지수량
  const sheetCount = Math.ceil(totalQty / perSheetCount);

  // 판비: 도수 x 25,000원
  plateFee = totalColor * 25000;

  // 인쇄비(1도당)
  if (totalColor > 0) {
    if (sheetCount <= 250) {
      printFee = totalColor * 80000;
    } else {
      printFee = totalColor * (Math.ceil(sheetCount / 250) * 80000);
    }
  }
  return { plate: plateFee, print: printFee };
}

// --- 코팅 ---
function getCoatingFee(coatingType, totalQty, perSheetCount) {
  if (!coatingType || coatingType === '없음') return 0;
  const sheetCount = Math.ceil(totalQty / perSheetCount);
  if (coatingType === '벨벳') {
    if (sheetCount <= 250) return 200000; // 10만원x2
    return sheetCount * 800; // 400x2
  }
  // 무광/유광
  if (sheetCount <= 250) return 100000;
  return sheetCount * 400;
}

// --- 톰슨 ---
function getThomsonFee(totalQty, perSheetCount) {
  const sheetCount = Math.ceil(totalQty / perSheetCount);
  if (sheetCount <= 250) return 70000;
  return sheetCount * 280;
}

// --- 박(개수별로 모두 적용) ---
function getFoilFee(foil, totalQty, perSheetCount) {
  if (!foil || foil.length === 0) return 0;
  const sheetCount = Math.ceil(totalQty / perSheetCount);
  let fee = 0;
  foil.forEach(() => {
    if (sheetCount <= 250) fee += 120000;
    else fee += sheetCount * 480;
  });
  return fee;
}

// --- 형압 ---
function getEmbossFee(embossing, totalQty, perSheetCount) {
  if (!embossing || embossing === '없음') return 0;
  const sheetCount = Math.ceil(totalQty / perSheetCount);
  if (sheetCount <= 250) return 100000;
  return sheetCount * 400;
}

// --- 접착 ---
function getBondingFee(bottomStyle, totalQty) {
  if (!bottomStyle) return 0;
  if (bottomStyle === '삼면접착') {
    if (totalQty <= 3500) return 70000;
    return totalQty * 20;
  } else {
    if (totalQty <= 4666) return 70000;
    return totalQty * 15;
  }
}

// --- 본문 ---
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
  coatingType = '없음',
  foil = [],
  embossing = '',
  mainPrintColor = '',
  spotPrintColor = '',
  printNone = false,
}) => {
  if (!width || !length || !height || !bottomStyle || !quantity) {
    return <div style={{ color: 'gray', margin: '1rem 0' }}>모든 정보를 입력하면 예상 견적이 나옵니다.</div>;
  }

  const doga = getDogaSize(width, length, height, bottomStyle);
  if (!doga) return <div style={{ color: 'gray' }}>도면 계산이 불가능합니다.</div>;
  const perSheetCount = getPerSheetCount(doga.dogaWidth, doga.dogaHeight);
  if (perSheetCount < 1) {
    return <div style={{ color: 'crimson', fontWeight: 'bold' }}>전지(1091×788)로 도면 제작 불가</div>;
  }

  const unitPrice = getUnitPrice(paperFeel, paperType, paperWeight, color, perSheetCount);
  if (!unitPrice) {
    return <div style={{ color: 'crimson' }}>종이 종류/두께를 다시 선택해 주세요.</div>;
  }

  const totalQuantity = parseInt(quantity);
  if (totalQuantity < 500) {
    return (
      <div style={{ margin: '1rem 0' }}>
        <span style={{
          color: 'crimson',
          fontSize: '0.9rem',
          fontWeight: 'normal',
          display: 'block',
          marginTop: '0.3rem'
        }}>
          최소 수량은 500개 이상입니다
        </span>
      </div>
    );
  }

  // 인쇄비·판비
  const { plate: printPlateFee, print: printRunFee } =
    getPrintFee(mainPrintColor, spotPrintColor, totalQuantity, perSheetCount, printNone);

  // 후가공/접착비용
  const coatingFee = getCoatingFee(coatingType, totalQuantity, perSheetCount);
  const thomsonFee = getThomsonFee(totalQuantity, perSheetCount);
  const foilFee = getFoilFee(foil, totalQuantity, perSheetCount);
  const embossFee = getEmbossFee(embossing, totalQuantity, perSheetCount);
  const bondingFee = getBondingFee(bottomStyle, totalQuantity);

  // 종이 단가 합산
  const paperTotal = unitPrice * totalQuantity;

  // 견적 합계 (도무송은 고정)
  const estimate =
    paperTotal +
    printPlateFee +
    printRunFee +
    coatingFee +
    thomsonFee +
    foilFee +
    embossFee +
    bondingFee;

  // 마진 1.15배 반영
  const estimateWithMargin = Math.ceil(estimate * 1.15);
  const unitPriceWithMargin = Math.ceil(estimateWithMargin / totalQuantity);

  return (
    <div style={{ margin: '1rem 0' }}>
      <span style={{
        color: '#e72a2a',
        fontWeight: 'bold',
        fontSize: '1.3rem'
      }}>
        예상 견적: {estimateWithMargin.toLocaleString()}원
      </span>
      <br />
      <span style={{
        color: 'black',
        fontWeight: 'normal',
        fontSize: '1rem',
        display: 'block',
        marginTop: '0.5rem'
      }}>
        개당 금액: {unitPriceWithMargin.toLocaleString()}원
      </span>
    </div>
  );
};

export default EstimatePrice;
