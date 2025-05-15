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
  const getEstimatedPrice = () => {
    if (!paperFeel || !material || !weight) return null;
    const weightValue = weight;
    if (paperFeel === '러프한' && color) {
      return paperPrices[paperFeel]?.[material]?.[color]?.[weightValue] || null;
    } else {
      return paperPrices[paperFeel]?.[material]?.[weightValue] || null;
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

  const getColorOptions = () => paperFeel === '러프한' ? colorMap[material] || [] : [];
  const getWeightOptions = () => {
    if (paperFeel === '매끄러운' || paperFeel === '친환경') return weightMap[paperFeel]?.[material] || [];
    if (paperFeel === '러프한' && color) return weightMap['러프한']?.[material]?.[color] || [];
    return [];
  };

  return (
    <div>코드 전체 렌더링</div>
  );
}

export default App;
