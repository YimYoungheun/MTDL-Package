import React, { useState, useEffect, useRef } from 'react';
import EstimatePricePoster from './Common/EstimatePricePoster';
import ChevronsDownIcon from '../app/ChevronsDownIcon';

const SIZE_OPTIONS = [
  { code: 'A2', label: 'A2', description: '420×594mm', width: 420, height: 594 },
  { code: 'A3', label: 'A3', description: '297×420mm', width: 297, height: 420 },
  { code: 'A4', label: 'A4', description: '210×297mm', width: 210, height: 297 },
  { code: 'A5', label: 'A5', description: '148×210mm', width: 148, height: 210 },
  { code: 'B2', label: 'B2', description: '515×728mm', width: 515, height: 728 },
  { code: 'B3', label: 'B3', description: '364×515mm', width: 364, height: 515 },
  { code: 'B4', label: 'B4', description: '257×364mm', width: 257, height: 364 },
  { code: 'B5', label: 'B5', description: '182×257mm', width: 182, height: 257 },
];

const PAPER_OPTIONS = ['아트지', '스노우지'];
const WEIGHT_OPTIONS = ['100g', '120g', '150g'];
const PRINT_OPTIONS = [{ label: '단면 인쇄', value: '단면' }, { label: '양면 인쇄', value: '양면' }];
const COATING_OPTIONS = ['없음', '무광', '유광'];
const QUANTITY_OPTIONS = [500, 1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000];

function PosterOrder() {
  const [imageSrc, setImageSrc] = useState('/img/Poster.jpg');
  const [nextImageSrc, setNextImageSrc] = useState(null);
  const [prevImageSrc, setPrevImageSrc] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');
  const [printType, setPrintType] = useState('단면');
  const [coating, setCoating] = useState('');
  const [quantity, setQuantity] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleChangeImage(newSrc) {
    if (imageSrc === newSrc) return;
    setPrevImageSrc(imageSrc);
    setNextImageSrc(newSrc);
    setIsFading(true);
  }

  const handleReset = () => {
    setCompany('');
    setPhone('');
    setEmail('');
    setSelectedSize(null);
    setSelectedPaper('');
    setSelectedWeight('');
    setPrintType('단면');
    setCoating('');
    setQuantity('');
    setImageSrc('/img/Poster.jpg');
    setNextImageSrc(null);
    setPrevImageSrc(null);
    setIsFading(false);
  };
  
  useEffect(() => {
    if (!isFading) return;
    setImageSrc(nextImageSrc);
    const timer = setTimeout(() => {
      setPrevImageSrc(null);
      setNextImageSrc(null);
      setIsFading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [isFading, nextImageSrc]);

  const handleOrderSubmit = () => {
    const order = {
      company, phone, email, selectedSize, selectedPaper, selectedWeight, printType, coating, quantity,
      orderId: 'ORDER-' + new Date().getTime(),
      orderedAt: new Date().toISOString(),
    };
    console.log("🪧 포스터 주문서 요약:", order);
    handleReset();
    setShowConfirmation(true);
  };

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

 return (
    <div style={{ width: '100vw', height: '100vh', boxSizing: 'border-box', overflow: 'hidden', display: 'flex' }}>
      {/* -------- 왼쪽 이미지 -------- */}
      <div style={{ flex: 3, minWidth: 0, height: '100%', overflow: 'hidden', position: 'relative', marginTop: '35px' }}>
        {/* ... 이미지 페이드 애니메이션 ... */}
        {isFading && prevImageSrc && (
          <img src={prevImageSrc} className="img-anim fade-out"
            style={{ width: '73vw', height: '100%', objectFit: 'cover', position: 'absolute', left: 0, top: 0, pointerEvents: 'none', zIndex: 2 }}
            alt="" />
        )}
        {isFading && nextImageSrc && (
          <img src={nextImageSrc} className="img-anim fade-in"
            style={{ width: '73vw', height: '100%', objectFit: 'cover', position: 'absolute', left: 0, top: 0, zIndex: 3 }}
            alt="" />
        )}
        {imageSrc && (
          <img src={imageSrc} className="img-anim"
            style={{ width: '73vw', height: '100%', objectFit: 'cover', position: 'absolute', left: 0, top: 0, zIndex: 1 }}
            alt="" />
        )}
      </div>

      {/* -------- 오른쪽 입력폼 -------- */}
      <div
        ref={formPanelRef}
        className="form-panel"
        style={{
          flex: 1, minWidth: 0, padding: '2rem', background: '#fff',
          boxSizing: 'border-box', overflowY: 'auto', height: '100vh',
        }}
      >
        {/* ---- 입력 폼 내용 ---- */}
        {[{ label: '회사명 또는 성함', value: company, setter: setCompany },
          { label: '연락처', value: phone, setter: setPhone },
          { label: '이메일 주소', value: email, setter: setEmail }].map((f, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <label>{f.label}</label>
              <input className="custom-input long" value={f.value} onChange={e => f.setter(e.target.value)} autoComplete="off" />
            </div>
          ))}

        {/* 사이즈 선택 */}
        <div style={{ marginBottom: '1.3rem' }}>
          <label>사이즈 (mm)</label>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {SIZE_OPTIONS.filter(opt => opt.code.startsWith('A')).map(opt => (
                <button key={opt.code} className={`option-button ${selectedSize?.code === opt.code ? 'selected' : ''}`}
                  onClick={() => { setSelectedSize(opt); handleChangeImage(`/Posterimg/size_${opt.code}.png`); }}>
                  {opt.label}: {opt.description}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {SIZE_OPTIONS.filter(opt => opt.code.startsWith('B')).map(opt => (
                <button key={opt.code} className={`option-button ${selectedSize?.code === opt.code ? 'selected' : ''}`}
                  onClick={() => { setSelectedSize(opt); handleChangeImage(`/Posterimg/size_${opt.code}.png`); }}>
                  {opt.label}: {opt.description}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 용지 선택 */}      
          <div style={{ marginBottom: '1.3rem' }}>
            <label>용지 선택</label>
            <div className="button-group">
              {PAPER_OPTIONS.map(paper => (
                <button key={paper} className={`option-button ${selectedPaper === paper ? 'selected' : ''}`}
                  onClick={() => { setSelectedPaper(paper); handleChangeImage(`/Posterimg/paper_${paper}.png`); }}>
                  {paper}
                </button>
              ))}
            </div>
          </div>
        
        {/* 평량 선택 */}
           <div style={{ marginBottom: '1.3rem' }}>
            <label>평량 선택</label>
            <div className="button-group">
              {WEIGHT_OPTIONS.map(weight => (
                <button key={weight} className={`option-button ${selectedWeight === weight ? 'selected' : ''}`}
                  onClick={() => setSelectedWeight(weight)}>
                  {weight}
                </button>
              ))}
            </div>
          </div>

        {/* 인쇄 */}
         <div style={{ marginBottom: '1.3rem' }}>
            <label>인쇄</label>
            <div className="button-group">
              {PRINT_OPTIONS.map(opt => (
                <button key={opt.value} className={`option-button ${printType === opt.value ? 'selected' : ''}`}
                  onClick={() => { setPrintType(opt.value); handleChangeImage(`/Posterimg/print_${opt.value}.png`); }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

        {/* 코팅 */}
          <div style={{ marginBottom: '1.3rem' }}>
            <label>코팅</label>
            <div className="button-group">
              {COATING_OPTIONS.map(opt => (
                <button key={opt} className={`option-button ${coating === opt ? 'selected' : ''}`} onClick={() => setCoating(opt)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

        {/* 수량 */}
          <div style={{ marginBottom: '1.3rem' }}>
            <label>수량 선택</label>
            <select className="custom-select" value={quantity} onChange={e => setQuantity(e.target.value)} style={{ width: '150px' }}>
              <option value="">수량 선택</option>
              {QUANTITY_OPTIONS.map(qty => (
                <option key={qty} value={qty}>{qty.toLocaleString()}</option>
              ))}
            </select>
          </div>

        {/* 견적 + 파일업로드 + 주문 */}
        <EstimatePricePoster
          width={selectedSize?.width}
          height={selectedSize?.height}
          paperType={selectedPaper}
          paperWeight={selectedWeight}
          printType={printType}
          coating={coating}
          quantity={Number(quantity)}
        />
        <iframe className="file-upload-frame" src="https://mtdl.co.kr/fileupload" width="100%" height="170" title="파일 업로드" />
        <button className="primary-button" onClick={handleOrderSubmit}>
          바로 주문하기
        </button>
      </div>

      {/* -------- floating arrow (항상 form-panel 바깥에!) -------- */}
      {showArrow && (
        <div className="floating-down-arrow">
          <ChevronsDownIcon />
        </div>
      )}

      {/* -------- 주문 완료 알림 -------- */}
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

export default PosterOrder;