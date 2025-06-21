import React from 'react';
import { PosterPaperPrice } from '../../data/PosterPaperPrice';

// 도면 사이즈 계산 (명함과 동일 bleed 2mm 적용)
function getPosterDogaSize(width, height) {
  const bleed = 2;
  return {
    dogaWidth: Number(width) + bleed * 2,
    dogaHeight: Number(height) + bleed * 2,
  };
}

// 전지당 생산수 계산
function getPerSheetCount(dogaWidth, dogaHeight) {
  const SHEET_W = 768;
  const SHEET_H = 1081;
  const countW = Math.floor(SHEET_W / dogaWidth);
  const countH = Math.floor(SHEET_H / dogaHeight);
  return countW > 0 && countH > 0 ? countW * countH : 0;
}

// 코팅비 계산
function getCoatingFee(coating = '없음', totalQty = 500) {
  if (!coating || coating === '없음') return 0;
  if (coating === '무광' || coating === '유광') {
    return totalQty * 3;
  }
  return 0;
}

// === 포스터 견적 컴포넌트 ===
const EstimatePricePoster = ({
  width,
  height,
  paperType = '',
  paperWeight = '',
  printType = '단면',
  coating = '없음',
  quantity = 0,
}) => {

  if (!width || !height || !paperType || !paperWeight || !quantity) {
    return (
      <div className="estimate-box">
        <span className="estimate-unit" style={{ color: 'gray' }}>
          모든 정보를 입력하면 예상 견적이 나옵니다.
        </span>
      </div>
    );
  }

  // 도면 및 전지당 생산수
  const doga = getPosterDogaSize(width, height);
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

  // 종이 단가 계산
  let unitPaperPrice = 0;
  if (PosterPaperPrice[paperType] && PosterPaperPrice[paperType][paperWeight]) {
    const totalPrice = PosterPaperPrice[paperType][paperWeight];
    const paperPerR = Math.ceil(totalPrice / 500);
    unitPaperPrice = Math.ceil(paperPerR / perSheetCount);
  }

  if (!unitPaperPrice) {
    return (
      <div className="estimate-box">
        <span className="estimate-unit" style={{ color: 'crimson' }}>
          종이 종류/평량을 다시 선택해 주세요.
        </span>
      </div>
    );
  }

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

  // 인쇄비 + 판비
  const printBase = (printType === '양면') ? 160000 : 80000;
  const plateFee = 200000;  // 단면, 양면 모두 동일
  const totalPrintFee = printBase + plateFee;
  const printPerR = Math.ceil(totalPrintFee / 500);
  const unitPrintPrice = Math.ceil(printPerR / perSheetCount);

  // 코팅비
  const coatingFee = getCoatingFee(coating, totalQuantity);

  // 재단비
  const cuttingFee = 1;

  // 총 견적 계산
  const unitTotal = unitPaperPrice + unitPrintPrice + cuttingFee;
  const estimate = (unitTotal * totalQuantity) + coatingFee;

  // 마진 20%
  const estimateWithMargin = Math.ceil(estimate * 1.15);
  const unitPriceWithMargin = Math.ceil(estimateWithMargin / totalQuantity);

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

export default EstimatePricePoster;
