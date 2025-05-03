// App.js - 완성된 입력 UI 포함
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
      <div style={{ width: '360px' }}>
        <h2>B형 단상자</h2>

        {[{
          label: '회사명', value: company, setter: setCompany, placeholder: '회사명을 입력하세요'
        }, {
          label: '연락처', value: phone, setter: setPhone, placeholder: ''
        }, {
          label: '제품명', value: product, setter: setProduct, placeholder: '재발주시 제품명을 사용합니다'
        }].map((item, i) => (
          <div style={{ marginBottom: '1rem' }} key={i}>
            <label>{item.label}</label>
            <input
              type="text"
              value={item.value}
              onChange={(e) => item.setter(e.target.value)}
              placeholder={item.placeholder}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px' }}
            />
          </div>
        ))}

        <div style={{ marginBottom: '1rem' }}>
          <label>종이 느낌</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {['매끄러운', '러프한', '친환경'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setPaperFeel(type);
                  setMaterial(''); setColor(''); setWeight(''); setBottomStyle('');
                }}
                style={{ flex: 1, padding: '0.5rem', background: paperFeel === type ? 'black' : '#f0f0f0', color: paperFeel === type ? 'white' : 'black', border: '1px solid #ccc', borderRadius: '6px' }}
              >{type}</button>
            ))}
          </div>
        </div>

        {paperFeel && (
          <div style={{ marginBottom: '1rem' }}>
            <label>재질 선택</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {materialOptions[paperFeel].map((mat) => (
                <button
                  key={mat}
                  onClick={() => {
                    setMaterial(mat); setColor(''); setWeight(''); setBottomStyle('');
                  }}
                  style={{ padding: '0.5rem', background: material === mat ? 'black' : '#f0f0f0', color: material === mat ? 'white' : 'black', border: '1px solid #ccc', borderRadius: '6px' }}
                >{mat}</button>
              ))}
            </div>
          </div>
        )}

        {paperFeel === '러프한' && material && colorOptions[material] && (
          <div style={{ marginBottom: '1rem' }}>
            <label>색상 선택</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {colorOptions[material].map((c) => (
                <button
                  key={c}
                  onClick={() => { setColor(c); setWeight(''); setBottomStyle(''); }}
                  style={{ padding: '0.5rem', background: color === c ? 'black' : '#f0f0f0', color: color === c ? 'white' : 'black', border: '1px solid #ccc', borderRadius: '6px' }}
                >{c}</button>
              ))}
            </div>
          </div>
        )}

        {showWeightOptions().length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <label>용지 무게 선택</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {showWeightOptions().map((w) => (
                <button
                  key={w}
                  onClick={() => { setWeight(w); setBottomStyle(''); }}
                  style={{ padding: '0.5rem', background: weight === w ? 'black' : '#f0f0f0', color: weight === w ? 'white' : 'black', border: '1px solid #ccc', borderRadius: '6px' }}
                >{w}</button>
              ))}
            </div>
          </div>
        )}

        {weight && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>하단 모양 선택</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {bottomOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setBottomStyle(opt)}
                    style={{ flex: 1, padding: '0.5rem', background: bottomStyle === opt ? 'black' : '#f0f0f0', color: bottomStyle === opt ? 'white' : 'black', border: '1px solid #ccc', borderRadius: '6px' }}
                  >{opt}</button>
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

            <p>기재해주신 연락처로 담당자가 연락할 수 있습니다.</p>
            <button
              style={{ background: 'black', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
              onClick={() => alert('확인되었습니다.')}
            >확인</button>
          </>
        )}

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
