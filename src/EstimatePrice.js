import React from 'react';

function ceil(num) {
  return Math.ceil(num);
}

// ... [생략: paperPrices 등 기존 정의 동일]

function getPrintFee(mainPrintColor, spotPrintColor, totalQty, perSheetCount, printNone) {
  if (printNone) return { plate: 0, print: 0 };
  let plateFee = 0;
  let printFee = 0;
  const sheetCount = Math.ceil(totalQty / perSheetCount);

  // 1도~4도 그룹
  if (mainPrintColor) {
    const n = parseInt(mainPrintColor[0], 10); // '1도' → 1, '2도' → 2 등
    if (!isNaN(n)) {
      plateFee += n * 25000;
      printFee += n * (sheetCount <= 250 ? 20000 : Math.ceil(sheetCount / 250) * 20000);
    }
  }
  // 별색 1도~4도 그룹
  if (spotPrintColor) {
    const n = parseInt(spotPrintColor.replace('별색 ', '').replace('도', ''), 10);
    if (!isNaN(n)) {
      plateFee += n * 25000;
      printFee += n * (sheetCount <= 250 ? 25000 : Math.ceil(sheetCount / 250) * 25000);
    }
  }
  return { plate: plateFee, print: printFee };
}

// ... [코팅, 톰슨, 박, 형압, 접착 등 동일]

// 본문
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

  // 🔥 여기서 printNone이 정확하게 전달되어야 함
  const { plate: printPlateFee, print: printRunFee } =
    getPrintFee(mainPrintColor, spotPrintColor, totalQuantity, perSheetCount, printNone);

  const diecutFee = 180000;
  const coatingFee = getCoatingFee(coatingType, totalQuantity, perSheetCount);
  const thomsonFee = getThomsonFee(totalQuantity, perSheetCount);
  const foilFee = getFoilFee(foil, totalQuantity, perSheetCount);
  const embossFee = getEmbossFee(embossing, totalQuantity, perSheetCount);
  const bondingFee = getBondingFee(bottomStyle, totalQuantity);

  const estimate =
    unitPrice * totalQuantity +
    diecutFee +
    printPlateFee +   // 반드시 인쇄판비가 포함!
    printRunFee +     // 반드시 인쇄비가 포함!
    coatingFee +
    thomsonFee +
    foilFee +
    embossFee +
    bondingFee;

  const estimateWithMargin = Math.ceil(estimate * 1.15);
  const estimateExceptDiecut = estimate - diecutFee;
  const estimateExceptDiecutWithMargin = Math.ceil(estimateExceptDiecut * 1.15);
  const unitPriceWithMargin = Math.ceil(estimateExceptDiecutWithMargin / totalQuantity);

  return (
    <div style={{ margin: '1rem 0' }}>
      <span style={{
        color: '#338cd9',
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
