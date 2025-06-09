import React from 'react';
import { NamecardPaperPrice } from '../../data/NamecardPaperPrice';

// [명함 도면 사이즈 계산]
// - 사이즈(가로, 세로)는 선택 옵션에서 받음
// - 사방 2mm씩 추가 여백 필요(총 4mm씩 더함)
function getNamecardDogaSize(width, height) {
  // width, height는 실제 명함 사이즈(mm)
  const bleed = 2; // 각 방향 여백 mm
  return {
    dogaWidth: Number(width) + bleed * 2,    // 가로 + 4mm
    dogaHeight: Number(height) + bleed * 2,  // 세로 + 4mm
  };
}

function getPerSheetCount(dogaWidth, dogaHeight) {
  const SHEET_W = 1081;  // 1091 - 10
  const SHEET_H = 768;  // 788 - 20
  const countW = Math.floor(SHEET_W / dogaWidth);
  const countH = Math.floor(SHEET_H / dogaHeight);
  return countW > 0 && countH > 0 ? countW * countH : 0;
}

function getUnitPrice(paperFeel, paperType, paperWeight, color) {
  // [명함 종이 단가 계산] - 무조건 1연(500장) 기준
  if (paperFeel === '매끄러운') {
    if (
      NamecardPaperPrice['매끄러운'][paperType] &&
      NamecardPaperPrice['매끄러운'][paperType][paperWeight]
    ) {
      const totalPrice = NamecardPaperPrice['매끄러운'][paperType][paperWeight];
      return Math.floor(totalPrice / 500); // 소수점은 버림, 1연 기준 단가
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
  }
  return 0;
}

// [명함 인쇄비 계산]
// "스탠다드"(매끄러운)와 "고급명함"(러프한)에 따라 요율이 다름
// 단면: 인쇄비 + 판비(4도), 양면: 인쇄비 + 판비(8도)
function getPrintFee(printType, totalQty, paperFeel) {
  // 1. 인쇄비/판비 기준표
  let printFeeBase = 0, plateFeeBase = 0;
  if (paperFeel === '매끄러운') { // 스탠다드
    printFeeBase = printType === '양면' ? 80000 : 60000;
    plateFeeBase = printType === '양면' ? 25000 * 8 : 25000 * 4;
  } else { // 고급명함(러프한)
    printFeeBase = printType === '양면' ? 160000 : 140000;
    plateFeeBase = printType === '양면' ? 25000 * 8 : 25000 * 4;
  }

  // 2. 250장 단위로 올림(누진) 곱
  const multiplier = Math.ceil(totalQty / 250);
  const printFee = printFeeBase * multiplier;
  const plateFee = plateFeeBase * multiplier;

  return { plate: plateFee, print: printFee };
}

function getCoatingFee(coatingType, totalQty, perSheetCount) {
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

function getFoilFee(foil, actualQty) {
  if (!foil || foil.length === 0) return { plate: 0, fee: 0 };
  const n = foil.length;
  // 동판비: 1개 15만원, 2개 22.5만원, 3개 30만원, 4개 37.5만원 ...
  const plate = 150000 * (1 + (n - 1) * 0.5);
  // 작업비: 수량 * 50원 * 개수
  const fee = actualQty * 50 * n;
  return { plate, fee };
}

function getEmbossFee(embossing, actualQty) {
  if (!embossing || embossing === '없음') return { plate: 0, fee: 0 };
  // plate: 동판비/필름값(무조건 한 번만 150,000원)
  const plate = 150000;
  const fee = actualQty * 50;
  return { plate, fee };
}

const EstimatePriceY = ({
  width, length, height, thickness, cover,
  paperFeel = '매끄러운', paperType = 'AB', paperWeight = '300g', color = '',
  quantity, coatingType = '없음', foil = [], embossing = '', mainPrintColor = '', spotPrintColor = '', printNone = false,
}) => {

  // 1. 기본 입력값 누락 검사
  if (!width || !length || !height || !thickness || !quantity) {
    return (
      <div className="estimate-box">
        <span className="estimate-unit" style={{ color: 'gray' }}>
          모든 정보를 입력하면 예상 견적이 나옵니다.
        </span>
      </div>
    );
  }

    // 3. 도면 계산
  const doga = getDogaSize(width, length, height, thickness, cover);
  if (!doga) {
    return (
      <div className="estimate-box">
        <span className="estimate-unit" style={{ color: 'gray' }}>
          도면 계산이 불가능합니다.
        </span>
      </div>
    );
  }

  // 4. 전지당 도면 수 계산
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

  // 5. 종이 단가 계산
  const unitPrice = getUnitPrice(paperFeel, paperType, paperWeight, color, perSheetCount);
  if (!unitPrice) {
    return (
      <div className="estimate-box">
        <span className="estimate-unit" style={{ color: 'crimson' }}>
          종이 종류/두께를 다시 선택해 주세요.
        </span>
      </div>
    );
  }

  // 6. 수량 계산
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

  const actualQty = cover === '제작' ? totalQuantity * 2 : totalQuantity;
  const extraSheets = 50; // 전지 기준 여분 (진짜 종이 50장)
  const sheetCount = Math.ceil(totalQuantity / perSheetCount); // 실제 필요한 전지 수
  const totalOrderSheets = sheetCount + extraSheets; // 여분까지 합친 전지 수
  const paperTotal = unitPrice * totalOrderSheets; // 최종 종이비

  const { plate: printPlateFee, print: printRunFee } =
  getPrintFee(printType, actualQty, paperFeel);
  const coatingFee = getCoatingFee(coatingType, actualQty, perSheetCount);
  const cuttingFee = getCuttingFee(actualQty);
  const { plate: foilPlate, fee: foilFee } = getFoilFee(foil, actualQty);
  const { plate: embossPlate, fee: embossFee } = getEmbossFee(embossing, actualQty);

  const estimate =
    paperTotal +
    printPlateFee +
    printRunFee +
    coatingFee +
    cuttingFee +
    foilFee +
    embossFee +
    foilPlate +      // 박 동판/필름비
    embossPlate +    // 형압 동판/필름비
    dieCutFee;   // 목형칼
    

const estimateWithMargin = Math.ceil(estimate * 1.2);
const unitPriceWithMargin = Math.ceil(estimateWithMargin / actualQty);

if (actualQty < 500) {
  return (
    <div className="estimate-box">
      <p className="main-estimate">
        {estimateWithMargin.toLocaleString()}원부터~
      </p>
      <p className="estimate-unit">
        개당 금액: {unitPriceWithMargin.toLocaleString()}원
      </p>
    </div>
  );
}

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

