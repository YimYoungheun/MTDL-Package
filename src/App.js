function App() {
  const [paperFeel, setPaperFeel] = React.useState('매끄러운');

  const materialOptions = {
    매끄러운: ['AB', 'CCP', 'SC마닐라', '아이보리'],
    러프한: ['아코팩', '올드밀', '녹차지', '매직패브릭'],
    친환경: ['얼스팩', '크라프트'],
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      {/* 오른쪽 입력 영역 */}
      <div style={{ marginLeft: 'auto', width: '400px' }}>
        <h2>B형 단상자</h2>

        {/* 회사명 */}
        <div style={{ marginBottom: '1rem' }}>
          <label>회사명 또는 성함</label>
          <input
            type="text"
            placeholder="회사 이름을 입력해주세요"
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* 제품명 */}
        <div style={{ marginBottom: '1rem' }}>
          <label>제품명</label>
          <input
            type="text"
            placeholder="재발주시 제품명을 사용합니다"
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* 사이즈 입력 */}
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
                  borderRadius: '6px',
                  border: '1px solid #ccc',
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

        {/* 종이 느낌 선택 */}
        <div style={{ marginBottom: '1rem' }}>
          <label>종이 느낌</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {['매끄러운', '러프한', '친환경'].map((label, index) => (
              <button
                key={index}
                type="button"
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  background: paperFeel === label ? '#000' : '#f9f9f9',
                  color: paperFeel === label ? '#fff' : '#000',
                  cursor: 'pointer',
                }}
                onClick={() => setPaperFeel(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 재질 선택 */}
        <div style={{ marginBottom: '1rem' }}>
          <label>재질 선택</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {materialOptions[paperFeel].map((option, index) => (
              <button
                key={index}
                type="button"
                style={{
                  flex: '1 1 22%',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  background: '#f9f9f9',
                  cursor: 'pointer',
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
