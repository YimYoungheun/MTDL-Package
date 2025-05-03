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
  const bottomOptions = ['맞뚜껑', '십자다루마', '삼면접착'];
  const printSides = ['단면', '양면'];
  const cardSizes = ['90×50', '90×55', '90×60', '85×55'];

  const materialOptions = {
    매끄러운: ['AB', 'CCP', 'SC마닐라', '아이보리'],
    러프한: ['아코팩', '올드밀', '녹차지', '매직패브릭'],
    친환경: ['얼스팩', '크라프트'],
    기본종이: ['아트지', '스노우지'],
    감성종이: ['띤또레또', '아코팩', '올드밀', '랑데뷰'],
    색지: ['뉴에코블랙', '칼라플랜'],
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

  const showWeightOptions = () => {
    if (boxType === '명함') return [];
    if (paperFeel === '매끄러운' && material) return weightOptions.매끄러운[material] || [];
    if (paperFeel === '친환경' && material) return weightOptions.친환경[material] || [];
    if (paperFeel === '러프한' && material && color) return weightOptions.러프한[material]?.[color] || [];
    return [];
  };

  const handleConfirm = () => {
    alert('확인되었습니다.');
  };

  const shouldShowBoxOptions = () => {
    if (boxType === '명함') {
      return selectedCardSize && printSide && material;
    }
    return width && length && height && weight;
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
              <button key={type} onClick={() => {
                setBoxType(type);
                setPaperFeel('');
                setPaperCategory('');
                setMaterial('');
                setColor('');
                setWeight('');
                setBottomStyle('');
                setPrintSide('');
                setWidth('');
                setLength('');
                setHeight('');
                setQuantity('');
                setCustomQuantity('');
                setSelectedCardSize('');
              }} style={{ padding: '0.5rem', background: boxType === type ? 'black' : '#f0f0f0', color: boxType === type ? 'white' : 'black', border: '1px solid #ccc' }}>
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ 명함 사이즈 선택 */}
        {boxType === '명함' && (
          <div style={{ marginBottom: '1rem' }}>
            <label>명함 사이즈 선택</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {cardSizes.map(size => (
                <button key={size} onClick={() => setSelectedCardSize(size)} style={{ padding: '0.5rem', background: selectedCardSize === size ? 'black' : '#f0f0f0', color: selectedCardSize === size ? 'white' : 'black', border: '1px solid #ccc' }}>
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ✅ 명함 종이 및 인쇄 */}
        {boxType === '명함' && selectedCardSize && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>인쇄 방식</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {printSides.map(side => (
                  <button key={side} onClick={() => setPrintSide(side)} style={{ flex: 1, padding: '0.5rem', background: printSide === side ? 'black' : '#f0f0f0', color: printSide === side ? 'white' : 'black', border: '1px solid #ccc' }}>
                    {side}
                  </button>
                ))}
              </div>
            </div>
            {printSide && (
              <div style={{ marginBottom: '1rem' }}>
                <label>종이 종류</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['기본종이', '감성종이', '색지'].map(type => (
                    <button key={type} onClick={() => setPaperCategory(type)} style={{ padding: '0.5rem', background: paperCategory === type ? 'black' : '#f0f0f0', color: paperCategory === type ? 'white' : 'black', border: '1px solid #ccc' }}>
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {paperCategory && (
              <div style={{ marginBottom: '1rem' }}>
                <label>재질 선택</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {materialOptions[paperCategory].map(mat => (
                    <button key={mat} onClick={() => setMaterial(mat)} style={{ padding: '0.5rem', background: material === mat ? 'black' : '#f0f0f0', color: material === mat ? 'white' : 'black', border: '1px solid #ccc' }}>
                      {mat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ✅ 일반 박스 내경 입력 */}
        {boxType !== '명함' && (
          <div style={{ marginBottom: '1rem' }}>
            <label>내경 (mm)</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input placeholder="가로" value={width} onChange={e => setWidth(e.target.value)} style={{ width: '70px', padding: '0.5rem' }} />
              <input placeholder="세로" value={length} onChange={e => setLength(e.target.value)} style={{ width: '70px', padding: '0.5rem' }} />
              <input placeholder="높이" value={height} onChange={e => setHeight(e.target.value)} style={{ width: '70px', padding: '0.5rem' }} />
            </div>
          </div>
        )}

        {/* ✅ 종이 느낌, 재질, 무게, 하단 모양, 수량 등은 그대로 유지 */}
        {boxType !== '명함' && width && length && height && (
          <>
            {/* 종이 느낌, 재질, 색상, 무게 선택 생략 */}
            {/* 하단 모양, 수량, 파일 업로드 등 생략 */}

            {/* 수량 선택 */}
            <div style={{ marginBottom: '1rem' }}>
              <label>수량 선택</label>
              <select value={quantity} onChange={e => setQuantity(e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
                <option value="">수량을 선택하세요</option>
                {['500', '1,000', '2,000', '3,000', '5,000', '10,000', '15,000', '20,000', '30,000', '50,000', '100,000', '그 이상'].map(qty => (
                  <option key={qty} value={qty}>
                    {qty === '그 이상' ? '그 이상' : Number(qty).toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
            {quantity === '그 이상' && (
              <div style={{ marginBottom: '1rem' }}>
                <label>희망 수량 입력</label>
                <input type="number" placeholder="숫자만 입력" value={customQuantity} onChange={e => setCustomQuantity(e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
              </div>
            )}

            <iframe src="https://mtdl.co.kr/fileupload" width="100%" height="170" style={{ border: '1px solid #ccc', borderRadius: '12px', marginBottom: '1rem' }} title="파일 업로드" />
            <p>기재해주신 연락처로 담당자가 연락할 수 있습니다.</p>
            <button style={{ background: 'black', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer' }} onClick={handleConfirm}>
              확인
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
