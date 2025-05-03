import React, { useState } from 'react';

function App() {
  const [paperType, setPaperType] = useState('매끄러운');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');

  const paperOptions = {
    매끄러운: ['AB', 'CCP', 'SC마닐라', '아이보리'],
    러프한: ['아코팩', '올드밀', '녹차지', '매직패브릭'],
    친환경: ['얼스팩', '크라프트'],
  };

  const weightOptions = {
    AB: ['300g', '350g'],
    CCP: ['300g', '350g'],
    SC마닐라: ['300g', '350g'],
    아이보리: ['300g', '350g'],
    얼스팩: ['295g'],
    크라프트: ['300g', '337g'],
    '아코팩:웜 화이트': ['300g', '350g', '400g'],
    '아코팩:네츄럴': ['300g', '350g', '400g'],
    '아코팩:엑스트라 화이트': ['410g'],
    '올드밀:비앙코': ['300g', '350g'],
    '올드밀:엑스트라 화이트': ['300g', '350g'],
    '올드밀:프리미엄 화이트': ['300g', '350g'],
    '녹차지:백색': ['300g', '350g'],
    '매직패브릭:검정색': ['300g', '350g', '400g'],
    '매직패브릭:진곤색': ['300g', '350g', '400g'],
    '매직패브릭:피색': ['300g', '350g', '400g'],
    '매직패브릭:진한밤색': ['300g', '350g', '400g'],
    '매직패브릭:체리색': ['300g', '350g', '400g'],
    '매직패브릭:클래식블랙': ['300g', '350g', '400g'],
  };

  const colorOptions = {
    아코팩: ['웜 화이트', '네츄럴', '엑스트라 화이트'],
    올드밀: ['비앙코', '엑스트라 화이트', '프리미엄 화이트'],
    녹차지: ['백색'],
    매직패브릭: ['검정색', '진곤색', '피색', '진한밤색', '체리색', '클래식블랙'],
  };

  const selectedWeights = () => {
    if (paperType === '러프한') {
      const key = `${material}:${color}`;
      return weightOptions[key] || [];
    }
    return weightOptions[material] || [];
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ marginLeft: 'auto', width: '400px' }}>
        <h2>B형 단상자</h2>

        <div style={{ marginBottom: '1rem' }}>
          <label>회사명 또는 성함</label>
          <input type="text" placeholder="회사 이름을 입력해주세요" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>제품명</label>
          <input type="text" placeholder="재발주시 제품명을 사용합니다" style={{ width: '100%', padding: '0.5rem', borderRadius: '6px' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>사이즈 (단위: mm)</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {['가로', '세로', '높이'].map((label, index) => (
              <input
                key={index}
                type="number"
                placeholder={label}
                style={{ flex: 1, padding: '0.5rem', width: '70px', MozAppearance: 'textfield', borderRadius: '6px' }}
                onWheel={(e) => e.target.blur()}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
                }}
              />
            ))}
          </div>
        </div>

        {/* 종이 느낌 */}
        <div style={{ marginBottom: '1rem' }}>
          <label>종이 느낌</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {['매끄러운', '러프한', '친환경'].map((type) => (
              <button
                key={type}
                onClick={() => { setPaperType(type); setMaterial(''); setColor(''); }}
                style={{ flex: 1, padding: '0.5rem', border: '1px solid #ccc', background: paperType === type ? 'black' : '#f9f9f9', color: paperType === type ? 'white' : 'black', cursor: 'pointer', borderRadius: '6px' }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* 재질 선택 */}
        {paperOptions[paperType] && (
          <div style={{ marginBottom: '1rem' }}>
            <label>재질 선택</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              {paperOptions[paperType].map((mat) => (
                <button
                  key={mat}
                  onClick={() => { setMaterial(mat); setColor(''); }}
                  style={{ padding: '0.5rem', border: '1px solid #ccc', background: material === mat ? 'black' : '#f9f9f9', color: material === mat ? 'white' : 'black', cursor: 'pointer', borderRadius: '6px' }}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 색상 선택 (러프한만) */}
        {paperType === '러프한' && material && colorOptions[material] && (
          <div style={{ marginBottom: '1rem' }}>
            <label>색상 선택</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              {colorOptions[material].map((col) => (
                <button
                  key={col}
                  onClick={() => setColor(col)}
                  style={{ padding: '0.5rem', border: '1px solid #ccc', background: color === col ? 'black' : '#f9f9f9', color: color === col ? 'white' : 'black', cursor: 'pointer', borderRadius: '6px' }}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 무게 선택 */}
        {((paperType !== '러프한' && material) || (paperType === '러프한' && material && color)) && selectedWeights().length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <label>용지 무게 선택</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              {selectedWeights().map((w) => (
                <button
                  key={w}
                  style={{ padding: '0.5rem', border: '1px solid #ccc', borderRadius: '6px', background: '#f9f9f9', cursor: 'pointer' }}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
