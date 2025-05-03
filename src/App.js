import React, { useState } from 'react';

function App() {
  const [boxType, setBoxType] = useState('');
  const [paperCategory, setPaperCategory] = useState('');
  const [paperFeel, setPaperFeel] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [bottomStyle, setBottomStyle] = useState('');
  const [company, setCompany] = useState('');
  const [product, setProduct] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [printSide, setPrintSide] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [quantity, setQuantity] = useState('');
  const [customQuantity, setCustomQuantity] = useState('');
  const [selectedCardSize, setSelectedCardSize] = useState('');

  const boxTypeOptions = ['명함', 'B형', '고리걸이 B형', '상, 하짝 Y형', '슬리브+Y형', '손잡이형', '쇼핑백'];
  const cardSizes = ['90×50', '90×55', '85×55'];

  const handleConfirm = () => {
    alert('확인되었습니다.');
  };

  const shouldShowBoxOptions = () => {
    if (boxType === '명함') {
      return selectedCardSize && printSide && material;
    }
    return width && length && height && bottomStyle;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '360px', marginLeft: 'auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>회사명 또는 성함</label>
          <input value={company} onChange={e => setCompany(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>연락처</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>이메일 주소</label>
          <input value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>제품</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {boxTypeOptions.map(type => (
              <button
                key={type}
                onClick={() => {
                  setBoxType(type);
                  setSelectedCardSize('');
                  setPrintSide('');
                  setMaterial('');
                  setWidth('');
                  setLength('');
                  setHeight('');
                  setWeight('');
                  setBottomStyle('');
                  setQuantity('');
                  setCustomQuantity('');
                }}
                style={{ padding: '0.5rem', background: boxType === type ? 'black' : '#f0f0f0', color: boxType === type ? 'white' : 'black', border: '1px solid #ccc' }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {boxType === '명함' && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>명함 사이즈</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {cardSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedCardSize(size)}
                    style={{ padding: '0.5rem', background: selectedCardSize === size ? 'black' : '#f0f0f0', color: selectedCardSize === size ? 'white' : 'black', border: '1px solid #ccc' }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {selectedCardSize && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label>인쇄 방식</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['단면', '양면'].map(side => (
                      <button
                        key={side}
                        onClick={() => setPrintSide(side)}
                        style={{ flex: 1, padding: '0.5rem', background: printSide === side ? 'black' : '#f0f0f0', color: printSide === side ? 'white' : 'black', border: '1px solid #ccc' }}
                      >
                        {side}
                      </button>
                    ))}
                  </div>
                </div>

                {printSide && (
                  <div style={{ marginBottom: '1rem' }}>
                    <label>재질 선택</label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {['아트지', '스노우지', '아코팩', '올드밀'].map(mat => (
                        <button
                          key={mat}
                          onClick={() => setMaterial(mat)}
                          style={{ padding: '0.5rem', background: material === mat ? 'black' : '#f0f0f0', color: material === mat ? 'white' : 'black', border: '1px solid #ccc' }}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {boxType !== '명함' && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>내경 (mm)</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input placeholder="가로" value={width} onChange={e => setWidth(e.target.value)} style={{ width: '70px', padding: '0.5rem' }} />
                <input placeholder="세로" value={length} onChange={e => setLength(e.target.value)} style={{ width: '70px', padding: '0.5rem' }} />
                <input placeholder="높이" value={height} onChange={e => setHeight(e.target.value)} style={{ width: '70px', padding: '0.5rem' }} />
              </div>
            </div>

            {width && length && height && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label>하단 모양</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {['맞뚜껑', '십자다루마', '삼면접착'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setBottomStyle(opt)}
                        style={{ flex: 1, padding: '0.5rem', background: bottomStyle === opt ? 'black' : '#f0f0f0', color: bottomStyle === opt ? 'white' : 'black', border: '1px solid #ccc' }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {shouldShowBoxOptions() && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>수량 선택</label>
              <select value={quantity} onChange={e => setQuantity(e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
                <option value="">수량을 선택하세요</option>
                {[500, 1000, 2000, 3000, 5000, 10000, 15000, 20000, 30000, 50000, 100000, '그 이상'].map(qty => (
                  <option key={qty} value={qty}>
                    {qty === '그 이상' ? '그 이상' : Number(qty).toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {quantity === '그 이상' && (
              <div style={{ marginBottom: '1rem' }}>
                <label>희망 수량 입력</label>
                <input type="number" value={customQuantity} onChange={e => setCustomQuantity(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
              </div>
            )}

            <iframe
              src="https://mtdl.co.kr/fileupload"
              width="100%"
              height="170"
              style={{ border: '1px solid #ccc', borderRadius: '12px', marginBottom: '1rem' }}
              title="파일 업로드"
            />

            <p>기재해주신 연락처로 담당자가 연락할 수 있습니다.</p>
            <button
              style={{ background: 'black', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
              onClick={handleConfirm}
            >
              확인
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
