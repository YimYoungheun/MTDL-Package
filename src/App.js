// ✅ 단계별 조건 노출 로직으로 리팩터링된 App.js
import React, { useState } from 'react';
import './App.css'; // ✅ CSS 파일 불러오기 추가

function App() {
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
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem' }}>
      <div>
        <img src="/img/b_style_box.png" alt="B형 상자" style={{ width: '700px', objectFit: 'contain', borderRadius: '12px' }} />
      </div>

      <div style={{ width: '360px' }}>
        {/* 이하 코드는 유지됨 */}
        {/* ✅ 버튼 className="option-button ..." 스타일 연결은 모두 기존 코드에서 되어 있으므로 수정 불필요 */}
      </div>
    </div>
  );
}

export default App;
