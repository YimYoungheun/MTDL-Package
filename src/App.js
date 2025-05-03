import React, { useState } from 'react';

function App() {
  const [paperFeel, setPaperFeel] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [bottomStyle, setBottomStyle] = useState('');

  const [company, setCompany] = useState('');
  const [product, setProduct] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState(null);
  const [uploadComplete, setUploadComplete] = useState(false);

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
    if (paperFeel === '매끄러운' && material) {
      return weightOptions.매끄러운[material] || [];
    }
    if (paperFeel === '친환경' && material) {
      return weightOptions.친환경[material] || [];
    }
    if (paperFeel === '러프한' && material && color) {
      return weightOptions.러프한[material]?.[color] || [];
    }
    return [];
  };

  const handleUpload = async () => {
    if (!file || !phone) {
      alert('연락처와 파일을 모두 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('phone', phone);
    formData.append('company', company);
    formData.append('product', product);

    const response = await fetch('https://your-server.com/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      setUploadComplete(true);
    } else {
      alert('업로드 실패. 다시 시도해주세요.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ marginLeft: 'auto', width: '360px' }}>
        <h2>B형 단상자</h2>

        <div style={{ marginBottom: '1rem' }}>
          <label>회사명 또는 성함</label>
          <input
            type="text"
            placeholder="회사 이름을 입력해주세요"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            style={{ width: '90%', padding: '0.5rem', borderRadius: '6px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>연락처</label>
          <input
            type="text"
            placeholder=
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '90%', padding: '0.5rem', borderRadius: '6px' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>제품명</label>
          <input
            type="text"
            placeholder="재발주시 제품명을 사용합니다"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            style={{ width: '90%', padding: '0.5rem', borderRadius: '6px' }}
          />
        </div>

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
                  borderRadius: '6px',
                }}
                onWheel={(e) => e.target.blur()}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>종이 느낌</label>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {['매끄러운', '러프한', '친환경'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setPaperFeel(type);
                  setMaterial('');
                  setColor('');
                  setWeight('');
                  setBottomStyle('');
                }}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  background: paperFeel === type ? 'black' : '#f9f9f9',
                  color: paperFeel === type ? 'white' : 'black',
                  cursor: 'pointer',
                  borderRadius: '6px',
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {paperFeel && (
          <div style={{ marginBottom: '1rem' }}>
            <label>재질 선택</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              {materialOptions[paperFeel].map((mat) => (
                <button
                  key={mat}
                  onClick={() => {
                    setMaterial(mat);
                    setColor('');
                    setWeight('');
                    setBottomStyle('');
                  }}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    background: material === mat ? 'black' : '#f9f9f9',
                    color: material === mat ? 'white' : 'black',
                    cursor: 'pointer',
                    borderRadius: '6px',
                  }}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>
        )}

        {paperFeel === '러프한' && material && colorOptions[material] && (
          <div style={{ marginBottom: '1rem' }}>
            <label>색상 선택</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
              {colorOptions[material].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setColor(c);
                    setWeight('');
                    setBottomStyle('');
                  }}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    background: color === c ? 'black' : '#f9f9f9',
                    color: color === c ? 'white' : 'black',
                    cursor: 'pointer',
                    borderRadius: '6px',
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {showWeightOptions().length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <label>용지 무게 선택</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {showWeightOptions().map((w) => (
                <button
                  key={w}
                  onClick={() => {
                    setWeight(w);
                    setBottomStyle('');
                  }}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    background: weight === w ? 'black' : '#f9f9f9',
                    color: weight === w ? 'white' : 'black',
                    cursor: 'pointer',
                    borderRadius: '6px',
                  }}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        )}

        {weight && (
          <div style={{ marginBottom: '1rem' }}>
            <label>하단 모양 선택</label>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              {bottomOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setBottomStyle(opt)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    border: '1px solid #ccc',
                    background: bottomStyle === opt ? 'black' : '#f9f9f9',
                    color: bottomStyle === opt ? 'white' : 'black',
                    cursor: 'pointer',
                    borderRadius: '6px',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {bottomStyle && !uploadComplete && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>도면 및 디자인 파일 업로드</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ marginTop: '0.5rem' }}
              />
              <button
                onClick={handleUpload}
                style={{
                  display: 'block',
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  background: 'white',
                  color: 'black',
                  border: '1px solid black',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                업로드
              </button>
            </div>
          </>
        )}

        {uploadComplete && (
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <p>기재해주신 연락처로 담당자가 연락할 수 있습니다.</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.5rem 1rem',
                background: 'black',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                marginTop: '0.5rem',
                cursor: 'pointer',
              }}
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
