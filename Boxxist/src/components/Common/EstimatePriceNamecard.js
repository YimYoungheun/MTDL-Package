import React from 'react';
import { NamecardPaperPrice } from '../../data/NamecardPaperPrice';

// [명함 도면 사이즈 계산]
function getNamecardDogaSize(width, height) {
  const bleed = 2; // 각 방향 여백 mm
  return {
    dogaWidth: Number(width) + bleed * 2,
    dogaHeight: Number(height) + bleed * 2,
  };
}

// 전지당 생산수 계산 (1091×788 기준, 사방 10/20mm 감안)
function getPerSheetCount(dogaWidth, dogaHeight) {
  const SHEET_W = 768;
  const SHEET_H = 1081;
  const countW = Math.floor(SHEET_W / dogaWidth);
  const countH = Math.floor(SHEET_H / dogaHeight);
  return countW > 0 && countH > 0 ? countW * countH : 0;
}

// [명함 종이 단가] 1연(500장) 기준 단가 계산
function getUnitPrice(paperFeel, paperType, paperWeight, color, perSheetCount) {
  if (!perSheetCount || perSheetCount < 1) return 0;   // ← 방어 코드 추가!
  if (paperFeel === '매끄러운') {
    if (
      NamecardPaperPrice['매끄러운'][paperType] &&
      NamecardPaperPrice['매끄러운'][paperType][paperWeight]
    ) {
      const totalPrice = NamecardPaperPrice['매끄러운'][paperType][paperWeight];
      return Math.floor(totalPrice / 500 / perSheetCount);
    }
  }
  if (paperFeel === '러프한') {
    if (
      NamecardPaperPrice['러프한'][paperType] &&
      NamecardPaperPrice['러프한'][paperType][color] &&
      NamecardPaperPrice['러프한'][paperType][color][paperWeight]
    ) {
      const totalPrice = NamecardPaperPrice['러프한'][paperType][color][paperWeight];
      return Math.floor(totalPrice / 500 / perSheetCount);
    }
  }
  return 0;
}

// [명함 인쇄비 계산]
function getPrintFee(printType = '단면', totalQty = 500, paperFeel = '매끄러운', perSheetCount = 1) {
  let printFeeBase = 0, plateFeeBase = 0;
  if (paperFeel === '매끄러운') {
    printFeeBase = printType === '양면' ? 160000 : 80000;
    plateFeeBase = printType === '양면' ? 25000 * 8 : 25000 * 4;
  } else {
    printFeeBase = printType === '양면' ? 320000 : 160000;
    plateFeeBase = printType === '양면' ? 25000 * 8 : 25000 * 4;
  }
  const multiplier = Math.ceil(totalQty / 250);

  // 기존 총 인쇄비 계산
  const totalPrintFee = printFeeBase * multiplier;

  // 판비도 마찬가지로 단가 환산
  const perUnitPrintFee = totalPrintFee / perSheetCount;
  const perUnitPlateFee = plateFeeBase / perSheetCount;

  // 실제 인쇄비와 판비 = 1매 단가 * 수량
  const print = Math.ceil(perUnitPrintFee * totalQty);
  const plate = Math.ceil(perUnitPlateFee * totalQty);

  return {
    plate,
    print,
  };
}

// [코팅비 계산]
function getCoatingFee(coating = '없음', totalQty = 500) {
  if (!coating || coating === '없음') return 0;
  if (coating === '벨벳') {
    return totalQty * 10;
  }
  // 무광, 유광은 모두 4원
  if (coating === '무광' || coating === '유광') {
    return totalQty * 4;
  }
  // 그 외(예외)는 0원
  return 0;
}


// [명함 재단비] - 무조건 수량 × 1원
function getCuttingFee(actualQty) {
  return actualQty * 1;
}

// [박비 계산]
function getFoilFee(foil, actualQty, perSheetCount = 1) {
  if (!foil || !foil.length) return { plate: 0, fee: 0 };
  const n = Array.isArray(foil) ? foil.length : 1;
  // 동판비 1매 단가로 환산
  const platePerUnit = (150000 * (1 + (n - 1) * 0.5)) / perSheetCount;
  // 박 작업비 1매 단가
  const feePerUnit = (50 * n);

  // 전체 견적
  return {
    plate: Math.ceil(platePerUnit * actualQty),
    fee: Math.ceil(feePerUnit * actualQty)
  };
}

// [형압비 계산]
function getEmbossFee(embossing, actualQty, perSheetCount = 1) {
  if (!embossing || embossing === '없음') return { plate: 0, fee: 0 };
  // 동판비 1매 단가로 환산
  const platePerUnit = 150000 / perSheetCount;
  // 형압 작업비 1매 단가
  const feePerUnit = 50;

  // 전체 견적
  return {
    plate: Math.ceil(platePerUnit * actualQty),
    fee: Math.ceil(feePerUnit * actualQty)
  };
}

// === 명함 견적 컴포넌트 ===
const EstimatePriceNamecard = ({
  width,
  height,
  paperFeel = '매끄러운',
  paperType = '',
  paperWeight = '',
  color = '',
  printType = '단면',
  plate,
  print,
  coating = '없음',
  foilFace = '없음',
  foilTypes = [],
  embossFace = '없음',
  embossShape = [],
  round = '없음',
  quantity = 0,
  foil = [],
  embossing = '없음',
}) => {

  // 기본 입력값 검사
  if (!width || !height || !paperFeel || !paperType || !paperWeight || !printType || !quantity) {
    return (
      <div className="estimate-box">
        <span className="estimate-unit" style={{ color: 'gray' }}>
          모든 정보를 입력하면 예상 견적이 나옵니다.
        </span>
      </div>
    );
  }

  // 도면/전지당 생산 수
  const doga = getNamecardDogaSize(width, height);
  const perSheetCount = getPerSheetCount(doga.dogaWidth, doga.dogaHeight);

  if (perSheetCount < 1) {
    return (
      <div className="estimate-box">
        <span className="estimate-unit" style={{ color: 'crimson', fontWeight: 'bold' }}>
          전지(1091×788)로 도면 제작 불가
        </span>
      </div>
    );
  }
 
  // 종이 단가
  let unitPrice = 0;
  if (paperFeel === '매끄러운') {
    if (
      NamecardPaperPrice['매끄러운'][paperType] &&
      NamecardPaperPrice['매끄러운'][paperType][paperWeight]
    ) {
      const totalPrice = NamecardPaperPrice['매끄러운'][paperType][paperWeight];
      unitPrice = Math.ceil(totalPrice / 500 / perSheetCount);
    }
  }
  if (paperFeel === '러프한') {
    if (
      NamecardPaperPrice['러프한'][paperType] &&
      NamecardPaperPrice['러프한'][paperType][color] &&
      NamecardPaperPrice['러프한'][paperType][color][paperWeight]
    ) {
      const totalPrice = NamecardPaperPrice['러프한'][paperType][color][paperWeight];
      unitPrice = Math.ceil(totalPrice / 500 / perSheetCount);
    }
  }
  if (!unitPrice) {
    return (
      <div className="estimate-box">
        <span className="estimate-unit" style={{ color: 'crimson' }}>
          종이 종류/두께를 다시 선택해 주세요.
        </span>
      </div>
    );
  }

  // 수량
  const totalQuantity = parseInt(quantity, 10);
  if (!totalQuantity || isNaN(totalQuantity) || totalQuantity < 1) {
    return (
      <div className="estimate-box">
        <span className="estimate-unit" style={{ color: 'crimson' }}>
          희망 수량을 정확히 입력해 주세요.
        </span>
      </div>
    );
  }

  // 종이비 계산
  const extraSheets = 50; // 여분 전지
  const sheetCount = Math.ceil(totalQuantity / perSheetCount);
  const totalOrderSheets = sheetCount + extraSheets;
  const paperTotal = unitPrice * totalOrderSheets;

  // 인쇄비
  let printBase = 100000 + 80000; // 일반(매끄러운) 단면 기본값
  if (paperFeel === '러프한') printBase *= 2; // 고급명함(러프한) 인쇄비 2배
  if (printType === '양면') printBase *= 2;   // 양면은 2배
  const perUnitPrint = Math.ceil(printBase / 500 / perSheetCount);

  // 코팅비(함수 사용)
  const coatingFee = getCoatingFee(coating, totalQuantity);

  // 재단비
  const cuttingFee = 3;

  // --- 박(foil) 계산 ---
  let perUnitFoil = 0, perUnitFoilPlate = 0;
  if (foilFace !== '없음' && foilTypes && foilTypes.length > 0) {
    const n = foilTypes.length;
    const faceMultiplier = foilFace === '양면' ? 2 : 1;
    perUnitFoilPlate = Math.ceil((150000 * (1 + (n - 1) * 0.5) * faceMultiplier) / 500 / perSheetCount);
    perUnitFoil = Math.ceil((50 * n * faceMultiplier) / 1);
  }
  
  // --- 형압(emboss) 계산 ---
  let perUnitEmboss = 0, perUnitEmbossPlate = 0;
  if (embossFace !== '없음' && embossShape && embossShape.length > 0) {
    const faceMultiplier = embossFace === '양면' ? 2 : 1;
    perUnitEmbossPlate = Math.ceil((150000 * faceMultiplier) / 500 / perSheetCount);
    perUnitEmboss = Math.ceil((50 * faceMultiplier) / 1);
  }

  // --- 실크(silk) 계산 ---
  function getSilkFee(quantity, silkSide) {
  if (!quantity || silkSide === '없음') return 0;
  const feePerCard = 4;
  const multiplier = (silkSide === '양면') ? 2 : 1;
  return Number(quantity) * feePerCard * multiplier;
}

  // 귀도리 비용
  const roundCuttingFee = (round && round !== '없음') ? totalQuantity * 3 : 0;

  // 총 견적
const unitTotal =
  unitPrice +
  perUnitPrint +
  cuttingFee +
  perUnitFoil +
  perUnitFoilPlate +
  perUnitEmboss +
  perUnitEmbossPlate;

const estimate = (unitTotal * totalQuantity) + coatingFee + roundCuttingFee;
  // 마진 20% (필요시)
  const estimateWithMargin = Math.ceil(estimate * 1.2);
  const unitPriceWithMargin = Math.ceil(estimateWithMargin / totalQuantity);

  // 출력
  return (
    <div className="estimate-box">
      <p className="main-estimate">
        {estimateWithMargin.toLocaleString()}원
      </p>
      <p className="estimate-unit">
        개당 금액: {unitPriceWithMargin.toLocaleString()}원
      </p>
    </div>
  );
};

export default EstimatePriceNamecard;
