function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      {/* 오른쪽 입력 영역 */}
      <div style={{ marginLeft: 'auto', width: '300px' }}>
        <h2>주문 정보 입력</h2>

        {/* 회사명 또는 성함 */}
        <div style={{ marginBottom: '1rem' }}>
          <label>회사명 또는 성함</label>
          <input
            type="text"
            placeholder="회사 이름을 입력해주세요"
            style={{ width: '100%', padding: '0.5rem' }}
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
                  width: '150px',
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
      </div>
    </div>
  );
}

export default App;