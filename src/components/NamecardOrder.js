import React, { useState } from 'react';
import '../App.css';

// 필요한 데이터 import
import EstimatePriceNamecard from './Common/EstimatePriceNamecard';
import { NamecardMaterialMap } from '../data/NamecardMaterialMap';
import { NamecardColorMap } from '../data/NamecardColorMap';
import { NamecardWeightMap } from '../data/NamecardWeightMap';

// 명함 고정 사이즈 옵션, 기타 상수
const SIZE_OPTIONS = [
  { label: '90×50', width: 90, height: 50 },
  { label: '90×55', width: 90, height: 55 },
  { label: '85×55', width: 85, height: 55 }
];
const PRINT_OPTIONS = [
  { label: '단면 인쇄', value: '단면' },
  { label: '양면 인쇄', value: '양면' }
];
const COATING_OPTIONS = ['없음', '무광', '유광', '벨벳'];
const ROUND_OPTIONS = ['없음', '둥글게'];
const QUANTITY_OPTIONS = [500, 1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000];

function NamecardOrder() {
  // ====== useState 선언부는 무조건 컴포넌트 함수 내부! ======
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [paperFeel, setPaperFeel] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [printType, setPrintType] = useState('');
  const [coating, setCoating] = useState('');
  const [foilFace, setFoilFace] = useState('없음');    // 단면/양면/없음
  const [foilTypes, setFoilTypes] = useState([]);      // 복수 선택
  const [embossFace, setEmbossFace] = useState('없음'); // 단면/양면/없음
  const [embossShape, setEmbossShape] = useState([]);   // ['음각'] or ['양각'] or []
  const [round, setRound] = useState('없음');
  const [quantity, setQuantity] = useState('');   // ⬅️ 반드시 여기!
  const [orderCount, setOrderCount] = useState('1'); // ⬅️ 반드시 여기!
  const [showConfirmation, setShowConfirmation] = useState(false);
  const totalQuantity = quantity && orderCount
    ? String(Number(quantity) * Number(orderCount))
    : '';
  // 옵션 분기함수
  const getColorOptions = () => (
    paperFeel === '러프한' ? (NamecardColorMap[material] || []) : []
  );
  const getWeightOptions = () => {
  if (paperFeel === '매끄러운' || paperFeel === '친환경') {
    return NamecardWeightMap[paperFeel]?.[material] || [];
  }
  if (paperFeel === '러프한' && material) {
    // 1. 색상 옵션이 있을 경우(선택된 color 사용)
    if (NamecardWeightMap['러프한']?.[material]?.[color]) {
      return NamecardWeightMap['러프한'][material][color];
    }
    // 2. 색상 옵션이 없을 경우(즉, 무게 배열이 그냥 있음)
    // -> NamecardWeightMap['러프한'][material]이 배열이면 바로 리턴
    if (Array.isArray(NamecardWeightMap['러프한'][material])) {
      return NamecardWeightMap['러프한'][material];
    }
    // 3. 아니면 빈 배열
    return [];
  }
  return [];
};

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
    setQuantity('');
    setOrderCount('1');
  };

  // 주문 버튼 클릭 처리
  const handleOrderSubmit = () => {
    const order = {
      company,
      phone,
      email,
      selectedSize,
      paperFeel,
      material,
      color,
      weight,
      printType,
      coating,
      round,
      quantity: Number(quantity) * Number(orderCount),
      foilFace,
      foilTypes,
      embossFace,
      embossShape,
      orderId: 'ORDER-' + new Date().getTime(),
      orderedAt: new Date().toISOString(),
    };

  // ✅ 콘솔에 주문 정보 출력 (→ 실제 PG사 연동에서 사용할 수 있음)
  console.log("🪪 명함 주문서 요약:", order);

  // 주문 완료 메시지 띄우기
  handleReset();
  setShowConfirmation(true);
};
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', boxSizing: 'border-box', overflow: 'hidden' }}>
      {/* 왼쪽 이미지 */}
      <div style={{ flex: 3.6, minWidth: 0, height: '100%', overflow: 'hidden' }}>
        <img
          src="/img/Namecard.jpg"
          alt="명함"
          style={{ width: '73vw', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 0 }}
        />
      </div>
      {/* 오른쪽 입력폼 */}
       <div style={{ flex: 1, minWidth: 0, padding: '2rem', background: '#fff', boxSizing: 'border-box', overflowY: 'auto' }}>
        <button className="secondary-button" onClick={handleReset} style={{ marginBottom: 16 }}>
          처음부터 입력 다시하기
        </button>
        {/* 기본 입력 */}
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
          <div style={{ marginBottom: '1rem' }}>
            <label>종이 느낌</label>
            <div className="button-group">
              {Object.keys(NamecardMaterialMap).map(feel => (
                <button
                  key={feel}
                  className={`option-button ${paperFeel === feel ? 'selected' : ''}`}
                  onClick={() => {
                    setPaperFeel(feel);
                    setMaterial('');
                    setColor('');
                    setWeight('');
                  }}
                >
                  {feel === '매끄러운' ? '스탠다드' : '고급명함'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 재질 */}
        {selectedSize && paperFeel && (
          <div style={{ marginBottom: '1rem' }}>
            <label>재질</label>
            <div className="button-group">
              {NamecardMaterialMap[paperFeel].map(mat => (
                <button
                  key={mat}
                  className={`option-button ${material === mat ? 'selected' : ''}`}
                  onClick={() => {
                    setMaterial(mat);
                    setColor('');
                    setWeight('');
                  }}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 색상 선택 (러프한 & 색상 옵션이 있는 경우만) */}
        {selectedSize && paperFeel === '러프한' && material && getColorOptions().length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <label>색상</label>
            <div className="button-group">
              {getColorOptions().map(c => (
                <button
                  key={c}
                  className={`option-button ${color === c ? 'selected' : ''}`}
                  onClick={() => {
                    setColor(c);
                    setWeight('');
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 무게 */}
        {selectedSize && material && getWeightOptions().length > 0 && (
          <div style={{ marginBottom: '1rem' }}>
            <label>무게</label>
            <div className="button-group">
              {getWeightOptions().map(w => (
                <button
                  key={w}
                  className={`option-button ${weight === w ? 'selected' : ''}`}
                  onClick={() => setWeight(w)}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* 인쇄 */}
        {selectedSize && weight && (
          <div style={{ marginBottom: '1.3rem' }}>
            <label>인쇄</label>
            <div className="button-group">
              {PRINT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`option-button ${printType === opt.value ? 'selected' : ''}`}
                  onClick={() => setPrintType(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 코팅 */}
        {selectedSize && weight && printType && (
          <div style={{ marginBottom: '1.3rem' }}>
            <label>코팅</label>
            <div className="button-group">
              {COATING_OPTIONS.map(opt => (
                <button
                  key={opt}
                  className={`option-button ${coating === opt ? 'selected' : ''}`}
                  onClick={() => setCoating(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 박 - 그룹1: 단면/양면/없음 (하나만) */}
        {selectedSize && weight && printType && coating && (
          <div style={{ marginBottom: '0.5rem' }}>
            <label>박</label>
            <div className="button-group">
              {['없음', '단면', '양면'].map(type => (
                <button
                  key={type}
                  className={`option-button ${foilFace === type ? 'selected' : ''}`}
                  onClick={() => {
                    setFoilFace(type);
                    if (type === '없음') setFoilTypes([]);
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
            {/* 박 - 그룹2: 금박, 은박 등 복수 선택 */}
            {foilFace !== '없음' && (
              <div className="button-group" style={{ marginBottom: '1rem' }}>
                {['금박', '은박', '먹박', '적박', '홀로그램박', '투명홀로그램박'].map(type => (
                  <button
                    key={type}
                    className={`option-button ${foilTypes.includes(type) ? 'selected' : ''}`}
                    onClick={() => {
                      setFoilTypes(prev =>
                        prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
                      );
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* 형압 - 그룹1: 단면/양면/없음 (하나만) */}
        {selectedSize && weight && printType && coating && foilFace && foilTypes && (
          <div style={{ marginBottom: '0.5rem' }}>
            <label>형압</label>
            <div className="button-group">
              {['없음', '단면', '양면'].map(type => (
                <button
                  key={type}
                  className={`option-button ${embossFace === type ? 'selected' : ''}`}
                  onClick={() => {
                    setEmbossFace(type);
                    if (type === '없음') setEmbossShape([]);
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
            {/* 형압 - 그룹2: 음각/양각 (하나만 선택) */}
            {embossFace !== '없음' && (
              <div className="button-group" style={{ marginBottom: '1rem' }}>
                {['음각', '양각'].map(shape => (
                  <button
                    key={shape}
                    className={`option-button ${embossShape[0] === shape ? 'selected' : ''}`}
                    onClick={() => setEmbossShape([shape])}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* 모서리 둥글게 */}
        {selectedSize && weight && printType && coating && foilFace && foilTypes && embossFace && embossShape && (
          <div style={{ marginBottom: '1.3rem' }}>
            <label>모서리 둥글게</label>
            <div className="button-group">
              {ROUND_OPTIONS.map(opt => (
                <button
                  key={opt}
                  className={`option-button ${round === opt ? 'selected' : ''}`}
                  onClick={() => setRound(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* 수량 + 건수 선택 */}
        {selectedSize && weight && printType && coating && foilFace && foilTypes && embossFace && embossShape && round && (
          <div style={{ marginBottom: '1.3rem' }}>
            <label>수량 및 건수 선택</label>
            <div className="button-group" style={{ alignItems: 'center', gap: '1rem' }}>
              <select
                className="custom-select"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                style={{ width: '150px' }}
              >
                <option value="">수량 선택</option>
                {QUANTITY_OPTIONS.map(qty => (
                  <option key={qty} value={qty}>
                    {Number(qty).toLocaleString()}
                  </option>
                ))}
              </select>
              <span style={{ fontWeight: 600 }}>×</span>
              <select
                className="custom-select"
                value={orderCount}
                onChange={e => setOrderCount(e.target.value)}
                style={{ width: '90px' }}
              >
                {Array.from({ length: 10 }, (_, i) => (i + 1)).map(cnt => (
                  <option key={cnt} value={cnt}>{cnt}건</option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        {/* (예비) 견적가 컴포넌트 */}
        {selectedSize && weight && printType && coating && foilFace && foilTypes && embossFace && embossShape && round && quantity &&(
          <>
            <EstimatePriceNamecard
              width={selectedSize?.width}
              height={selectedSize?.height}
              paperFeel={paperFeel}
              paperType={material}
              color={color}
              paperWeight={weight}
              printType={printType}
              coating={coating}
              round={round}
              quantity={Number(quantity) * Number(orderCount)}
              foilFace={foilFace}
              foilTypes={foilTypes}
              embossFace={embossFace}
              embossShape={embossShape}
            />

        
            {/* 파일 업로드 */}
            <iframe
              className="file-upload-frame"
              src="https://mtdl.co.kr/fileupload"
              width="100%"
              height="170"
              title="파일 업로드"
            />
            <button className="primary-button" onClick={handleOrderSubmit} style={{ marginTop: 18 }}>
              바로 주문하기
            </button>
          </>
        )}
        
        {/* 주문 완료 오버레이 */}
        {showConfirmation && (
          <div className="confirmation-overlay">
            <div className="confirmation-message">
              <strong>주문이 접수되었습니다!</strong>
              <br />나머지 결제를 진행해주세요
              <br /><br />
              <button className="primary-button" onClick={() => setShowConfirmation(false)}>
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NamecardOrder;
