// src/components/YBoxOrder.js

import React, { useState } from 'react';
import EstimatePriceY from './Common/EstimatePriceY';
import '../App.css'; // css 경로 주의!

// 필요한 데이터 import
import { weightMap } from '../data/weightMap';
import { colorMap } from '../data/colorMap';
import { materialMap } from '../data/materialMap';
import { paperPrices } from '../data/paperPrices';

function YBoxOrder() {
  // 기존 App.js 상태값들 그대로 복붙!
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [thickness, setThickness] = useState(0); // 기본값 0mm
  const [cover, setCover] = useState('제작'); // 기본값 "제작" 또는 ''제작하지 않음"
  const [paperFeel, setPaperFeel] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [weight, setWeight] = useState('');
  const [coating, setCoating] = useState(null);
  const [embossing, setEmbossing] = useState(null);
  const [foil, setFoil] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [customQuantity, setCustomQuantity] = useState('');
  const [mainPrintColor, setMainPrintColor] = useState('');
  const [spotPrintColor, setSpotPrintColor] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
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
      quantity: quantity === '그 이상' ? customQuantity : quantity,
      mainPrintColor,
      spotPrintColor,
      orderId: 'ORDER-' + new Date().getTime(),
      orderedAt: new Date().toISOString(),
    };

    // 콘솔에 주문 정보 출력
    console.log("📦 주문서 요약:", order);

    // 주문 완료 메시지 띄우기
    handleReset(); // 🟢 폼 초기화
    setShowConfirmation(true);
    };


  // 옵션 로직(그대로 복붙)
  const getColorOptions = () =>
    paperFeel === '러프한' ? colorMap[material] || [] : [];
  const getWeightOptions = () => {
    if (paperFeel === '매끄러운' || paperFeel === '친환경')
      return weightMap[paperFeel]?.[material] || [];
    if (paperFeel === '러프한' && color)
      return weightMap['러프한']?.[material]?.[color] || [];
    return [];
  };

  // 리셋 함수(그대로)
  const handleReset = () => {
    setCompany('');
    setPhone('');
    setEmail('');
    setWidth('');
    setLength('');
    setHeight('');
    setThickness(0);
    setCover('제작'); // or ''제작하지 않음"
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
    <div style={{ display: 'flex', width: '100vw', height: '100vh', margin: 0, padding: 0, boxSizing: 'border-box' }}>
      {/* 왼쪽 이미지 */}
      <div style={{ flex: 3.6, minWidth: 0, height: '100vh', margin: 0, padding: 0 }}>
        <img
          src="/img/Designers.png"
          alt="B형 상자"
          style={{ width: '73vw', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '0' }}
        />
      </div>
      {/* 오른쪽 입력란 */}
      <div style={{ flex: 1, minWidth: 0, padding: '2rem', background: '#fff', height: '100vh', overflowY: 'auto' }}>
        <button className="secondary-button" onClick={handleReset}>
          처음부터 입력 다시하기
        </button>
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
          <label>내경 (mm)</label>
          <div className="flex-row" style={{ marginTop: '0.3rem' }}>
            <input className="custom-input short" placeholder="가로" value={width} onChange={e => setWidth(e.target.value)} />
            <input className="custom-input short" placeholder="세로" value={length} onChange={e => setLength(e.target.value)} />
            <input className="custom-input short" placeholder="높이" value={height} onChange={e => setHeight(e.target.value)} />
          </div>
        </div>

          {/* 살 두께 */}
          {width && length && height && (
            <>
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

              {/* 뚜껑 제작 */}
              {width && length && height && (typeof thickness === 'number') && (
              <div style={{ marginBottom: '1rem' }}>
                <label>뚜껑</label>
                <div className="button-group">
                  {['제작', '제작하지 않음'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      className={`option-button ${cover === opt ? 'selected' : ''}`}
                      onClick={() => setCover(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

        {/* 종이 느낌, 재질, 색상, 무게 */}
        {width && length && height && thickness !== '' && cover && (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>종이 느낌</label>
              <div className="button-group">
                {Object.keys(materialMap).map(feel => (
                  <button key={feel} className={`option-button ${paperFeel === feel ? 'selected' : ''}`} onClick={() => { setPaperFeel(feel); setMaterial(''); setColor(''); setWeight(''); }}>{feel}</button>
                ))}
              </div>
            </div>
            {paperFeel && (
              <div style={{ marginBottom: '1rem' }}>
                <label>재질</label>
                <div className="button-group">
                  {materialMap[paperFeel].map(mat => (
                    <button key={mat} className={`option-button ${material === mat ? 'selected' : ''}`} onClick={() => { setMaterial(mat); setColor(''); setWeight(''); }}>{mat}</button>
                  ))}
                </div>
              </div>
            )}
            {paperFeel === '러프한' && material && getColorOptions().length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <label>색상</label>
                <div className="button-group">
                  {getColorOptions().map(c => (
                    <button key={c} className={`option-button ${color === c ? 'selected' : ''}`} onClick={() => { setColor(c); setWeight(''); }}>{c}</button>
                  ))}
                </div>
              </div>
            )}
            {material && getWeightOptions().length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <label>무게</label>
                <div className="button-group">
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
          <>
            <div style={{ marginBottom: '1rem' }}>
              <label>인쇄 선택</label>
              <div className="button-group">
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
              <div className="button-group">
                {['1도', '2도', '3도', '4도'].map(type => (
                  <button
                    key={type}
                    className={`option-button ${mainPrintColor === type ? 'selected' : ''}`}
                    onClick={() => setMainPrintColor(prev => prev === type ? '' : type)}
                  >{type}</button>
                ))}
              </div>
              <div className="button-group">
                {['별색 1도', '별색 2도', '별색 3도', '별색 4도'].map(type => (
                  <button
                    key={type}
                    className={`option-button ${spotPrintColor === type ? 'selected' : ''}`}
                    onClick={() => setSpotPrintColor(prev => prev === type ? '' : type)}
                  >{type}</button>
                ))}
              </div>
            </div>
            {/* 후가공 및 수량 */}
            <div style={{ marginBottom: '1rem' }}>
              <label>코팅</label>
              <div className="button-group">
                {['없음', '무광', '유광', '벨벳'].map(type => (
                  <button key={type} className={`option-button ${(type === '없음' ? coating === '' : coating === type) ? 'selected' : ''}`} onClick={() => setCoating(type === '없음' ? '' : type)}>{type}</button>
                ))}
              </div>
            </div>
            {coating !== null && (
              <div style={{ marginBottom: '1rem' }}>
                <label>형압</label>
                <div className="button-group">
                  {['없음', '음각', '양각'].map(type => (
                    <button key={type} className={`option-button ${(type === '없음' ? embossing === '' : embossing === type) ? 'selected' : ''}`} onClick={() => setEmbossing(type === '없음' ? '' : type)}>{type}</button>
                  ))}
                </div>
              </div>
            )}
            {embossing !== null && (
              <div style={{ marginBottom: '1rem' }}>
                <label>박 (복수 선택 가능)</label>
                <div className="button-group">
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
                <div className="button-group">
                  <select className="custom-select" value={quantity} onChange={e => setQuantity(e.target.value)}>
                    <option value="">수량을 선택하세요</option>
                    {[500, 1000, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000, '그 이상'].map(qty => (
                      <option key={qty} value={String(qty)}>{qty === '그 이상' ? '그 이상' : Number(qty).toLocaleString()}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {quantity === '그 이상' && (
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
                    // 숫자만, 빈 값 허용(초기화)
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
          className="file-upload-frame"
          src="https://mtdl.co.kr/fileupload"
          width="100%"
          height="170"
          title="파일 업로드"
        />
        <button className="primary-button" onClick={handleOrderSubmit}>
          바로 주문하기
        </button>
        </>
      )} {/* weight && 조건 끝 */}
      </div> {/* 오른쪽 입력란 div 종료 */}
      
      {/* ✅ 오버레이는 오른쪽 입력란 div와 같은 레벨, 전체 flex div의 자식 */}
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
