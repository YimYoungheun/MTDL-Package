import React, { useState, useEffect, useRef } from 'react';

// 필요한 데이터 import
import EstimatePriceNamecard from './Common/EstimatePriceNamecard';
import { NamecardMaterialMap as materialMap } from '../data/NamecardMaterialMap';
import { NamecardColorMap as colorMap } from '../data/NamecardColorMap';
import { NamecardWeightMap as weightMap } from '../data/NamecardWeightMap';
import ChevronsDownIcon from '../app/ChevronsDownIcon';

  const SIZE_OPTIONS = [
  { label: '90×50', width: 90, height: 50 },
  { label: '90×55', width: 90, height: 55 },
  { label: '85×55', width: 85, height: 55 }]; // 명함 고정 사이즈 옵션, 기타 상수

  const PRINT_OPTIONS = [
    { label: '단면 인쇄', value: '단면' },
    { label: '양면 인쇄', value: '양면' }];

  const foilSideOptions = ['없음', '단면', '양면'];
  const silkSideOptions = ['없음', '단면', '양면'];
  const QUANTITY_OPTIONS = [500, 1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000];


function NamecardOrder() {
  
  const formPanelRef = useRef();
  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const formPanel = formPanelRef.current;
    if (!formPanel) return;
    function handlePanelScroll() {
      const { scrollTop, scrollHeight, clientHeight } = formPanel;
      if (scrollTop + clientHeight >= scrollHeight - 10) setShowArrow(false);
      else setShowArrow(true);
    }
    formPanel.addEventListener('scroll', handlePanelScroll, { passive: true });
    handlePanelScroll();
    return () => formPanel.removeEventListener('scroll', handlePanelScroll);
  }, []);

  /* 이미지에 관여되는 const */
  const [imageSrc, setImageSrc] = useState('/img/Namecard.jpg');
  const [nextImageSrc, setNextImageSrc] = useState(null); // 전환 예약
  const [prevImageSrc, setPrevImageSrc] = useState(null);
  const [isFading, setIsFading] = useState(false);
  // 입력 const //
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const paperFeelList = Object.keys(materialMap); // ["매끄러운", "러프한", "친환경"]
  const [paperFeel, setPaperFeel] = useState('매끄러운');
  const [paperFeelIdx, setPaperFeelIdx] = useState(0);
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [printType, setPrintType] = useState('단면'); // 또는 기본값 '단면'
  const [hasCoating, setHasCoating] = useState(false);   // 스위치
  const [coatingType, setCoatingType] = useState('');    // '단면' or '양면'
  const [foilTypes, setFoilTypes] = useState([]);
  const [foilSide, setFoilSide] = useState('없음');
  const [foilSideIdx, setFoilSideIdx] = useState(0);
  const [silkSide, setSilkSide] = useState('없음');
  const [silkSideIdx, setSilkSideIdx] = useState(0);
  const [embossing, setEmbossing] = useState('없음');
  const [embossType, setEmbossType] = useState('');
  const [round, setRound] = useState('없음');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [orderCount, setOrderCount] = useState('1');
  
  // 이미지 변경 함수
function handleChangeImage(newSrc) {
  if (imageSrc === newSrc) return;
  setPrevImageSrc(imageSrc);
  setNextImageSrc(newSrc);
  setIsFading(true);      // 반드시! 먼저 true로 (이때 prevImageSrc가 존재)
}

// **딱 한 번만 isFading 상태가 true가 되면 트리거**
useEffect(() => {
  if (!isFading) return;

    setImageSrc(nextImageSrc);

  // 2. prevImageSrc는 0.3초 더 남겨두고, 이후에만 완전히 제거
  const timer = setTimeout(() => {
    setPrevImageSrc(null);   // 페이드아웃 이미지 삭제
    setNextImageSrc(null);   // 페이드인 이미지도 삭제
    setIsFading(false);      // 애니메이션 종료
  }, 300); // 0.3초 동안 둘 다 겹쳐있음

    return () => clearTimeout(timer);
}, [isFading, nextImageSrc]);

  // 옵션 분기함수
  const getColorOptions = () => (
    paperFeel === '러프한' ? (colorMap[material] || []) : []
  );
  const getWeightOptions = () => {
    if (paperFeel === '매끄러운' || paperFeel === '친환경') {
      return weightMap[paperFeel]?.[material] || [];
    }
    if (paperFeel === '러프한' && material) {
      if (weightMap['러프한']?.[material]?.[color]) {
        return weightMap['러프한'][material][color];
      }
      if (Array.isArray(weightMap['러프한'][material])) {
        return weightMap['러프한'][material];
      }
      return [];
    }
    return [];
  };
  const handleReset = () => {
    setCompany('');
    setPhone('');
    setEmail('');
    setSelectedSize(null);
    setPaperFeel('매끄러운');
    setPaperFeelIdx(0);
    setMaterial('');
    setColor('');
    setWeight('');
    setPrintType('단면');
    setCoating('없음');
    setCoatingType('');
    setFoilTypes([]);
    setFoilSide('없음');
    setFoilSideIdx(0);
    setSilkSide('없음');
    setSilkSideIdx(0);
    setEmbossing('없음');
    setEmbossType('');
    setRound('없음');
    setShowConfirmation(false);
    setQuantity('');
    setOrderCount('1');
    setImageSrc('/img/Namecard.jpg');
    setNextImageSrc(null);
    setPrevImageSrc(null);
    setIsFading(false);
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
      foilFace: foilSide,
      foilTypes,
      embossing,
      embossType,
      silkSide,
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
    <div style={{ width: '100vw', height: '100vh', boxSizing: 'border-box', overflow: 'hidden', display: 'flex' }}>
      {/* 왼쪽 이미지 */}
      <div style={{ flex: 3, minWidth: 0, height: '100%', overflow: 'hidden', position: 'relative', marginTop: '35px' }}>
        {/* 페이드아웃 중일 땐 이전 이미지만 노출 */}
        {isFading && prevImageSrc && (
          <img
            src={prevImageSrc}
            className="img-anim fade-out"
            style={{
              width: '73vw',
              height: '100%',
              objectFit: 'cover',
              position: 'relative',
              left: 0, top: 0,
              pointerEvents: 'none',
              zIndex: 2,
            }}
            alt=""
          />
        )}
        {/* 페이드 끝나면 새 이미지만 노출 */}
        {!isFading && imageSrc && (
          <img
            src={imageSrc}
            className="img-anim fade-in"
            style={{
              width: '73vw',
              height: '100%',
              objectFit: 'cover',
              position: 'positive',
              left: 0, top: 0,
              zIndex: 2,
            }}
            alt=""
          />
        )}
      </div>

      {/* 오른쪽 입력폼 */}
      <div
        ref={formPanelRef}
        className="form-panel"
        style={{
          flex: 1, minWidth: 0, padding: '2rem', background: '#fff',
          boxSizing: 'border-box', overflowY: 'auto', height: '100vh',
        }}
      >
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
                  handleChangeImage(`/Namecardimg/size_${opt.label}.jpg`);
                }}
              >{opt.label}</button>
            ))}
          </div>
        </div>

          {/* 종이 느낌 */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: 5 }}>종이 느낌</label>
            <div className="toggle-group" style={{ position: 'relative' }}>
              {/* 🔵 토글 배경 */}
              <div
                className="toggle-bg"
                style={{
                  left: `${paperFeelIdx * (100 / paperFeelList.length)}%`,
                  width: `${100 / paperFeelList.length}%`,
                }}
              />
              {paperFeelList.map((feel, i) => (
                <button
                  key={feel}
                  className={`toggle-btn${paperFeelIdx === i ? ' selected' : ''}`}
                  onClick={() => {
                    setPaperFeelIdx(i);
                    setPaperFeel(feel);
                    setMaterial('');
                    setColor('');
                    setWeight('');
                  }}
                  type="button"
                  style={{ borderRadius: '12px', zIndex: 2 }}
                >
                  {feel}
                </button>
              ))}
            </div>
          </div>

          {/* 재질(종이) */}
          {paperFeel && (
            <div style={{ marginBottom: '1rem' }}>
              <label>종이</label>
              <div className="button-group">
                {(materialMap[paperFeel] || []).map(mat => (
                  <button
                    key={mat}
                    className={`option-button ${material === mat ? 'selected' : ''}`}
                    onClick={() => {
                      setMaterial(mat);
                      setColor('');
                      setWeight('');
                      // 이 부분 추가!
                      handleChangeImage(`/Namecardimg/material_${mat}.jpg`);
                    }}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 무게 */}
          {paperFeel && paperFeel !== '러프한' && material && (
            <div style={{ marginBottom: '1rem' }}>
              <label>무게</label>
              <div className="button-group">
                {(weightMap[paperFeel]?.[material] || []).map(w => (
                  <button
                    key={w}
                    className={`option-button ${weight === w ? 'selected' : ''}`}
                    onClick={() => setWeight(w)}
                  >{w}</button>
                ))}
              </div>
            </div>
          )}

          {/* 무게 - 러프한 */}
          {paperFeel === '러프한' && material && color && (
            <div style={{ marginBottom: '1rem' }}>
              <label>무게</label>
              <div className="button-group">
                {(weightMap["러프한"]?.[material]?.[color] || []).map(w => (
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
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: 5 }}>인쇄</label>
            <div className="toggle-group" style={{ position: 'relative' }}>
              {/* 슬라이드 배경 */}
              <div
                className="toggle-bg"
                style={{
                  left: `${(printType === '양면' ? 1 : 0) * 50}%`,
                  width: '50%',
                }}
              />
              {['단면', '양면'].map((type, i) => (
                <button
                  key={type}
                  className={`toggle-btn${printType === type ? ' selected' : ''}`}
                  onClick={() => {
                    setPrintType(type);
                    handleChangeImage(`/Namecardimg/printType_${type}.png`);
                  }}
                  type="button"
                  style={{ borderRadius: '12px', zIndex: 2 }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 코팅 */}
            <div className="option-block">
              <label className="option-label">코팅</label>
              {/* 스위치 */}
              <label className="switch-toggle" style={{ position: 'relative', marginBottom: '0.7em' }}>
                <input
                  type="checkbox"
                  className="switch-input"
                  checked={hasCoating}
                  onChange={e => {
                    setHasCoating(e.target.checked);
                    if (!e.target.checked) setCoatingType('');
                  }}
                />
                <span className="switch-slider" />
                <span className="switch-label">{hasCoating ? "있음" : "없음"}</span>
              </label>

              {/* 있음일 때만 하위 옵션 */}
              {hasCoating && (
                <div className="button-group" style={{ marginTop: 8 }}>
                  {['단면', '양면'].map(opt => (
                    <button
                      key={opt}
                      className={`option-button${coatingType === opt ? ' selected' : ''}`}
                      onClick={() => setCoatingType(opt)}
                      type="button"
                    >{opt}</button>
                  ))}
                </div>
              )}
            </div>

            
          {/* 형압 */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: 5 }}>형압</label>
            <div className="toggle-group" style={{ position: 'relative' }}>
              {/* 슬라이드 배경 */}
              <div
                className="toggle-bg"
                style={{
                  left: `${(['없음', '있음'].indexOf(embossing)) * 50}%`,
                  width: '50%',
                }}
              />
              {['없음', '있음'].map((type) => (
                <button
                  key={type}
                  className={`toggle-btn${embossing === type ? ' selected' : ''}`}
                  onClick={() => {
                    setEmbossing(type);
                    if (type === '없음') setEmbossType('');
                  }}
                  type="button"
                  style={{ borderRadius: '12px', zIndex: 2 }}
                >
                  {type}
                </button>
              ))}
            </div>

              {/* 형압이 '있음'일 때만 음각/양각 노출 */}
              {embossing === '있음' && (
                <div className="button-group" style={{ marginTop: 8 }}>
                  {['음각', '양각'].map((type) => (
                    <button
                      key={type}
                      className={`option-button${embossType === type ? ' selected' : ''}`}
                      onClick={() => setEmbossType(type)}
                      type="button"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 박 */}
            <div className="option-block">
              <label className="option-label">박</label>
              <div className="toggle-group" style={{ position: 'relative' }}>
                {/* 슬라이드 배경 */}
                <div
                  className="toggle-bg"
                  style={{
                    left: `${foilSideIdx * (100 / foilSideOptions.length)}%`,
                    width: `${100 / foilSideOptions.length}%`,
                  }}
                />
                {foilSideOptions.map((opt, i) => (
                  <button
                    key={opt}
                    className={`toggle-btn${foilSideIdx === i ? ' selected' : ''}`}
                    onClick={() => {
                      setFoilSideIdx(i);
                      setFoilSide(opt);
                    }}
                    type="button"
                    style={{ borderRadius: '12px', zIndex: 2 }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {/* 아래 박 종류 선택 (단면/양면 선택 시 노출) */}
              {foilSide !== '없음' && (
                <div className="button-group" style={{ marginTop: 8 }}>
                  {['금박', '은박', '먹박', '적박', '홀로그램박', '투명홀로그램박'].map(type => (
                    <button
                      key={type}
                      className={`option-button ${foilTypes.includes(type) ? 'selected' : ''}`}
                      onClick={() =>
                        setFoilTypes(prev =>
                          prev.includes(type)
                            ? prev.filter(t => t !== type)
                            : [...prev, type]
                        )
                      }
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 부분 실크 */}
            <div className="option-block">
              <label className="option-label">부분 실크</label>
              <div className="toggle-group" style={{ position: 'relative' }}>
                {/* 슬라이드 배경 */}
                <div
                  className="toggle-bg"
                  style={{
                    left: `${silkSideIdx * (100 / silkSideOptions.length)}%`,
                    width: `${100 / silkSideOptions.length}%`,
                  }}
                />
                {silkSideOptions.map((opt, i) => (
                  <button
                    key={opt}
                    className={`toggle-btn${silkSideIdx === i ? ' selected' : ''}`}
                    onClick={() => {
                      setSilkSideIdx(i);
                      setSilkSide(opt);
                    }}
                    type="button"
                    style={{ borderRadius: '12px', zIndex: 2 }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 모서리 둥글게 */}
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', marginBottom: 5 }}>모서리 둥글게</label>
              <div className="toggle-group" style={{ position: 'relative' }}>
                {/* 동적으로 left 변경! */}
                <div
                  className="toggle-bg"
                  style={{
                    left: `${round === '둥글게' ? 50 : 0}%`,
                    width: '50%',
                  }}
                />
                {['없음', '둥글게'].map(type => (
                  <button
                    key={type}
                    className={`toggle-btn${round === type ? ' selected' : ''}`}
                    onClick={() => {
                      setRound(type);
                      handleChangeImage(`/Namecardimg/round_${type}.png`);
                    }}
                    type="button"
                    style={{ borderRadius: '12px', zIndex: 1 }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 수량 + 건수 선택 */}
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

                  {/* 견적가 컴포넌트 */}
                    <EstimatePriceNamecard
                      width={selectedSize?.width}
                      height={selectedSize?.height}
                      paperFeel={paperFeel}
                      paperType={material}
                      color={color}
                      paperWeight={weight}
                      printType={printType}
                      coating={coatingType}
                      round={round}
                      quantity={Number(quantity) * Number(orderCount)}
                      foilFace={foilSide}   // foilFace만 전달
                      foilTypes={foilTypes}
                      embossing={embossing}
                      silkSide={silkSide}
                    />
                  {/* 파일 업로드 및 주문버튼 */}
                  <iframe
                    className="file-upload-frame"
                    src="https://mtdl.co.kr/fileupload"
                    width="100%"
                    height="170"
                    title="파일 업로드"
                  />
            <button className="primary-button" onClick={handleOrderSubmit}>
              바로 주문하기
            </button>
          </div>

      {/* ▼▼▼ floating arrow (항상 패널 div 바깥에!) ▼▼▼ */}
      {showArrow && (
        <div className="floating-down-arrow">
          <ChevronsDownIcon />
        </div>
      )}

      {/* 주문 완료 알림 */}
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
  );
}

export default NamecardOrder;