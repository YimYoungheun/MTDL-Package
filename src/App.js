// App.js (최종 완성본 – 아임웹 confirm 입력폼 연동)
import React, { useState } from 'react';

function App() {
  const [paperFeel, setPaperFeel] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [bottomStyle, setBottomStyle] = useState('');

  const [company, setCompany] = useState('');
  const [product, setProduct] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const materialOptions = {
    매끄러운: ['AB', 'CCP', 'SC마닐라', '아이보리'],
    러프한: ['아코팩', '올드밀', '녹차지', '매직패브릭'],
    친환경: ['얼스팩', '크라프트'],
  };

  const colorOptions = {
    아코팩: ['웜 화이트', '네츄럴', '엑스트라 화이트'],
    올드밀: ['비앙코', '엑스트라 화이트', '프리미엄 화이트'],
    녹차지: ['백색'],
    매직패브릭: ['검정색', '진곤색', '피색', '진한밤색', '체리색', '클래식블랙'],
  };

  const weightOptions = {
    매끄러운: {
      AB: ['300g', '350g'],
      CCP: ['300g', '350g'],
      SC마닐라: ['300g', '350g'],
      아이보리: ['300g', '350g'],
    },
    친환경: {
      얼스팩: ['295g'],
      크라프트: ['300g', '337g'],
    },
    러프한: {
      아코팩: {
        '웜 화이트': ['300g', '350g', '400g'],
        네츄럴: ['300g', '350g', '400g'],
        '엑스트라 화이트': ['410g'],
      },
      올드밀: {
        비앙코: ['300g', '350g'],
        '엑스트라 화이트': ['300g', '350g'],
        '프리미엄 화이트': ['410g'],
      },
      녹차지: {
        백색: ['300g', '350g'],
      },
      매직패브릭: {
        검정색: ['300g', '350g', '400g'],
        진곤색: ['300g', '350g', '400g'],
        피색: ['300g', '350g', '400g'],
        진한밤색: ['300g', '350g', '400g'],
        체리색: ['300g', '350g', '400g'],
        클래식블랙: ['300g', '350g', '400g'],
      },
    },
  };

  const bottomOptions = ['맞뚜껑', '십자다루마', '삼면접착'];

  const showWeightOptions = () => {
    if (paperFeel === '매끄러운' && material) return weightOptions.매끄러운[material] || [];
    if (paperFeel === '친환경' && material) return weightOptions.친환경[material] || [];
    if (paperFeel === '러프한' && material && color) return weightOptions.러프한[material]?.[color] || [];
    return [];
  };

  const formUrl = `https://mtdl.co.kr/confirm?회사명=${encodeURIComponent(company)}&연락처=${encodeURIComponent(phone)}&제품명=${encodeURIComponent(product)}&종이느낌=${encodeURIComponent(paperFeel)}&재질=${encodeURIComponent(material)}&색상=${encodeURIComponent(color)}&용지무게=${encodeURIComponent(weight)}&하단모양=${encodeURIComponent(bottomStyle)}`;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ marginLeft: 'auto', width: '360px' }}>
        <h2>B형 단상자</h2>

        <div style={{ marginBottom: '1rem' }}>
          <label>회사명 또는 성함</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            style={{ width: '90%', padding: '0.5rem', borderRadius: '6px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>연락처</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '90%', padding: '0.5rem', borderRadius: '6px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>제품명</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            style={{ width: '90%', padding: '0.5rem', borderRadius: '6px' }}
          />
        </div>

        {/* 종이 느낌 ~ 하단 모양 선택 UI (생략 없이 그대로 유지) */}
        {/* weight, bottomStyle 선택까지 완료되었을 때 아래 iframe 표시 */}

        {weight && bottomStyle && (
          <div>
            <p style={{ marginTop: '1rem' }}>기재해주신 연락처로 담당자가 연락할 수 있습니다.</p>
            <button
              onClick={() => setConfirmed(true)}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'black',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              확인
            </button>
          </div>
        )}

        {confirmed && (
          <iframe
            src={formUrl}
            width="100%"
            height="800"
            style={{
              border: '1px solid #ccc',
              borderRadius: '12px',
              marginTop: '1rem',
            }}
            title="주문 확인 폼"
          />
        )}
      </div>
    </div>
  );
}

export default App;
