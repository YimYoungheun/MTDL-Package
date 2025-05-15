// App.js (전체 UI 포함, 이미지 700px, 입력칸 조정)
import React, { useState } from 'react';
import './App.css';

function App() {
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
    const getEstimatedPrice = () => {
    if (!paperFeel || !material || !weight) return null;
    const weightValue = weight;

    if (paperFeel === '러프한' && color) {
      return paperPrices[paperFeel]?.[material]?.[color]?.[weightValue] || null;
    } else {
      return paperPrices[paperFeel]?.[material]?.[weightValue] || null;
    }
  };
  const [paperFeel, setPaperFeel] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [bottomStyle, setBottomStyle] = useState('');
  const [company, setCompany] = useState('');
  const [product, setProduct] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [quantity, setQuantity] = useState('');
  const [customQuantity, setCustomQuantity] = useState('');
  const [coating, setCoating] = useState(null);
  const [embossing, setEmbossing] = useState(null);
  const [foil, setFoil] = useState([]);
  const inputStyle = { width: '360px', padding: '0.5rem' };
  const shortInputStyle = { width: '90px', padding: '0.5rem' };

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

  const getColorOptions = () => paperFeel === '러프한' ? colorMap[material] || [] : [];
  const getWeightOptions = () => {
    if (paperFeel === '매끄러운' || paperFeel === '친환경') return weightMap[paperFeel]?.[material] || [];
    if (paperFeel === '러프한' && color) return weightMap['러프한']?.[material]?.[color] || [];
    return [];
  };

  return (
    <div style={{ display: 'flex', boxSizing: 'border-box' }}>
      <div style={{ width: '700px', height: '100vh', position: 'sticky', top: 0, flexShrink: 0 }}>
        <img
          src="/img/b_style_box.png"
          alt="B형 상자"
          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '12px' }}
        />
      </div>

      <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', height: '100vh' }}>
        <button
          onClick={() => {
            setPaperFeel('');
            setMaterial('');
            setColor('');
            setWeight('');
            setBottomStyle('');
            setHeight('');
            setQuantity('');
            setCustomQuantity('');
            setCoating(null);
            setEmbossing(null);
            setFoil([]);
          }}
          style={{
            marginBottom: '1.5rem',
            backgroundColor: '#ddd',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          다시 선택하기
        </button>
        {[{ label: '회사명 또는 성함', value: company, setter: setCompany },
          { label: '연락처', value: phone, setter: setPhone },
          { label: '이메일 주소', value: email, setter: setEmail }].map((f, i) => (
          <div key={i} style={{ marginBottom: '1rem' }}>
            <label>{f.label}</label><br />
            <input value={f.value} onChange={e => f.setter(e.target.value)} style={inputStyle} />
          </div>
        ))}

        <div style={{ marginBottom: '1rem' }}>
          <label>내경 (mm)</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
            <input placeholder="가로" value={width} onChange={e => setWidth(e.target.value)} style={shortInputStyle} />
            <input placeholder="세로" value={length} onChange={e => setLength(e.target.value)} style={shortInputStyle} />
            <input placeholder="높이" value={height} onChange={e => setHeight(e.target.value)} style={shortInputStyle} />
          </div>
        </div>

{width && length && height && bottomStyle && (
  (() => {
    const w = parseInt(width);
    const l = parseInt(length);
    const h = parseInt(height);

    const dogaWidth = w * 2 + 16;
    let dogaHeight = 0;

    const canFitTwo = sheetSizes.some(s =>
      (dogaWidth * 2 <= s.width && dogaHeight <= s.height) ||
      (dogaWidth <= s.width && dogaHeight * 2 <= s.height) ||
      (dogaWidth * 2 <= s.height && dogaHeight <= s.width) ||
      (dogaWidth <= s.height && dogaHeight * 2 <= s.width)
    );

    
    if (bottomStyle === '맞뚜껑') {
      dogaHeight = (h + 16) * 2 + l + 20;
    } else if (bottomStyle === '십자다루마' || bottomStyle === '삼면접착') {
      dogaHeight = h * 0.75 * 2 + l * 2 + h + 16 + 5 + 20;
    }

    const sheetSizes = [
      { name: '국4절', width: 318, height: 469 },
      { name: '4절', width: 394, height: 545 },
      { name: '국2절', width: 465, height: 636 },
      { name: '2절', width: 545, height: 788 },
      { name: '국전지', width: 636, height: 939 }
    ];

    const matched = sheetSizes.find(s => s.width >= dogaWidth && s.height >= dogaHeight);

    return (
      <div style={{ marginBottom: '1rem', backgroundColor: '#eee', padding: '0.5rem', borderRadius: '8px' }}>
        전개도 크기: {dogaWidth} × {dogaHeight}mm / 추천 절지: {matched ? matched.name : '해당 없음'}
      </div>
    );
  })()
)}
        
        {width && length && height && (
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
                  <>
                    <div style={{ marginBottom: '1rem' }}>
                      <label>형압</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {['없음', '음각', '양각'].map(type => (
                          <button key={type} className={`option-button ${(type === '없음' ? embossing === '' : embossing === type) ? 'selected' : ''}`} onClick={() => setEmbossing(type === '없음' ? '' : type)}>{type}</button>
                        ))}
                      </div>
                    </div>

                    {embossing !== null && (
                      <>
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

                        {bottomStyle && (
                          <>
                            <div style={{ marginBottom: '1rem' }}>
                              <label>수량 선택</label>
                              <select value={quantity} onChange={e => setQuantity(e.target.value)} style={inputStyle}>
                                <option value="">수량을 선택하세요</option>
                                {[500, 1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000, '그 이상'].map(qty => (
                                  <option key={qty} value={String(qty)}>{qty === '그 이상' ? '그 이상' : Number(qty).toLocaleString()}</option>
                                ))}
                              </select>
                            </div>

                            {quantity === '그 이상' && (
                              <div style={{ marginBottom: '1rem' }}>
                                <label>희망 수량 입력</label>
                                <input type="number" value={customQuantity} onChange={e => setCustomQuantity(e.target.value)} style={inputStyle} />
                              </div>
                            )}

                            {(quantity !== '' && (quantity !== '그 이상' || (quantity === '그 이상' && customQuantity))) && (
                              <div style={{ marginBottom: '1rem', color: 'crimson', fontWeight: 'bold', fontSize: '1.3rem' }}>
                                {getEstimatedPrice() ? `${getEstimatedPrice().toLocaleString()}원부터 ~` : '금액 계산 불가'}
                              </div>
                            <div style={{ marginBottom: '1rem' }}>
                              <label>하단 모양</label>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {['맞뚜껑', '십자다루마', '삼면접착'].map(opt => (
                                  <button key={opt} className={`option-button ${bottomStyle === opt ? 'selected' : ''}`} onClick={() => setBottomStyle(opt)}>{opt}</button>
                                ))}
                              </div>
                            </div>
                            
                            {width && length && height && bottomStyle && (() => {
                              const w = parseInt(width);
                              const l = parseInt(length);
                              const h = parseInt(height);
                            
                              const dogaWidth = w * 2 + 16;
                              let dogaHeight = 0;
                            
                              if (bottomStyle === '맞뚜껑') {
                                dogaHeight = (h + 16) * 2 + l + 20;
                              } else if (bottomStyle === '십자다루마' || bottomStyle === '삼면접착') {
                                dogaHeight = h * 0.75 * 2 + l * 2 + h + 16 + 5 + 20;
                              }
                            
                              const sheetSizes = [
                                { name: '국4절', width: 318, height: 469 },
                                { name: '4절', width: 394, height: 545 },
                                { name: '국2절', width: 465, height: 636 },
                                { name: '2절', width: 545, height: 788 },
                                { name: '국전지', width: 636, height: 939 }
                              ];
                            
                              const matched = sheetSizes.find(s => s.width >= dogaWidth && s.height >= dogaHeight);
                            
                              return (
                                <div style={{ marginBottom: '1rem', backgroundColor: '#eee', padding: '0.5rem', borderRadius: '8px' }}>
                                  전개도 크기: {dogaWidth} × {dogaHeight}mm / 추천 절지: {matched ? matched.name : '해당 없음'}
                                </div>
                              );
                            })()}
       
                                
                                )}
    
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
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      );
    }
    
    export default App;
    
  
