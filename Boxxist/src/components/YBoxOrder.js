import React, { useState, useEffect} from 'react';
import EstimatePriceY from './Common/EstimatePriceY';

// 필요한 데이터 import
import { weightMap } from '../data/weightMap';
import { colorMap } from '../data/colorMap';
import { materialMap } from '../data/materialMap';

function YBoxOrder() {
  // 기존 App.js 상태값들 그대로 복붙!
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [thickness, setThickness] = useState(''); // <-- 빈 문자열이 기본값
  const [cover, setCover] = useState(''); // 빈 문자열이 기본값
  const paperFeelList = Object.keys(materialMap); // ["매끄러운", "러프한", "친환경"]
  const [paperFeel, setPaperFeel] = useState('매끄러운');
  const [paperFeelIdx, setPaperFeelIdx] = useState(0);
  const [material, setMaterial] = useState('');
  const [hasPrinting, setHasPrinting] = useState(false); // 인쇄 스위치
  const [mainPrintColor, setMainPrintColor] = useState('');
  const [spotPrintColor, setSpotPrintColor] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [coating, setCoating] = useState(null);
  const [hasCoating, setHasCoating] = useState(false);
  const [hasEmbossing, setHasEmbossing] = useState(false);
  const [embossing, setEmbossing] = useState('');
  const [hasFoil, setHasFoil] = useState(false); // 박 "있음/없음"
  const [foil, setFoil] = useState([]);          // 복수 선택 옵션
  const [hasSilk, setHasSilk] = useState(false);   // 부분 실크 스위치 (있음/없음)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [customQuantity, setCustomQuantity] = useState('');

  const handleOrderSubmit = () => {
    // 주문 정보 객체 생성
    const order = {
      company,
      phone,
      email,
      width,
      length,
      height,
      thickness,
      cover,
      paperFeel,
      material,
      color,
      weight,
      coating,
      embossing,
      foil,
      quantity: quantity === '그 외 수량' ? customQuantity : quantity,
      mainPrintColor,
      spotPrintColor,
      orderId: 'ORDER-' + new Date().getTime(),
      orderedAt: new Date().toISOString(),
    };
  const handleReset = () => {
    setCompany('');
    setPhone('');
    setEmail('');
    setWidth('');
    setLength('');
    setHeight('');
    setThickness('');
    setCover('');
    setPaperFeel('매끄러운');
    setPaperFeelIdx(0);
    setMaterial('');
    setHasPrinting(false);
    setMainPrintColor('');
    setSpotPrintColor('');
    setColor('');
    setWeight('');
    setCoating(null);
    setHasCoating(false);
    setHasEmbossing(false);
    setEmbossing('');
    setHasFoil(false);
    setFoil([]);
    setHasSilk(false);
    setQuantity('');
    setCustomQuantity('');
  };
    // 콘솔에 주문 정보 출력
    console.log("📦 주문서 요약:", order);

    // 주문 완료 메시지 띄우기
    handleReset(); // 🟢 폼 초기화
    setShowConfirmation(true);
  };

  // 옵션 로직
  const getColorOptions = () =>
    paperFeel === '러프한' ? colorMap[material] || [] : [];
  const getWeightOptions = () => {
    if (paperFeel === '매끄러운' || paperFeel === '친환경')
      return weightMap[paperFeel]?.[material] || [];
    if (paperFeel === '러프한' && color)
      return weightMap['러프한']?.[material]?.[color] || [];
    return [];
  };

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
      {/* 오른쪽 입력란 */}
       <div style={{ flex: 1, minWidth: 0, padding: '2rem', background: '#fff', boxSizing: 'border-box', overflowY: 'auto' }}>
        {/* 회사, 연락처, 이메일 */}
        {[{ label: '회사명 또는 성함', value: company, setter: setCompany },
          { label: '연락처', value: phone, setter: setPhone },
          { label: '이메일 주소', value: email, setter: setEmail }].map((f, i) => (
          <div key={i} style={{ marginBottom: '1rem' }}>
            <label>{f.label}</label>
            <input
              className="custom-input long"
              value={f.value}
              onChange={e => f.setter(e.target.value)}
            />
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

        {/* 살 두께 */}
        <div style={{ marginBottom: '1rem' }}>
          <label>살 두께</label>
          <div className="button-group">
            {[0, 5, 7].map(val => (
              <button
                key={val}
                type="button"
                className={`option-button ${thickness === val ? 'selected' : ''}`}
                onClick={() => setThickness(val)}
              >
                {val}mm
              </button>
            ))}
          </div>
        </div>

        {/* 뚜껑 제작 여부 (토글) */}
        <div style={{ marginBottom: '1rem' }}>
          <label>뚜껑 제작</label>
          <label className="switch-toggle" style={{ position: 'relative' }}>
            <input
              type="checkbox"
              className="switch-input"
              checked={cover === "있음"}
              onChange={e => setCover(e.target.checked ? "있음" : "없음")}
            />
            <span className="switch-slider" />
            <span className="switch-label">{cover === "있음" ? "있음" : "없음"}</span>
          </label>
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

            {/* 견적가 계산 컴포넌트 */}
            <EstimatePriceY
              width={width}
              length={length}
              height={height}
              thickness={thickness}
              cover={cover}
              paperFeel={paperFeel}
              paperType={material}
              paperWeight={weight}
              color={color}
              quantity={quantity === '그 외 수량' ? customQuantity : quantity}
              coatingType={coating || '없음'}
              foil={foil}
              embossing={embossing}
              mainPrintColor={hasPrinting ? mainPrintColor : ''}
              spotPrintColor={hasPrinting ? spotPrintColor : ''}
              printNone={!hasPrinting || (!mainPrintColor && !spotPrintColor)}
              hasSilk={hasSilk}
            />

             {/* 파일 업로드 */}
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
export default YBoxOrder;
