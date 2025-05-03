// App.js (최종버전)
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
  const [showUpload, setShowUpload] = useState(false);
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

  const handleBottomStyleSelect = (opt) => {
    setBottomStyle(opt);
    setShowUpload(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ marginLeft: 'auto', width: '360px' }}>
        <h2>B형 단상자</h2>

        <div style={{ marginBottom: '1rem' }}>
          <label>회사명 또는 성함</label>
          <input
            type="text"
            placeholder=""
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            style={{ width: '90%', padding: '0.5rem', borderRadius: '6px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>연락처</label>
          <input
            type="text"
            placeholder=""
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '90%', padding: '0.5rem', borderRadius: '6px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>제품명</label>
          <input
            type="text"
            placeholder=""
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            style={{ width: '90%', padding: '0.5rem', borderRadius: '6px' }}
          />
        </div>

        {/* 나머지 선택 UI 생략... (기존과 동일하게 유지) */}

        {weight && (
          <div style={{ marginBottom: '1rem' }}>
            <label>하단 모양 선택</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {bottomOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleBottomStyleSelect(opt)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    background: bottomStyle === opt ? 'black' : '#f9f9f9',
                    color: bottomStyle === opt ? 'white' : 'black',
                    cursor: 'pointer',
                    borderRadius: '6px',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {showUpload && !confirmed && (
          <div>
            <a
              href="https://mtdl.co.kr/fileupload"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: 'white',
                color: 'black',
                border: '1px solid black',
                borderRadius: '6px',
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              도면 및 디자인 파일 업로드
            </a>
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

        {confirmed && <p style={{ marginTop: '1rem' }}>감사합니다. 접수가 완료되었습니다.</p>}
      </div>
    </div>
  );
}

export default App;
