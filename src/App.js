import { useState } from 'react';

function App() {
  const [selectedTexture, setSelectedTexture] = useState('매끄러운');

  const textureOptions = {
    매끄러운: ['AB', 'CCP', 'SC마닐라', '아이보리'],
    러프한: ['아코팩', '올드밀', '녹차지', '매직패브릭'],
    친환경: ['얼스팩', '크라프트'],
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      {/* 오른쪽 입력 영역 */}
      <div style={{ marginLeft: 'auto', width: '480px' }}>
        <h2>B형 단상자</h2>

        {/* 회사명 */}
        <div style={{ marginBottom: '1rem' }}>
          <label>회사명 또는 성함</label>
          <input
            type="text"
            placeholder="회사 이름을 입력해주세요"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {/* 제품명 */}
        <div style={{ marginBottom: '1rem' }}>
          <label>제품명</label>
          <input
            type="text"
            placeholder="재발주시 제품명을 사용합니다"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {/* 사이즈 */}
        <div style={{ marginBottom: '1rem' }}>
          <label>사이즈 (단위: mm)</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {['가로', '세로', '높이'].map((label, index) => (
              <input
                key={index}
                type="number"
                placeholder={label}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  width: '70px',
                  MozAppearance: 'textfield',
                }}
                onWheel={(e) => e.target.blur()}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* 종이 느낌 */}
        <div style={{ marginBottom: '1rem' }}>
          <label>종이 느낌</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {['매끄러운', '러프한', '친환경'].map((label, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedTexture(label)}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  background: selectedTexture === label ? '#333' : '#f9f9f9',
                  color: selectedTexture === label ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 재질 선택 */}
        {selectedTexture && (
          <div style={{ marginBottom: '1rem' }}>
            <label>재질 선택</label>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '0.5rem',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
              }}
            >
              {textureOptions[selectedTexture].map((material, index) => (
                <button
                  key={index}
                  type="button"
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    background: '#f5f5f5',
                    cursor: 'pointer',
                    flex: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {material}
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
