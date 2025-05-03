// App.js (업데이트: 변수명 오류 수정 및 자동입력 필드명 영문 대응)
import React, { useState, useEffect } from 'react';

function App() {
  const [paperFeel, setPaperFeel] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [bottomStyle, setBottomStyle] = useState('');

  const [company, setCompany] = useState('');
  const [product, setProduct] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const iframe = document.getElementById('confirm-frame');
    if (iframe && iframe.contentWindow) {
      const doc = iframe.contentWindow.document;
      if (doc) {
        const trySet = (name, value) => {
          const el = doc.querySelector(`input[name="${name}"]`);
          if (el) el.value = value;
        };
        trySet('company', company);
        trySet('phone', phone);
        trySet('product', product);
        trySet('paperFeel', paperFeel);
        trySet('material', material);
        trySet('color', color);
        trySet('weight', weight);
        trySet('bottomStyle', bottomStyle);
      }
    }
  }, [company, phone, product, paperFeel, material, color, weight, bottomStyle]);

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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ marginLeft: 'auto', width: '360px' }}>
        {/* ... 생략된 UI 요소들 ... */}

        {weight && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>하단 모양 선택</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {bottomOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setBottomStyle(opt)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      background: bottomStyle === opt ? 'black' : '#f0f0f0',
                      color: bottomStyle === opt ? 'white' : 'black',
                      border: '1px solid #ccc',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <iframe
              src="https://mtdl.co.kr/fileupload"
              width="100%"
              height="300"
              style={{ border: '1px solid #ccc', borderRadius: '12px', marginBottom: '1rem' }}
              title="파일 업로드"
            />
          </>
        )}

        {/* 숨김 처리된 확인 폼 */}
        <iframe
          id="confirm-frame"
          src="https://mtdl.co.kr/confirm"
          width="0"
          height="0"
          style={{ display: 'none' }}
          title="주문 확인 폼"
        />
      </div>
    </div>
  );
}

export default App;
