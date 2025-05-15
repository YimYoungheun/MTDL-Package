// App.js (전체 UI 포함, 이미지 700px, 입력칸 조정)
import React, { useState } from 'react';
import './App.css';

function App() {
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
          '프리미엄 화이트': { '300g': 695000, '350g': 810000 }
        },
        아코팩: {
          '웜 화이트': { '300g': 435000, '350g': 510000, '400g': 595000 },
          '네츄럴': { '300g': 435000, '350g': 510000 }
        },
        녹차지: {
          백색: { '300g': 400000, '350g': 430000 }
        }
      }
    };

  const [paperFeel, setPaperFeel] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [bottomStyle, setBottomStyle] = useState('');
  const [company, setCompany] = useState('');
  const [product, setProduct] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [quantity, setQuantity] = useState('');
  const [customQuantity, setCustomQuantity] = useState('');
  const [coating, setCoating] = useState(null);
  const [embossing, setEmbossing] = useState(null);
  const [foil, setFoil] = useState([]);
  const inputStyle = { width: '360px', padding: '0.5rem' };
  const shortInputStyle = { width: '90px', padding: '0.5rem' };

  const materialMap = {
    '매끄러운': ['AB', 'CCP', '아이보리', 'SC 마닐라'],
    '러프한': ['올드밀', '아코팩', '매직패브릭', '녹차지'],
    '친환경': ['얼스팩', '크라프트']
  };

  const colorMap = {
    아코팩: ['웜 화이트', '네츄럴', '엑스트라 화이트'],
    올드밀: ['비앙코', '엑스트라 화이트', '프리미엄 화이트'],
    녹차지: ['백색'],
    매직패브릭: ['검정색', '진곤색', '피색', '진한밤색', '체리색', '클래식블랙']
  };

  const weightMap = {
    '매끄러운': {
      AB: ['300g', '350g'],
      CCP: ['300g', '350g'],
      'SC 마닐라': ['300g', '350g'],
      아이보리: ['300g', '350g']
    },
    '친환경': {
      얼스팩: ['295g'],
      크라프트: ['300g', '337g']
    },
    '러프한': {
      아코팩: {
        '웜 화이트': ['300g', '350g', '400g'],
        '네츄럴': ['300g', '350g', '400g'],
        '엑스트라 화이트': ['410g']
      },
      올드밀: {
        '비앙코': ['300g', '350g'],
        '엑스트라 화이트': ['300g', '350g'],
        '프리미엄 화이트': ['410g']
      },
      녹차지: {
        백색: ['300g', '350g']
      },
      매직패브릭: {
        검정색: ['300g', '350g', '400g'],
        진곤색: ['300g', '350g', '400g'],
        피색: ['300g', '350g', '400g'],
        진한밤색: ['300g', '350g', '400g'],
        체리색: ['300g', '350g', '400g'],
        클래식블랙: ['300g', '350g', '400g']
      }
    }
  };

  const getEstimatedPrice = () => {
    if (!paperFeel || !material || !weight) return null;
    const weightValue = weight;
    if (paperFeel === '러프한' && color) {
      return paperPrices[paperFeel]?.[material]?.[color]?.[weightValue] || null;
    } else {
      return paperPrices[paperFeel]?.[material]?.[weightValue] || null;
    }
  };

  const getColorOptions = () => paperFeel === '러프한' ? colorMap[material] || [] : [];
  const getWeightOptions = () => {
    if (paperFeel === '매끄러운' || paperFeel === '친환경') return weightMap[paperFeel]?.[material] || [];
    if (paperFeel === '러프한' && color) return weightMap['러프한']?.[material]?.[color] || [];
    return [];
  };

  const renderDogaInfo = () => {
    const w = parseInt(width);
    const l = parseInt(length);
    const h = parseInt(height);
    if (!w || !l || !h || !bottomStyle) return null;

    const dogaWidth = w * 2 + 16;
    let dogaHeight = 0;
    if (bottomStyle === '맞뚜껑') {
      dogaHeight = (h + 16) * 2 + l + 20;
    } else if (bottomStyle === '십자다루마' || bottomStyle === '삼면접착') {
      dogaHeight = h * 0.75 * 2 + l * 2 + h + 16 + 5 + 20;
    }

    const sheetSizes = [
      { name: '국4절', width: 318, height: 469 },
      { name: '4절', width: 394, height: 545 },
      { name: '국2절', width: 465, height: 636 },
      { name: '2절', width: 545, height: 788 },
      { name: '국전지', width: 636, height: 939 }
    ];

    const matched = sheetSizes.find(s => s.width >= dogaWidth && s.height >= dogaHeight);

    const canFitTwo = matched && (
      (dogaWidth * 2 <= matched.width && dogaHeight <= matched.height) ||
      (dogaWidth <= matched.width && dogaHeight * 2 <= matched.height) ||
      (dogaWidth * 2 <= matched.height && dogaHeight <= matched.width) ||
      (dogaWidth <= matched.height && dogaHeight * 2 <= matched.width)
    );

    return `전개도 크기: ${dogaWidth} × ${dogaHeight}mm / 추천 절지: ${matched ? matched.name : '해당 없음'} / 배치 가능 수량: ${canFitTwo ? '2개 이상 가능' : '1개만 가능'}`;
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>패키지 주문 UI</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>내경 입력</label><br />
        <input placeholder="가로(mm)" value={width} onChange={e => setWidth(e.target.value)} style={shortInputStyle} />
        <input placeholder="세로(mm)" value={length} onChange={e => setLength(e.target.value)} style={shortInputStyle} />
        <input placeholder="높이(mm)" value={height} onChange={e => setHeight(e.target.value)} style={shortInputStyle} />
      </div>

      {width && length && height && (
        <div style={{ marginBottom: '1rem' }}>
          <label>하단 모양</label><br />
          {['맞뚜껑', '십자다루마', '삼면접착'].map(opt => (
            <button key={opt} onClick={() => setBottomStyle(opt)} style={{ marginRight: '0.5rem' }}>
              {opt}
            </button>
          ))}
        </div>
      )}

      {bottomStyle && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
          {renderDogaInfo()}
        </div>
      )}
    </div>
  );
}

export default App;
