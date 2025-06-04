import React from 'react';

function ceil(num) {
  return Math.ceil(num);
}

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

const SHEET_WIDTH = 1081;
const SHEET_HEIGHT = 768;

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
  return { dogaWidth, dogaHeight };
}

function getPerSheetCount(dogaWidth, dogaHeight) {
  if (!dogaWidth || !dogaHeight) return 0;
  const row = Math.floor(SHEET_WIDTH / dogaWidth);
  const col = Math.floor(SHEET_HEIGHT / dogaHeight);
  return row * col;
}

function getUnitPrice(paperFeel, paperType, paperWeight, color, perSheetCount) {
  let paperPrice;
  if (paperFeel === '매끄러운') {
    paperPrice = paperPrices['매끄러운']?.[paperType]?.[paperWeight];
  } else if (paperFeel === '러프한') {
    if (color) {
      paperPrice = paperPrices['러프한']?.[paperType]?.[color]?.[paperWeight];
    } else {
      paperPrice = paperPrices['러프한']?.[paperType]?.[paperWeight];
    }
  } else if (paperFeel === '친환경') {
    paperPrice = paperPrices['친환경']?.[paperType]?.[paperWeight];
  }
  if (!paperPrice || !perSheetCount) return null;
  const pricePerSheet = ceil(paperPrice / 500);
  const unitPrice = ceil(pricePerSheet / perSheetCount);
  return unitPrice;
}

// 🔵 인쇄비 계산
function getPrintFee(mainPrintColor, spotPrintColor, totalQty, perSheetCount, printNone) {
  if (printNone) return { plate: 0, print: 0 };

  // '1도', '별색 2도' 등에서 숫자 추출
  const getDoNum = str =>
    str && str.match(/\d+/) ? parseInt(str.match(/\d+/)[0], 10) : 0;

  const normalDo = getDoNum(mainPrintColor);    // 1~4
  const spotDo = getDoNum(spotPrintColor);      // 1~4
  const plateFee = (normalDo + spotDo) * 25000;
  const sheetCount = Math.ceil(totalQty / perSheetCount);

  // 일반 인쇄비
  let normalPrintFee = 0;
  if (normalDo) {
    const printUnit = 20000 * normalDo; // 1도: 20000, 2도: 40000, ...
    normalPrintFee = Math.ceil(sheetCount / 250) * printUnit;
  }
  // 별색 인쇄비
  let spotPrintFee = 0;
  if (spotDo) {
    spotPrintFee = spotDo * Math.ceil(sheetCount / 250) * 25000;
  }

  return {
    plate: plateFee,
    print: normalPrintFee + spotPrintFee
  };
}

function getCoatingFee(coatingType, totalQty, perSheetCount) {
  if (!coatingType || coatingType === '없음') return 0;
  const sheets = ceil(totalQty / perSheetCount);
  let fee = 0;
  if (sheets <= 250) {
    fee = 100000;
  } else {
    fee = sheets * 400;
  }
  if (coatingType === '벨벳') {
    fee *= 2;
  }
  return fee;
}

function getThomsonFee(totalQty, perSheetCount) {
  const sheets = ceil(totalQty / perSheetCount);
  if (sheets <= 250) {
    return 70000;
  } else {
    return sheets * 280;
  }
}

// 박비 (120,000원/480원, 선택 개수만큼)
function getFoilFee(foil, totalQty, perSheetCount) {
  const selected = Array.isArray(foil) ? foil.filter(f => f !== '없음') : [];
  if (selected.length === 0) return 0;
  const count = selected.length;
  const sheets = ceil(totalQty / perSheetCount);
  let fee = 120000 * count;
  if (sheets <= 250) {
    fee += 120000 * count;
  } else {
    fee += sheets * 480 * count;
  }
  return fee;
}

// 형압비
function getEmbossFee(embossing, totalQty, perSheetCount) {
  if (!embossing || embossing === '없음') return 0;
  const sheets = ceil(totalQty / perSheetCount);
  let fee = 100000;
  if (sheets <= 250) {
    fee += 100000;
  } else {
    fee += sheets * 400;
  }
  return fee;
}

// 접착비
function getBondingFee(bottomStyle, totalQty) {
  let baseUnit, perUnit;
  if (bottomStyle === '삼면접착') {
    perUnit = 20;
    baseUnit = Math.floor(70000 / 20);
  } else {
    perUnit = 15;
    baseUnit = Math.floor(70000 / 15);
  }
  if (totalQty <= baseUnit) {
    return 70000;
  } else {
    return totalQty * perUnit;
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

  // 인쇄비(판비/인쇄비)
  const { plate: printPlateFee, print: printRunFee } =
    getPrintFee(mainPrintColor, spotPrintColor, totalQuantity, perSheetCount, printNone);

  const diecutFee = 180000; // 목형칼비
  const coatingFee = getCoatingFee(coatingType, totalQuantity, perSheetCount);
  const thomsonFee = getThomsonFee(totalQuantity, perSheetCount);
  const foilFee = getFoilFee(foil, totalQuantity, perSheetCount);
  const embossFee = getEmbossFee(embossing, totalQuantity, perSheetCount);
  const bondingFee = getBondingFee(bottomStyle, totalQuantity);

  const estimate =
    unitPrice * totalQuantity +
    diecutFee +
    printPlateFee +
    printRunFee +
    coatingFee +
    thomsonFee +
    foilFee +
    embossFee +
    bondingFee;

  const estimateWithMargin = Math.ceil(estimate * 1.15);

  // 목형칼비 제외 견적(마진포함)
  const estimateExceptDiecut = estimate - diecutFee;
  const estimateExceptDiecutWithMargin = Math.ceil(estimateExceptDiecut * 1.15);

  // 개당금액 (원 단위, 올림)
  const unitPriceWithMargin = Math.ceil(estimateExceptDiecutWithMargin / totalQuantity);

  return (
    <div style={{ margin: '1rem 0' }}>
      {totalQuantity < 500 ? (
        <span style={{
          color: 'crimson',
          fontSize: '0.9rem',
          fontWeight: 'normal',
          display: 'block',
          marginTop: '0.3rem'
        }}>
          최소 수량은 500개 이상입니다
        </span>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default EstimatePrice;
