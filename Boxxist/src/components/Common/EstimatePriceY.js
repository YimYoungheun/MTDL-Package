import React from 'react';
import { paperPrices } from '../../data/paperPrices';

function getDogaSize(width, length, height, thickness, cover) {
  const w = Number(width);
  const l = Number(length);
  const h = Number(height);
  const t = Number(thickness);

  const extra = 15 + 2.5;
  const flap = (h + t + h + extra) * 2;

  let dogaWidth = w + flap;
  const dogaHeight = l + flap;

  if (cover === '있음') {
    dogaWidth *= 2;
  }

  return { dogaWidth, dogaHeight };
}


function getPerSheetCount(dogaWidth, dogaHeight) {
  const SHEET_W = 1081;  // 1091 - 10
  const SHEET_H = 768;  // 788 - 20
  const countW = Math.floor(SHEET_W / dogaWidth);
  const countH = Math.floor(SHEET_H / dogaHeight);
  return countW > 0 && countH > 0 ? countW * countH : 0;
}

function getUnitPrice(paperFeel, paperType, paperWeight, color) {
  if (paperFeel === '매끄러운') {
    if (paperPrices['매끄러운'][paperType] && paperPrices['매끄러운'][paperType][paperWeight]) {
      const totalPrice = paperPrices['매끄러운'][paperType][paperWeight];
      return Math.ceil(totalPrice / 500);  // <--- 도면 수량 나누지 말 것!
    }
  }
  if (paperFeel === '러프한') {
    if (
      paperPrices['러프한'][paperType] &&
      paperPrices['러프한'][paperType][color] &&
      paperPrices['러프한'][paperType][color][paperWeight]
    ) {
      const totalPrice = paperPrices['러프한'][paperType][color][paperWeight];
      return Math.ceil(totalPrice / 500);
    }
  }
  return 0;
}

function getPrintFee(mainPrintColor, spotPrintColor, totalQty, perSheetCount, printNone, paperFeel) {
  if (printNone) return { plate: 0, print: 0 }; // 0으로 리셋

  // 도수 파싱
  const colorNum = mainPrintColor ? parseInt(mainPrintColor[0], 10) || 0 : 0;
  const spotNum = spotPrintColor ? parseInt(spotPrintColor.replace('별색 ', '').replace('도', ''), 10) || 0 : 0;
  const totalColor = colorNum + spotNum;

  // 인쇄비 도수별 단가(원색/별색 구분)
  let printFeeUnit = 0;
  if (colorNum > 0) {
    const mainPrintUnit = (paperFeel === '매끄러운') ? 20000 : 40000;
    printFeeUnit += mainPrintUnit * colorNum;
  }
  if (spotNum > 0) {
    const spotPrintUnit = (paperFeel === '매끄러운') ? 40000 : 80000;
    printFeeUnit += spotPrintUnit * spotNum;
  }
  if (totalColor === 1) printFeeUnit *= 2;

  // ★ 전지 수 계산 (perSheetCount: 전지 1장당 제품 수)
  const sheetCount = Math.ceil(Number(totalQty) / perSheetCount);
  // 250장 단위 반복 횟수 (최소 1)
  const repeat = Math.ceil(sheetCount / 250);

  // 최종 인쇄비: printFeeUnit × repeat
  const printFee = printFeeUnit * repeat;

  // ★ 도수 상관없이 판비 25,000원 × 전체 도수 (1회만!)
  const plateFee = totalColor * 25000;

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

function getThomsonFee(actualQty, perSheetCount) {
  const sheetCount = Math.ceil(actualQty / perSheetCount);
  if (sheetCount <= 250) return 70000;
  return sheetCount * 140;
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
  quantity, coatingType = '없음', foil = [], embossing = '', mainPrintColor = '', spotPrintColor = '', printNone = false, hasSilk = false,
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

  const actualQty = cover === '있음' ? totalQuantity * 2 : totalQuantity;
  const extraSheets = 50; // 전지 기준 여분 (진짜 종이 50장)
  const sheetCount = Math.ceil(totalQuantity / perSheetCount); // 실제 필요한 전지 수
  const totalOrderSheets = sheetCount + extraSheets; // 여분까지 합친 전지 수
  const paperTotal = unitPrice * totalOrderSheets; // 최종 종이비
  const { plate: printPlateFee, print: printRunFee } =
  getPrintFee(mainPrintColor, spotPrintColor, actualQty, perSheetCount, printNone, paperFeel);
  const coatingFee = getCoatingFee(coatingType, actualQty, perSheetCount);
  const thomsonFee = getThomsonFee(actualQty, perSheetCount);
  const { plate: foilPlate, fee: foilFee } = getFoilFee(foil, actualQty);
  const { plate: embossPlate, fee: embossFee } = getEmbossFee(embossing, actualQty);
  const dieCutFee = 150000;
  const silkBaseFee = hasSilk ? 200000 : 0;
  const silkPerSheetFee = hasSilk ? totalOrderSheets * 240 : 0;
  const silkFee = silkBaseFee + silkPerSheetFee;
  const estimate =
    paperTotal +
    printPlateFee +
    printRunFee +
    coatingFee +
    thomsonFee +
    foilFee +
    embossFee +
    silkFee +
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

export default EstimatePriceY;

