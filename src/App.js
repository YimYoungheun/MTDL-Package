import React, { useState } from 'react';
import EstimatePrice from './EstimatePrice';
import './App.css';

function App() {
  // 가격 데이터 및 옵션 맵
  const paperPrices = {
    '매끄러운': {
      AB: { '300g': 359390, '350g': 420690 },
      CCP: { '300g': 386260, '350g': 450640 },
      아이보리: { '300g': 235040, '350g': 272400 },
      'SC 마닐라': { '300g': 181630, '350g': 211550 }
    },
    '러프한': {
      올드밀: {
        비앙코: { '300g': 764500, '350g': 891000 },
        '엑스트라 화이트': { '300g': 695000, '350g': 810000 },
        '프리미엄 화이트': { '300g': 695000, '350g': 810000 }
      },
      아코팩: {
        '웜 화이트': { '300g': 435000, '350g': 510000, '400g': 595000 },
        '네츄럴': { '300g': 435000, '350g': 510000 }
      },
      녹차지: {
        백색: { '300g': 400000, '350g': 430000 }
      }
    }
  };
  const materialMap = {
    '매끄러운': ['AB', 'CCP', '아이보리', 'SC 마닐라'],
    '러프한': ['올드밀', '아코팩', '매직패브릭', '녹차지'],
    '친환경': ['얼스팩', '크라프트']
  };
  const colorMap = {
    아코팩: ['웜 화이트', '네츄럴', '엑스트라 화이트'],
    올드밀: ['비앙코', '엑스트라 화이트', '프리미엄 화이트'],
    녹차지: ['백색'],
    매직패브릭: ['검정색', '진곤색', '피색', '진한밤색', '체리색', '클래식블랙']
  };
  const weightMap = {
    '매끄러운': {
      AB: ['300g', '350g'],
      CCP: ['300g', '350g'],
      'SC 마닐라': ['300g', '350g'],
      아이보리: ['300g', '350g']
    },
    '친환경': {
      얼스팩: ['295g'],
      크라프트: ['300g', '337g']
    },
    '러프한': {
      아코팩: {
        '웜 화이트': ['300g', '350g', '400g'],
        '네츄럴': ['300g', '350g', '400g'],
        '엑스트라 화이트': ['410g']
      },
      올드밀: {
        '비앙코': ['300g', '350g'],
        '엑스트라 화이트': ['300g', '350g'],
        '프리미엄 화이트': ['410g']
      },
      녹차지: {
        백색: ['300g', '350g']
      },
      매직패브릭: {
        검정색: ['300g', '350g', '400g'],
        진곤색: ['300g', '350g', '400g'],
        피색: ['300g', '350g', '400g'],
        진한밤색: ['300g', '350g', '400g'],
        체리색: ['300g', '350g', '400g'],
        클래식블랙: ['300g', '350g', '400g']
      }
    }
  };

  // 스타일 변수 선언
  const inputStyle = { width: '360px', padding: '0.5rem' };
  const shortInputStyle = { width: '90px', padding: '0.5rem' };

  // 상태값
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [bottomStyle, setBottomStyle] = useState('');
  const [paperFeel, setPaperFeel] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [coating, setCoating] = useState(null);
  const [embossing, setEmbossing] = useState(null);
  const [foil, setFoil] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [customQuantity, setCustomQuantity] = useState('');
  // 인쇄 상태값
  const [mainPrintColor, setMainPrintColor] = useState('');
  const [spotPrintColor, setSpotPrintColor] = useState('');

  // 옵션 함수
  const getColorOptions = () => paperFeel === '러프한' ? colorMap[material] || [] : [];
  const getWeightOptions = () => {
    if (paperFeel === '매끄러운' || paperFeel === '친환경') return weightMap[paperFeel]?.[material] || [];
    if (paperFeel === '러프한' && color) return weightMap['러프한']?.[material]?.[color] || [];
    return [];
  };

  // 전체 리셋
  const handleReset = () => {
    setCompany('');
    setPhone('');
    setEmail('');
    setWidth('');
    setLength('');
    setHeight('');
    setBottomStyle('');
    setPaperFeel('');
    setMaterial('');
    setColor('');
    setWeight('');
    setCoating(null);
    setEmbossing(null);
    setFoil([]);
    setQuantity('');
    setCustomQuantity('');
    setMainPrintColor('');
    setSpotPrintColor('');
  };

  return (
    <div style={{ display: 'flex', boxSizing: 'border-box' }}>
      {/* 왼쪽 이미지 영역 */}
      <div style={{ width: '700px', height: '100vh', position: 'sticky', top: 0, flexShrink: 0 }}>
        <img
          src="/img/b_style_box.png"
          alt="B형 상자"
          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px' }}
        />
      </div>
      {/* 오른쪽 입력 영역 */}
      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', height: '100vh' }}>
        <button
          onClick={handleReset}
          style={{
            marginBottom: '1.5rem',
            backgroundColor: '#ddd',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >다시 선택하기</button>

        {/* 회사, 연락처, 이메일 */}
        {[{ label: '회사명 또는 성함', value: company, setter: setCompany },
          { label: '연락처', value: phone, setter: setPhone },
          { label: '이메일 주소', value: email, setter: setEmail }].map((f, i) => (
          <div key={i} style={{ marginBottom: '1rem' }}>
            <label>{f.label}</label><br />
            <input value={f.value} onChange={e => f.setter(e.target.value)} style={inputStyle} />
          </div>
        ))}

        {/* 내경 입력 */}
        <div style={{ marginBottom: '1rem' }}>
          <label>내경 (mm)</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
            <input placeholder="가로" value={width} onChange={e => setWidth(e.target.value)} style={shortInputStyle} />
            <input placeholder="세로" value={length} onChange={e => setLength(e.target.value)} style={shortInputStyle} />
            <input placeholder="높이" value={height} onChange={e => setHeight(e.target.value)} style={shortInputStyle} />
          </div>
        </div>

        {/* 하단 모양 선택 */}
        {width && length && height && (
          <div style={{ marginBottom: '1rem' }}>
            <label>하단 모양</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['맞뚜껑', '십자다루마', '삼면접착'].map(opt => (
                <button
                  key={opt}
                  className={`option-button ${bottomStyle === opt ? 'selected' : ''}`}
                  onClick={() => setBottomStyle(opt)}
                >{opt}</button>
              ))}
            </div>
          </div>
        )}

        {/* 종이 느낌, 재질, 색상, 무게 */}
        {width && length && height && bottomStyle && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>종이 느낌</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {Object.keys(materialMap).map(feel => (
                  <button key={feel} className={`option-button ${paperFeel === feel ? 'selected' : ''}`} onClick={() => { setPaperFeel(feel); setMaterial(''); setColor(''); setWeight(''); }}>{feel}</button>
                ))}
              </div>
            </div>
            {paperFeel && (
              <div style={{ marginBottom: '1rem' }}>
                <label>재질</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {materialMap[paperFeel].map(mat => (
                    <button key={mat} className={`option-button ${material === mat ? 'selected' : ''}`} onClick={() => { setMaterial(mat); setColor(''); setWeight(''); }}>{mat}</button>
                  ))}
                </div>
              </div>
            )}
            {paperFeel === '러프한' && material && getColorOptions().length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <label>색상</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {getColorOptions().map(c => (
                    <button key={c} className={`option-button ${color === c ? 'selected' : ''}`} onClick={() => { setColor(c); setWeight(''); }}>{c}</button>
                  ))}
                </div>
              </div>
            )}
            {material && getWeightOptions().length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <label>무게</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {getWeightOptions().map(w => (
                    <button key={w} className={`option-button ${weight === w ? 'selected' : ''}`} onClick={() => setWeight(w)}>{w}</button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* 인쇄 선택 (무게까지 골라야 노출) */}
        {weight && (
          <div style={{ marginBottom: '1rem' }}>
            <label>인쇄 선택</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <button
                className={`option-button ${(!mainPrintColor && !spotPrintColor) ? 'selected' : ''}`}
                onClick={() => {
                  setMainPrintColor('');
                  setSpotPrintColor('');
                }}
              >
                인쇄 없음
              </button>
            </div>
            {/* 1도~4도: 한 줄, 그룹 단일 선택 */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem' }}>
              {['1도', '2도', '3도', '4도'].map(type => (
                <button
                  key={type}
                  className={`option-button ${mainPrintColor === type ? 'selected' : ''}`}
                  onClick={() => setMainPrintColor(prev => prev === type ? '' : type)}
                >{type}</button>
              ))}
            </div>
            {/* 별색 1도~4도: 한 줄, 그룹 단일 선택 */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['별색 1도', '별색 2도', '별색 3도', '별색 4도'].map(type => (
                <button
                  key={type}
                  className={`option-button ${spotPrintColor === type ? 'selected' : ''}`}
                  onClick={() => setSpotPrintColor(prev => prev === type ? '' : type)}
                >{type}</button>
              ))}
            </div>
          </div>
        )}

        {/* 후가공 및 수량 */}
        {weight && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>코팅</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['없음', '무광', '유광', '벨벳'].map(type => (
                  <button key={type} className={`option-button ${(type === '없음' ? coating === '' : coating === type) ? 'selected' : ''}`} onClick={() => setCoating(type === '없음' ? '' : type)}>{type}</button>
                ))}
              </div>
            </div>
            {coating !== null && (
              <div style={{ marginBottom: '1rem' }}>
                <label>형압</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['없음', '음각', '양각'].map(type => (
                    <button key={type} className={`option-button ${(type === '없음' ? embossing === '' : embossing === type) ? 'selected' : ''}`} onClick={() => setEmbossing(type === '없음' ? '' : type)}>{type}</button>
                  ))}
                </div>
              </div>
            )}
            {embossing !== null && (
              <div style={{ marginBottom: '1rem' }}>
                <label>박 (복수 선택 가능)</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['없음', '금박', '은박', '먹박', '적박', '홀로그램박', '투명홀로그램박'].map(type => (
                    <button
                      key={type}
                      className={`option-button ${(type === '없음' && foil.length === 0) || foil.includes(type) ? 'selected' : ''}`}
                      onClick={() => {
                        if (type === '없음') setFoil([]);
                        else setFoil(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
                      }}
                    >{type}</button>
                  ))}
                </div>
              </div>
            )}
            {embossing !== null && (
              <div style={{ marginBottom: '1rem' }}>
                <label>수량 선택</label>
                <select value={quantity} onChange={e => setQuantity(e.target.value)} style={inputStyle}>
                  <option value="">수량을 선택하세요</option>
                  {[500, 1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000, '그 이상'].map(qty => (
                    <option key={qty} value={String(qty)}>{qty === '그 이상' ? '그 이상' : Number(qty).toLocaleString()}</option>
                  ))}
                </select>
              </div>
            )}
            {quantity === '그 이상' && (
              <div style={{ marginBottom: '1rem' }}>
                <label>희망 수량 입력</label>
                <input
                  type="number"
                  value={customQuantity}
                  onChange={e => setCustomQuantity(e.target.value)}
                  style={inputStyle}
                />
              </div>
            )}

            {/* 견적가 계산 컴포넌트 */}
            <EstimatePrice
              width={width}
              length={length}
              height={height}
              bottomStyle={bottomStyle}
              paperFeel={paperFeel}
              paperType={material}
              paperWeight={weight}
              color={color}
              quantity={quantity === '그 이상' ? customQuantity : quantity}
              coatingType={coating || '없음'}
              foil={foil}
              embossing={embossing}
              mainPrintColor={mainPrintColor}
              spotPrintColor={spotPrintColor}
              printNone={!mainPrintColor && !spotPrintColor}
            />

            <iframe
              src="https://mtdl.co.kr/fileupload"
              width="100%"
              height="170"
              style={{ border: '1px solid #ccc', borderRadius: '12px', marginBottom: '1rem' }}
              title="파일 업로드"
            />
            <button
              style={{ background: 'black', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
              onClick={() => alert('기재해주신 연락처로 담당자가 연락할 수 있습니다.')}
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
