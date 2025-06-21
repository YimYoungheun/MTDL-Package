import React, { useState, useRef, useEffect } from "react";
import EstimatePrice from './Common/EstimatePriceB';
import { weightMap } from '../data/weightMap';
import { colorMap } from '../data/colorMap';
import { materialMap } from '../data/materialMap';
import ChevronsDownIcon from '../app/ChevronsDownIcon';

function BBoxOrder() {
  // 상태 선언부
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const bottomStyleList = ["맞뚜껑", "십자다루마", "삼면접착"];
  const [bottomStyle, setBottomStyle] = useState(0);
  const paperFeelList = Object.keys(materialMap); // ["매끄러운", "러프한", "친환경"]
  const [paperFeel, setPaperFeel] = useState('매끄러운');
  const [paperFeelIdx, setPaperFeelIdx] = useState(0);
  const [material, setMaterial] = useState('');
  const [hasPrinting, setHasPrinting] = useState(false);
  const [mainPrintColor, setMainPrintColor] = useState('');
  const [spotPrintColor, setSpotPrintColor] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [hasCoating, setHasCoating] = useState(false);
  const [coating, setCoating] = useState('');
  const [hasEmbossing, setHasEmbossing] = useState(false);
  const [embossing, setEmbossing] = useState('');
  const [hasFoil, setHasFoil] = useState(false);
  const [foil, setFoil] = useState([]);
  const [hasSilk, setHasSilk] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [customQuantity, setCustomQuantity] = useState("");
  
  // ▼ floating arrow 표시 여부
  const [showArrow, setShowArrow] = useState(true);
  const formPanelRef = useRef();

  // 리셋 함수
  const handleReset = () => {
    setCompany('');
    setPhone('');
    setEmail('');
    setWidth('');
    setLength('');
    setHeight('');
    setBottomStyle(0);
    setPaperFeel('매끄러운');
    setPaperFeelIdx(0);
    setMaterial('');
    setHasPrinting(false);
    setMainPrintColor('');
    setSpotPrintColor('');
    setColor('');
    setWeight('');
    setHasCoating(false);
    setCoating('');
    setHasEmbossing(false);
    setEmbossing('');
    setHasFoil(false);
    setFoil([]);
    setHasSilk(false);
    setQuantity('');
    setCustomQuantity('');
  };

  // 주문서 제출
  const handleOrderSubmit = () => {
    const order = {
      company, phone, email, width, length, height,
      paperFeel, material, color, weight, coating, embossing, foil,
      quantity: quantity === '그 외 수량' ? customQuantity : quantity,
      mainPrintColor, spotPrintColor,
      orderId: 'ORDER-' + new Date().getTime(),
      orderedAt: new Date().toISOString(),
    };
    console.log("📦 주문서 요약:", order);
    handleReset();
    setShowConfirmation(true);
  };

  // 스크롤 시 floating arrow 노출 제어
useEffect(() => {
  const formPanel = formPanelRef.current;
  if (!formPanel) return;

  function handlePanelScroll() {
    // 오른쪽 패널 "내부" 스크롤만 감지!
    const { scrollTop, scrollHeight, clientHeight } = formPanel;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setShowArrow(false);  // 다 내리면 화살표 숨김
    } else {
      setShowArrow(true);   // 아직 더 내릴 수 있으면 화살표 노출
    }
  }

  // formPanel에만 scroll 이벤트 붙이기
  formPanel.addEventListener('scroll', handlePanelScroll, { passive: true });
  // mount 시 바로 한 번 체크
  handlePanelScroll();

  return () => formPanel.removeEventListener('scroll', handlePanelScroll);
}, []);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', boxSizing: 'border-box', overflow: 'hidden' }}>
      {/* 왼쪽 이미지 */}
      <div style={{ flex: 3, minWidth: 0, height: '100%', overflow: 'hidden', marginTop: '35px' }}>
        <img
          src="/img/Designers.png"
          alt="B형 상자"
          style={{ width: '73vw', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '0' }}
        />
      </div>
      {/* 오른쪽 패널 */}
      <div style={{ flex: 1, minWidth: 0, background: '#fff', height: '100vh', position: 'relative' }}>
        <div
          ref={formPanelRef}
          className="form-panel"
          style={{
            position: 'relative',
            height: '100vh',
            overflowY: 'auto',
            padding: '2rem',
            boxSizing: 'border-box',
          }}
        >
        {/* 여기부터 모든 입력폼(회사명~버튼) 전부 포함 */}
        {[{ label: '회사명 또는 성함', value: company, setter: setCompany },
          { label: '연락처', value: phone, setter: setPhone },
          { label: '이메일 주소', value: email, setter: setEmail }].map((f, i) => (
          <div key={i} style={{ marginBottom: '1rem' }}>
            <label>{f.label}</label>
            <input className="custom-input long" value={f.value} onChange={e => f.setter(e.target.value)} />
          </div>
        ))}

        {/* 내경 입력 */}
        <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginBottom: '1rem', display: 'block' }}>내경 (mm)</label>
        <div className="flex-row" style={{ gap: '1rem' }}>
            <div className="input-wrap">
            <label className="floating-label">가로</label>
            <input
                type="text"
                className="modern-input input-short"
                value={width}
                onChange={e => setWidth(e.target.value)}
            />
            </div>
            <div className="input-wrap">
            <label className="floating-label">세로</label>
            <input
                type="text"
                className="modern-input input-short"
                value={length}
                onChange={e => setLength(e.target.value)}
            />
            </div>
            <div className="input-wrap">
            <label className="floating-label">높이</label>
            <input
                type="text"
                className="modern-input input-short"
                value={height}
                onChange={e => setHeight(e.target.value)}
            />
            </div>
        </div>
        </div>

        {/* 하단 모양 */}
        <div style={{ marginBottom: '1rem' }}>
        <label>하단 모양</label>
        <div className="toggle-group" style={{ position: 'relative' }}>
            {/* 슬라이드 배경 */}
            <div
            className="toggle-bg"
            style={{
                left: `${bottomStyle * (100 / bottomStyleList.length)}%`,
                width: `${100 / bottomStyleList.length}%`,
            }}
            />
            {bottomStyleList.map((txt, i) => (
            <button
                key={txt}
                className={`toggle-btn${bottomStyle === i ? ' selected' : ''}`}
                onClick={() => setBottomStyle(i)}
                type="button"
                style={{ borderRadius: '12px', zIndex: 2 }}
            >
                {txt}
            </button>
            ))}
        </div>
        </div>

        {/* 종이 느낌 */}
        <div style={{ marginBottom: '1rem' }}>
        <label>종이 느낌</label>
        <div className="toggle-group">
            {/* 슬라이드 배경 */}
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
                }}
                >{mat}</button>
            ))}
            </div>
        </div>
        )}

        {/* 러프한 때만 색상 */}
        {paperFeel === '러프한' && material && (
        <div style={{ marginBottom: '1rem' }}>
            <label>색상</label>
            <div className="button-group">
            {(colorMap[material] || []).map(c => (
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

        {/* 무게 - 매끄러운/친환경 */}
        {paperFeel && paperFeel !== '러프한' && material && (
        <div style={{ marginBottom: '1rem' }}>
            {(() => {
            return null;
            })()}
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
            {(() => {
            return null;
            })()}
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


        {/* 인쇄 선택 */}
            <div className="option-block">
            <label className="option-label">인쇄 선택</label>
            <div className="switch-row">
                <label className="switch-toggle" style={{ position: 'relative' }}>
                <input
                    type="checkbox"
                    className="switch-input"
                    checked={hasPrinting}
                    onChange={e => {
                    setHasPrinting(e.target.checked);
                    if (!e.target.checked) {
                        setMainPrintColor('');
                        setSpotPrintColor('');
                    }
                    }}
                />
                <span className="switch-slider" />
                <span className="switch-label">{hasPrinting ? "있음" : "없음"}</span>
                </label>
            </div>
            
            {/* 인쇄 있음일 때만 노출 */}
            {hasPrinting && (
                <>
                <div className="button-group" style={{ marginTop: '0.7em' }}>
                    {['1도', '2도', '3도', '4도'].map(type => (
                    <button
                        key={type}
                        className={`option-button ${mainPrintColor === type ? 'selected' : ''}`}
                        onClick={() => setMainPrintColor(prev => prev === type ? '' : type)}
                    >
                        {type}
                    </button>
                    ))}
                </div>
                <div className="button-group" style={{ marginTop: '0.3em' }}>
                    {['별색 1도', '별색 2도', '별색 3도', '별색 4도'].map(type => (
                    <button
                        key={type}
                        className={`option-button ${spotPrintColor === type ? 'selected' : ''}`}
                        onClick={() => setSpotPrintColor(prev => prev === type ? '' : type)}
                    >
                        {type}
                    </button>
                    ))}
                </div>
                </>
            )}
            </div>


        {/* 코팅 */}
            <div className="option-block">
            <label className="option-label">코팅</label>
            <div style={{ display: "flex", alignItems: "center" }}>
                <label className="switch-toggle" style={{ position: 'relative' }}>
                <input
                    type="checkbox"
                    className="switch-input"
                    checked={hasCoating}
                    onChange={e => {
                    setHasCoating(e.target.checked);
                    if (!e.target.checked) setCoating('');
                    }}
                />
                <span className="switch-slider" />
                <span className="switch-label">{hasCoating ? "있음" : "없음"}</span>
                </label>
            </div>

            {/* 코팅 옵션: 있음일 때만 노출 */}
            {hasCoating && (
                <div className="button-group" style={{ marginTop: '0.7em' }}>
                {['무광', '유광', '벨벳'].map(type => (
                    <button
                    key={type}
                    className={`option-button ${coating === type ? 'selected' : ''}`}
                    onClick={() => setCoating(type)}
                    >
                    {type}
                    </button>
                ))}
                </div>
            )}
            </div>

            <div className="option-block">
            <label className="option-label">박</label>
            <label className="switch-toggle" style={{ position: 'relative', marginBottom: '0.8rem' }}>
                <input
                type="checkbox"
                className="switch-input"
                checked={hasFoil}
                onChange={e => {
                    setHasFoil(e.target.checked);
                    if (!e.target.checked) setFoil([]);
                }}
                />
                <span className="switch-slider" />
                <span className="switch-label">{hasFoil ? "있음" : "없음"}</span>
            </label>

            {/* 있음일 때만 복수 선택 옵션 노출 */}
            {hasFoil && (
                <div className="button-group">
                {['금박', '은박', '먹박', '적박', '홀로그램박', '투명홀로그램박'].map(type => (
                    <button
                    key={type}
                    className={`option-button ${foil.includes(type) ? 'selected' : ''}`}
                    onClick={() =>
                        setFoil(prev =>
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

            <div className="option-block">
            <label className="option-label">형압</label>
            <label className="switch-toggle" style={{ position: 'relative', marginBottom: '0.8rem' }}>
                <input
                type="checkbox"
                className="switch-input"
                checked={hasEmbossing}
                onChange={e => {
                    setHasEmbossing(e.target.checked);
                    if (!e.target.checked) setEmbossing('');
                }}
                />
                <span className="switch-slider" />
                <span className="switch-label">{hasEmbossing ? "있음" : "없음"}</span>
            </label>

            {hasEmbossing && (
                <div className="button-group">
                {['음각', '양각'].map(type => (
                    <button
                    key={type}
                    className={`option-button ${embossing === type ? 'selected' : ''}`}
                    onClick={() => setEmbossing(type)}
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
                <div className="switch-row">
                    <label className="switch-toggle" style={{ position: 'relative' }}>
                    <input
                        type="checkbox"
                        className="switch-input"
                        checked={hasSilk}
                        onChange={e => setHasSilk(e.target.checked)}
                    />
                    <span className="switch-slider" />
                    <span className="switch-label">{hasSilk ? "있음" : "없음"}</span>
                    </label>
                </div>
            </div>

            {/* 수량 */}
            <div style={{ marginBottom: '1rem' }}>
            <label>수량 선택</label>
            <div className="button-group">
                <select className="custom-select" value={quantity} onChange={e => setQuantity(e.target.value)}>
                <option value="">수량을 선택하세요</option>
                {[500, 1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000, '그 외 수량'].map(qty => (
                    <option key={qty} value={String(qty)}>{qty === '그 외 수량' ? '그 외 수량' : Number(qty).toLocaleString()}</option>
                ))}
                </select>
            </div>
            </div>
            {quantity === '그 외 수량' && (
            <div style={{ marginBottom: '1rem' }}>
                <label>희망 수량 입력</label>
                <input
                className="custom-input qty"
                type="number"
                min="1" 
                step="1"
                value={customQuantity}
                onChange={e => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) setCustomQuantity(val);
                }}
                placeholder="예: 10000"
                />
            </div>
            )}

        {/* 견적 컴포넌트, 파일업로드, 주문버튼 등은 동일 */}
          <EstimatePrice
            width={width}
            length={length}
            height={height}
            bottomStyle={bottomStyle}
            paperFeel={paperFeel}
            paperType={material}
            paperWeight={weight}
            color={color}
            quantity={quantity === '그 외 수량' ? customQuantity : quantity}
            coatingType={hasCoating ? coating : '없음'}
            foil={hasFoil ? foil : []}
            embossing={hasEmbossing ? embossing : ''}
            mainPrintColor={hasPrinting ? mainPrintColor : ''}
            spotPrintColor={hasPrinting ? spotPrintColor : ''}
            printNone={!hasPrinting || (!mainPrintColor && !spotPrintColor)}
            hasSilk={hasSilk}
          />
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
        {/* ▼▼▼ floating arrow는 오른쪽 패널에 붙이기! ▼▼▼ */}
        {showArrow && (
            <div className={`floating-down-arrow${showArrow ? '' : ' hide'}`}>
            <ChevronsDownIcon />
            </div>
        )}
      </div>
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

export default BBoxOrder;