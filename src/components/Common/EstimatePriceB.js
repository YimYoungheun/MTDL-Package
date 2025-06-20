import React from 'react';
import { paperPrices } from '../../data/paperPrices';

function getDogaSize(width, length, height, bottomStyle) {
  // length = 세로, width = 가로
  const dogaWidth = Number(width) * 2 + Number(length) * 2 + 16 + 5;
  const dogaHeight = Number(length) * 0.75 + Number(height) + Number(length) + 16 + 5;
  return { dogaWidth, dogaHeight };
}

function getPerSheetCount(dogaWidth, dogaHeight) {
  // 도면 가로가 788mm 쪽, 세로가 1091mm 쪽에 배열됨
  const SHEET_W = 788 - 20;  // 실제 인쇄 전지의 짧은 변
  const SHEET_H = 1091 - 10; // 실제 인쇄 전지의 긴 변
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

function getThomsonFee(totalQty, perSheetCount) {
  const sheetCount = Math.ceil(totalQty / perSheetCount);
  if (sheetCount <= 250) return 70000;
  return sheetCount * 140;
}

function getFoilFee(foil, totalQty) {
  if (!foil || foil.length === 0) return { plate: 0, fee: 0 };
  const n = foil.length;
  // 동판비: 1개 15만원, 2개 22.5만원, 3개 30만원, 4개 37.5만원 ...
  const plate = 150000 * (1 + (n - 1) * 0.5);
  // 작업비: 수량 * 50원 * 개수
  const fee = totalQty * 50 * n;
  return { plate, fee };
}

function getEmbossFee(embossing, totalQty) {
  if (!embossing || embossing === '없음') return { plate: 0, fee: 0 };
  // plate: 동판비/필름값(무조건 한 번만 150,000원)
  const plate = 150000;
  const fee = totalQty * 50;
  return { plate, fee };
}

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

const EstimatePrice = ({
  width, length, height, bottomStyle,
  paperFeel = '매끄러운', paperType = 'AB', paperWeight = '300g', color = '',
  quantity, coatingType = '없음', foil = [], embossing = '', mainPrintColor = '', spotPrintColor = '', printNone = false, hasSilk = false,
}) => {
  if (!width || !length || !height || !bottomStyle || !quantity) {
    return <div className="estimate-box"><span className="estimate-unit" style={{color: 'gray'}}>모든 정보를 입력하면 예상 견적이 나옵니다.</span></div>;
  }
  const doga = getDogaSize(width, length, height, bottomStyle);
  if (!doga) return <div className="estimate-box"><span className="estimate-unit" style={{color: 'gray'}}>도면 계산이 불가능합니다.</span></div>;
  const perSheetCount = getPerSheetCount(doga.dogaWidth, doga.dogaHeight);
  if (perSheetCount < 1) {
    return <div className="estimate-box"><span className="estimate-unit" style={{color: 'crimson', fontWeight:'bold'}}>전지(1091×788)로 도면 제작 불가</span></div>;
  }
  const unitPrice = getUnitPrice(paperFeel, paperType, paperWeight, color, perSheetCount);
  if (!unitPrice) {
    return <div className="estimate-box"><span className="estimate-unit" style={{color: 'crimson'}}>종이 종류/두께를 다시 선택해 주세요.</span></div>;
  }
  const totalQuantity = parseInt(quantity, 10);
  if (!totalQuantity || isNaN(totalQuantity) || totalQuantity < 1) {
    return (
      <div className="estimate-box">
        <span className="estimate-unit" style={{color: 'crimson'}}>희망 수량을 정확히 입력해 주세요.</span>
      </div>
    );
  }

  // --------- 견적 계산은 무조건 여기서 한 번만! ---------
  const { plate: printPlateFee, print: printRunFee } =
    getPrintFee(mainPrintColor, spotPrintColor, totalQuantity, perSheetCount, printNone, paperFeel);
  const coatingFee = getCoatingFee(coatingType, totalQuantity, perSheetCount);
  const thomsonFee = getThomsonFee(totalQuantity, perSheetCount);
  const { plate: foilPlate, fee: foilFee } = getFoilFee(foil, totalQuantity);
  const { plate: embossPlate, fee: embossFee } = getEmbossFee(embossing, totalQuantity);
  const bondingFee = getBondingFee(bottomStyle, totalQuantity);
  const dieCutFee = 150000;
  const extraSheets = 50;
  const sheetCount = Math.ceil(totalQuantity / perSheetCount);
  const totalOrderSheets = sheetCount + extraSheets;
  const paperTotal = unitPrice * totalOrderSheets;
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
    foilPlate +
    embossPlate +
    dieCutFee +
    bondingFee +
    silkFee;

  const estimateWithMargin = Math.ceil(estimate * 1.2);
  const unitPriceWithMargin = Math.ceil(estimateWithMargin / totalQuantity);

  // --------- 견적 출력 분기 한 번만! ---------
  if (totalQuantity < 500) {
    return (
      <div className="estimate-box">
        <p style={{ color: "crimson", fontWeight: "bold", marginBottom: "1em" }}>
          최소 수량은 500개 이상부터입니다.
        </p>
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

export default EstimatePrice;
