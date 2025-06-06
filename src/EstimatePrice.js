import React from 'react';
import { paperPrices } from './data/paperPrices';

function getDogaSize(width, length, height, bottomStyle) {
  const dogaWidth = Number(width) + Number(height) + 30;
  const dogaHeight = Number(length) + Number(height) + 20;
  return { dogaWidth, dogaHeight };
}
function getPerSheetCount(dogaWidth, dogaHeight) {
  const SHEET_W = 1091, SHEET_H = 788;
  const countW = Math.floor(SHEET_W / dogaWidth);
  const countH = Math.floor(SHEET_H / dogaHeight);
  return countW > 0 && countH > 0 ? countW * countH : 0;
}
function getUnitPrice(paperFeel, paperType, paperWeight, color, perSheetCount) {
  if (paperFeel === '매끄러운') {
    if (paperPrices['매끄러운'][paperType] && paperPrices['매끄러운'][paperType][paperWeight]) {
      const totalPrice = paperPrices['매끄러운'][paperType][paperWeight];
      return Math.ceil(totalPrice / 500 / perSheetCount);
    }
  }
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
  return 0;
}
function getPrintFee(mainPrintColor, spotPrintColor, totalQty, perSheetCount, printNone) {
  if (printNone) return { plate: 0, print: 0 };
  let plateFee = 0;
  let printFee = 0;
  const colorNum = mainPrintColor ? parseInt(mainPrintColor[0], 10) || 0 : 0;
  const spotNum = spotPrintColor ? parseInt(spotPrintColor.replace('별색 ', '').replace('도', ''), 10) || 0 : 0;
  const totalColor = colorNum + spotNum;
  const sheetCount = Math.ceil(totalQty / perSheetCount);
  plateFee = totalColor * 25000;
  if (totalColor > 0) {
    if (sheetCount <= 250) {
      printFee = totalColor * 80000;
    } else {
      printFee = totalColor * (Math.ceil(sheetCount / 250) * 80000);
    }
  }
  return { plate: plateFee, print: printFee };
}
function getCoatingFee(coatingType, totalQty, perSheetCount) {
  if (!coatingType || coatingType === '없음') return 0;
  const sheetCount = Math.ceil(totalQty / perSheetCount);
  if (coatingType === '벨벳') {
    if (sheetCount <= 250) return 200000;
    return sheetCount * 800;
  }
  if (sheetCount <= 250) return 100000;
  return sheetCount * 400;
}
function getThomsonFee(totalQty, perSheetCount) {
  const sheetCount = Math.ceil(totalQty / perSheetCount);
  if (sheetCount <= 250) return 70000;
  return sheetCount * 280;
}
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
function getEmbossFee(embossing, totalQty, perSheetCount) {
  if (!embossing || embossing === '없음') return 0;
  const sheetCount = Math.ceil(totalQty / perSheetCount);
  if (sheetCount <= 250) return 100000;
  return sheetCount * 400;
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
  quantity, coatingType = '없음', foil = [], embossing = '', mainPrintColor = '', spotPrintColor = '', printNone = false,
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
  const totalQuantity = parseInt(quantity);
  if (totalQuantity < 500) {
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
  const { plate: printPlateFee, print: printRunFee } =
    getPrintFee(mainPrintColor, spotPrintColor, totalQuantity, perSheetCount, printNone);
  const coatingFee = getCoatingFee(coatingType, totalQuantity, perSheetCount);
  const thomsonFee = getThomsonFee(totalQuantity, perSheetCount);
  const foilFee = getFoilFee(foil, totalQuantity, perSheetCount);
  const embossFee = getEmbossFee(embossing, totalQuantity, perSheetCount);
  const bondingFee = getBondingFee(bottomStyle, totalQuantity);

  const paperTotal = unitPrice * totalQuantity;
  const estimate =
    paperTotal +
    printPlateFee +
    printRunFee +
    coatingFee +
    thomsonFee +
    foilFee +
    embossFee +
    bondingFee;

  const estimateWithMargin = Math.ceil(estimate * 1.15);
  const unitPriceWithMargin = Math.ceil(estimateWithMargin / totalQuantity);

  return (
    <div className="estimate-box">
      <span className="estimate-price">
        예상 견적: {estimateWithMargin.toLocaleString()}원
      </span>
      <br />
      <span className="estimate-unit">
        개당 금액: {unitPriceWithMargin.toLocaleString()}원
      </span>
    </div>
  );
};

export default EstimatePrice;
