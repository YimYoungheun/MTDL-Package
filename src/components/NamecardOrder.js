import React, { useState } from 'react';
import '../App.css'; // 스타일시트 주의!
import { paperPrices } from '../data/paperPrices';

// 필요한 파일 import
import { NamecardcolorMap } from '../data/NamecardcolorMap';
import { NamecardmeterialMap } from '../data/NamecardmeterialMap';
import { NamecardpaperPrice } from '../data/NamecardpaperPrice';
import { NamecardweightMap } from '../data/NamecardweightMap';

//옵션 명칭 선언
const FEEL_OPTIONS = namecardFeelOptions;
const MATERIAL_MAP = namecardMaterialMap;
const COLOR_MAP = namecardColorMap;
const WEIGHT_MAP = namecardWeightMap;

// 명함 크기
const SIZE_OPTIONS = [
  { label: '90×50', width: 90, height: 50 },
  { label: '90×55', width: 90, height: 55 },
  { label: '85×55', width: 85, height: 55 }
];

// 인쇄 옵션
const PRINT_OPTIONS = [
  { label: '단면 인쇄', value: '단면' },
  { label: '양면 인쇄', value: '양면' }
];

// 코팅 옵션
const COATING_OPTIONS = [
  '없음', '무광', '유광', '벨벳'
];

// 모서리 둥글게 옵션
const ROUND_OPTIONS = [
  '없음', '1면', '2면', '3면', '4면'
];

function NamecardOrder() {
  // 기본정보
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // 명함 옵션 상태
  const [selectedSize, setSelectedSize] = useState(null);
  const [paperFeel, setPaperFeel] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [printType, setPrintType] = useState('');
  const [coating, setCoating] = useState('');
  const [round, setRound] = useState('없음');

  // 리셋 함수
  const handleReset = () => {
    setCompany('');
    setPhone('');
    setEmail('');
    setSelectedSize(null);
    setPaperFeel('');
    setMaterial('');
    setColor('');
    setWeight('');
    setPrintType('');
    setCoating('');
    setRound('없음');
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', boxSizing: 'border-box' }}>
      {/* 왼쪽 이미지 (임시) */}
      <div style={{ flex: 3.6, minWidth: 0, height: '100vh' }}>
        <img
          src="/img/Namecard.jpg"
          alt="명함"
          style={{ width: '73vw', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 0 }}
        />
      </div>
      {/* 오른쪽 입력폼 */}
      <div style={{ flex: 1, minWidth: 0, padding: '2rem', background: '#fff', height: '100vh', overflowY: 'auto' }}>
        <button className="secondary-button" onClick={handleReset} style={{ marginBottom: 16 }}>
          처음부터 입력 다시하기
        </button>
        {/* 회사명/성함, 연락처, 이메일 */}
        {[{ label: '회사명 또는 성함', value: company, setter: setCompany },
          { label: '연락처', value: phone, setter: setPhone },
          { label: '이메일 주소', value: email, setter: setEmail }].map((f, i) => (
          <div key={i} style={{ marginBottom: '1rem' }}>
            <label>{f.label}</label>
            <input
              className="custom-input long"
              value={f.value}
              onChange={e => f.setter(e.target.value)}
              autoComplete="off"
            />
          </div>
        ))}

        {/* 명함 사이즈 */}
        <div style={{ marginBottom: '1.3rem' }}>
          <label>사이즈 (mm)</label>
          <div className="button-group">
            {SIZE_OPTIONS.map(opt => (
              <button
                key={opt.label}
                className={`option-button ${selectedSize?.label === opt.label ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedSize(opt);
                  setPaperFeel('');
                  setMaterial('');
                  setColor('');
                  setWeight('');
                  setPrintType('');
                  setCoating('');
                  setRound('없음');
                }}
              >{opt.label}</button>
            ))}
          </div>
        </div>

        {/* 종이 느낌 */}
        {selectedSize && (
          <div style={{ marginBottom: '1.3rem' }}>
            <label>종이 느낌</label>
            <div className="button-group">
              {FEEL_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`option-button ${paperFeel === opt.value ? 'selected' : ''}`}
                  onClick={() => {
                    setPaperFeel(opt.value);
                    setMaterial('');
                    setColor('');
                    setWeight('');
                  }}
                >{opt.label}</button>
              ))}
            </div>
          </div>
        )}

        {/* 종이 종류 */}
        {paperFeel && (
          <div style={{ marginBottom: '1.3rem' }}>
            <label>종이 종류</label>
            <div className="button-group">
              {MATERIAL_MAP[paperFeel].map(mat => (
                <button
                  key={mat}
                  className={`option-button ${material === mat ? 'selected' : ''}`}
                  onClick={() => {
                    setMaterial(mat);
                    setColor('');
                    setWeight('');
                  }}
                >{mat}</button>
              ))}
            </div>
          </div>
        )}

        {/* 색상(필요할 때만) */}
        {material && COLOR_MAP[material] && (
          <div style={{ marginBottom: '1.3rem' }}>
            <label>색상</label>
            <div className="button-group">
              {COLOR_MAP[material].map(c => (
                <button
                  key={c}
                  className={`option-button ${color === c ? 'selected' : ''}`}
                  onClick={() => {
                    setColor(c);
                    setWeight('');
                  }}
                >{c}</button>
              ))}
            </div>
          </div>
        )}

        {/* 두께 */}
        {material && (!COLOR_MAP[material] || color) && (
          <div style={{ marginBottom: '1.3rem' }}>
            <label>무게</label>
            <div className="button-group">
              {WEIGHT_MAP[material].map(w => (
                <button
                  key={w}
                  className={`option-button ${weight === w ? 'selected' : ''}`}
                  onClick={() => setWeight(w)}
                >{w}</button>
              ))}
            </div>
          </div>
        )}

        {/* 인쇄 */}
        {weight && (
          <div style={{ marginBottom: '1.3rem' }}>
            <label>인쇄</label>
            <div className="button-group">
              {PRINT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`option-button ${printType === opt.value ? 'selected' : ''}`}
                  onClick={() => setPrintType(opt.value)}
                >{opt.label}</button>
              ))}
            </div>
          </div>
        )}

        {/* 코팅 */}
        {printType && (
          <div style={{ marginBottom: '1.3rem' }}>
            <label>코팅</label>
            <div className="button-group">
              {COATING_OPTIONS.map(opt => (
                <button
                  key={opt}
                  className={`option-button ${coating === opt ? 'selected' : ''}`}
                  onClick={() => setCoating(opt)}
                >{opt}</button>
              ))}
            </div>
          </div>
        )}

        {/* 모서리 둥글게 */}
        {coating && (
          <div style={{ marginBottom: '1.3rem' }}>
            <label>모서리 둥글게</label>
            <div className="button-group">
              {ROUND_OPTIONS.map(opt => (
                <button
                  key={opt}
                  className={`option-button ${round === opt ? 'selected' : ''}`}
                  onClick={() => setRound(opt)}
                >{opt}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NamecardOrder;
