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
  const SHEET_W = 1081;
  const SHEET_H = 768;
  const countW = Math.floor(SHEET_W / dogaWidth);
  const countH = Math.floor(SHEET_H / dogaHeight);
  return countW > 0 && countH > 0 ? countW * countH : 0;
}

// [명함 종이 단가] 1연(500장) 기준 단가 계산
function getUnitPrice(paperFeel, paperType, paperWeight, color) {
      console.log('[getUnitPrice]', { //디버깅용 콘솔 시작
    paperFeel,
    material,
    weight,
    color,
    result: NamecardPaperPrice[paperFeel]?.[material]?.[weight],
    resultColor: NamecardPaperPrice[paperFeel]?.[material]?.[color]?.[weight]
  }); // 디버깅용 콘솔 끝
  if (paperFeel === '매끄러운') {
    if (
      NamecardPaperPrice['매끄러운'][paperType] &&
      NamecardPaperPrice['매끄러운'][paperType][paperWeight]
    ) {
      const totalPrice = NamecardPaperPrice['매끄러운'][paperType][paperWeight];
      return Math.floor(totalPrice / 500);
    }
  }
  if (paperFeel === '러프한') {
    if (
      NamecardPaperPrice['러프한'][paperType] &&
      NamecardPaperPrice['러프한'][paperType][color] &&
      NamecardPaperPrice['러프한'][paperType][color][paperWeight]
    ) {
      const totalPrice = NamecardPaperPrice['러프한'][paperType][color][paperWeight];
      return Math.floor(totalPrice / 500);
    }
    // 색상 없이 바로 무게 배열일 경우도 커버 가능하게 추가 가능
  }
  return 0;
}

// [명함 인쇄비 계산]
function getPrintFee(printType = '단면', totalQty = 500, paperFeel = '매끄러운') {
  let printFeeBase = 0, plateFeeBase = 0;
  if (paperFeel === '매끄러운') {
    printFeeBase = printType === '양면' ? 80000 : 60000;
    plateFeeBase = printType === '양면' ? 25000 * 8 : 25000 * 4;
  } else {
    printFeeBase = printType === '양면' ? 160000 : 140000;
    plateFeeBase = printType === '양면' ? 25000 * 8 : 25000 * 4;
  }
  const multiplier = Math.ceil(totalQty / 250);
  return {
    plate: plateFeeBase * multiplier,
    print: printFeeBase * multiplier,
  };
}

// [코팅비 계산]
function getCoatingFee(coatingType = '없음', totalQty = 500, perSheetCount = 1) {
  if (!coatingType || coatingType === '없음') return 0;
  const sheetCount = Math.ceil(totalQty / perSheetCount);
  if (coatingType === '벨벳') {
    if (sheetCount <= 250) return 200000;
    return sheetCount * 400;
  }
  if (sheetCount <= 250) return 100000;
  return sheetCount * 200;
}

// [명함 재단비] - 무조건 수량 × 1원
function getCuttingFee(actualQty) {
  return actualQty * 1;
}

// [박비 계산]
function getFoilFee(foil, actualQty) {
  if (!foil || !foil.length) return { plate: 0, fee: 0 };
  const n = Array.isArray(foil) ? foil.length : 1;
  const plate = 150000 * (1 + (n - 1) * 0.5);
  const fee = actualQty * 50 * n;
  return { plate, fee };
}

// [형압비 계산]
function getEmbossFee(embossing, actualQty) {
  if (!embossing || embossing === '없음') return { plate: 0, fee: 0 };
  const plate = 150000;
  const fee = actualQty * 50;
  return { plate, fee };
}

// === 명함 견적 컴포넌트 ===
const EstimatePriceNamecard = ({
  width,
  height,
  paperFeel = '매끄러운',
  material = '',
  weight = '',
  color = '',
  printType = '단면',
  coating = '없음',
  round = '없음',
  quantity = 0,
  foil = [],
  embossing = '없음',
}) => {

    console.log('[EstimatePriceNamecard props]', { paperFeel, material, weight, color, printType, coating, quantity }); // 디버깅용 콘솔


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
  const unitPrice = getUnitPrice(paperFeel, paperType, paperWeight, color);
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
  const { plate: printPlateFee, print: printRunFee } = getPrintFee(printType, totalQuantity, paperFeel);

  // 코팅
  const coatingFee = getCoatingFee(coating, totalQuantity, perSheetCount);

  // 재단비
  const cuttingFee = getCuttingFee(totalQuantity);

  // 박/형압
  const { plate: foilPlate, fee: foilFee } = getFoilFee(foil, totalQuantity);
  const { plate: embossPlate, fee: embossFee } = getEmbossFee(embossing, totalQuantity);

  // 목형(명함은 0)
  const dieCutFee = 0;

  // 총 견적
  const estimate =
    paperTotal +
    printPlateFee +
    printRunFee +
    coatingFee +
    cuttingFee +
    foilFee +
    embossFee +
    foilPlate +
    embossPlate +
    dieCutFee;

  // 마진 20% (필요시)
  const estimateWithMargin = Math.ceil(estimate * 1.2);
  const unitPriceWithMargin = Math.ceil(estimateWithMargin / totalQuantity);

  // 출력
  return (
    <div className="estimate-box">
      <p className="main-estimate" style={{ color: 'crimson' }}>
        {estimateWithMargin.toLocaleString()}원부터~
      </p>
      <p className="estimate-unit">
        개당 금액: {unitPriceWithMargin.toLocaleString()}원
      </p>
    </div>
  );
};

export default EstimatePriceNamecard;
