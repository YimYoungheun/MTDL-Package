import React, { useState } from 'react';

function App() {
const \[boxType, setBoxType] = useState('');
const \[paperCategory, setPaperCategory] = useState('');
const \[paperFeel, setPaperFeel] = useState('');
const \[material, setMaterial] = useState('');
const \[color, setColor] = useState('');
const \[weight, setWeight] = useState('');
const \[bottomStyle, setBottomStyle] = useState('');
const \[company, setCompany] = useState('');
const \[product, setProduct] = useState('');
const \[phone, setPhone] = useState('');
const \[email, setEmail] = useState('');
const \[printSide, setPrintSide] = useState('');
const \[width, setWidth] = useState('');
const \[length, setLength] = useState('');
const \[height, setHeight] = useState('');
const \[quantity, setQuantity] = useState('');
const \[customQuantity, setCustomQuantity] = useState('');
const \[selectedCardSize, setSelectedCardSize] = useState('');

const boxTypeOptions = \['명함', 'B형', '고리걸이 B형', '상, 하짝 Y형', '슬리브+Y형', '손잡이형', '쇼핑백'];
const cardSizes = \['90×50', '90×55', '85×55'];

const materialMap = {
'매끄러운': \['AB', 'CCP', '아이보리', 'SC 마닐라'],
'러프한': \['올드밀', '아코팩', '매직패브릭', '녹차지'],
'친환경': \['얼스팩', '크라프트']
};

const colorMap = {
아코팩: \['웜 화이트', '네츄럴', '엑스트라 화이트'],
올드밀: \['비앙코', '엑스트라 화이트', '프리미엄 화이트'],
녹차지: \['백색'],
매직패브릭: \['검정색', '진곤색', '피색', '진한밤색', '체리색', '클래식블랙']
};

const weightMap = {
'매끄러운': {
AB: \['300g', '350g'],
CCP: \['300g', '350g'],
'SC 마닐라': \['300g', '350g'],
아이보리: \['300g', '350g']
},
'친환경': {
얼스팩: \['295g'],
크라프트: \['300g', '337g']
},
'러프한': {
아코팩: {
'웜 화이트': \['300g', '350g', '400g'],
'네츄럴': \['300g', '350g', '400g'],
'엑스트라 화이트': \['410g']
},
올드밀: {
'비앙코': \['300g', '350g'],
'엑스트라 화이트': \['300g', '350g'],
'프리미엄 화이트': \['410g']
},
녹차지: {
백색: \['300g', '350g']
},
매직패브릭: {
검정색: \['300g', '350g', '400g'],
진곤색: \['300g', '350g', '400g'],
피색: \['300g', '350g', '400g'],
진한밤색: \['300g', '350g', '400g'],
체리색: \['300g', '350g', '400g'],
클래식블랙: \['300g', '350g', '400g']
}
}
};

const getColorOptions = () => {
if (paperFeel === '러프한') {
return colorMap\[material] || \[];
}
return \[];
};

const getWeightOptions = () => {
if (paperFeel === '매끄러운' || paperFeel === '친환경') {
return (weightMap\[paperFeel]?.\[material]) || \[];
} else if (paperFeel === '러프한' && color) {
return (weightMap\['러프한']?.\[material]?.\[color]) || \[];
}
return \[];
};

return (
\<div style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem' }}> <div>
\<img
src="/img/b\_style\_box.png"
alt="B형 상자"
style={{ width: '700px', height: 'auto', objectFit: 'contain', borderRadius: '12px' }}
/> </div>

```
  <div style={{ width: '360px' }}>
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
              <label>종이 느낌</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {Object.keys(materialMap).map(feel => (
                  <button
                    key={feel}
                    onClick={() => {
                      setPaperFeel(feel);
                      setMaterial('');
                      setColor('');
                      setWeight('');
                    }}
                    style={{ padding: '0.5rem', background: paperFeel === feel ? 'black' : '#f0f0f0', color: paperFeel === feel ? 'white' : 'black', border: '1px solid #ccc' }}
                  >
                    {feel}
                  </button>
                ))}
              </div>
            </div>

            {paperFeel && (
              <div style={{ marginBottom: '1rem' }}>
                <label>재질</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {materialMap[paperFeel].map(mat => (
                    <button
                      key={mat}
                      onClick={() => {
                        setMaterial(mat);
                        setColor('');
                        setWeight('');
                      }}
                      style={{ padding: '0.5rem', background: material === mat ? 'black' : '#f0f0f0', color: material === mat ? 'white' : 'black', border: '1px solid #ccc' }}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {paperFeel === '러프한' && material && getColorOptions().length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <label>색상</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {getColorOptions().map(c => (
                    <button
                      key={c}
                      onClick={() => {
                        setColor(c);
                        setWeight('');
                      }}
                      style={{ padding: '0.5rem', background: color === c ? 'black' : '#f0f0f0', color: color === c ? 'white' : 'black', border: '1px solid #ccc' }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {material && getWeightOptions().length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <label>무게</label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {getWeightOptions().map(w => (
                    <button
                      key={w}
                      onClick={() => setWeight(w)}
                      style={{ padding: '0.5rem', background: weight === w ? 'black' : '#f0f0f0', color: weight === w ? 'white' : 'black', border: '1px solid #ccc' }}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {weight && (
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

                {bottomStyle && (
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
                      onClick={() => alert('확인되었습니다.')}
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
  </div>
</div>
```

);
}

export default App;
