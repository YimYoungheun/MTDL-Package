"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../app/Main-globals.css";

const slides = [
  {
    img: "/img/b-box-package.jpg",
    alt: "단상자 패키지",
    link: "/b-box-order",
  },
  {
    img: "/img/y-box-package.jpg",
    alt: "와이형 상자",
    link: "/y-box-order",
  },
  {
    img: "/img/poster.jpg",
    alt: "포스터",
    link: "/poster-order",
  },
  {
    img: "/img/namecard.JPG",
    alt: "명함",
    link: "/namecard-order",
  },
];

export default function MainSlider() {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const router = useRouter();

  function paginate(newDirection) {
    let newIdx = idx + newDirection;
    if (newIdx < 0) newIdx = slides.length - 1;
    if (newIdx >= slides.length) newIdx = 0;
    setDirection(newDirection);
    setIdx(newIdx);
  }

  function goOrder() {
    router.push(slides[idx].link);
  }

    return (
      <div
        className="main-slider-outer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 슬라이더(화살표+이미지) */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* 왼쪽 화살표 */}
          <motion.button
            aria-label="이전"
            className="slide-arrow-btn left"
            onClick={() => paginate(-1)}
            whileTap={{ scale: 0.92 }}
          >
            <ArrowLeft />
          </motion.button>
          {/* 이미지 슬라이드 */}
          <div className="slide-img-box">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={idx}
                src={slides[idx].img}
                alt={slides[idx].alt}
                onClick={goOrder}
                className="main-slide-image"
                initial={{ opacity: 0, x: direction * 90 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -90 }}
                transition={{
                  x: { type: "spring", stiffness: 400, damping: 40 },
                  opacity: { duration: 0.22 },
                }}
              />
            </AnimatePresence>
          </div>
          {/* 오른쪽 화살표 */}
          <motion.button
            aria-label="다음"
            className="slide-arrow-btn right"
            onClick={() => paginate(1)}
            whileTap={{ scale: 0.92 }}
          >
            <ArrowRight />
          </motion.button>
        </div>
        {/* 아래 동그라미 인디케이터 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
            marginTop: "26px",
            width: "100%",
          }}
        >
          {slides.map((_, i) => (
            <span
              key={i}
              onClick={() => setIdx(i)}
              style={{
                width: 13,
                height: 13,
                borderRadius: "50%",
                display: "inline-block",
                background: i === idx ? "#2A70FF" : "#D7E0EE",
                boxShadow: i === idx ? "0 0 0 2px #90b8ff77" : "none",
                transition: "background .15s",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "36px",
            marginTop: "48px",
            marginBottom: "10px",
            width: "100%",
          }}
        >
          { /*명함 주문 루시아드 아이콘*/ }
          <div
            className="icon-tooltip"
            tabIndex={0}
            onClick={() => router.push("/namecard-order")}
            style={{ cursor: "pointer" }}>
            <span className="icon-tooltip">
              <svg xmlns="http://www.w3.org/2000/svg"
              width="35" height="35" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-id-card-icon lucide-id-card">
              <path d="M16 10h2"/>
              <path d="M16 14h2"/>
              <path d="M6.17 15a3 3 0 0 1 5.66 0"/>
              <circle cx="9" cy="11" r="2"/>
              <rect x="2" y="5" width="20" height="14" rx="2"/>
              </svg>
            </span>
            <span className="main-tooltip-text">명함 주문하기</span>
          </div>
          
          { /*포스터 주문 루시아드 아이콘*/ }
          <div
            className="icon-tooltip"
            tabIndex={0}
            onClick={() => router.push("/poster-order")}
            style={{ cursor: "pointer" }}>
            <span className="icon-tooltip">
            <svg xmlns="http://www.w3.org/2000/svg"
            width="35" height="35" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-file-image-icon lucide-file-image">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
              <circle cx="10" cy="12" r="2"/>
              <path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22"/>
              </svg>
            </span>
            <span className="main-tooltip-text">포스터 주문하기</span>
          </div>

          { /*B형 상자 주문 아이콘*/ }
          <div
            className="icon-tooltip"
            tabIndex={0}
            onClick={() => router.push("/b-box-order")}
            style={{ cursor: "pointer" }}>
            <span className="icon-tooltip">
            <svg xmlns="http://www.w3.org/2000/svg"
            width="35" height="35" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-box-icon lucide-box">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
              <path d="m3.3 7 8.7 5 8.7-5"/>
              <path d="M12 22V12"/>
              </svg>
            </span>
            <span className="main-tooltip-text">B형 상자 주문하기</span>
          </div>
          
          { /*Y형 상자 주문 아이콘*/ }
          <div
            className="icon-tooltip"
            tabIndex={0}
            onClick={() => router.push("/y-box-order")}
            style={{ cursor: "pointer" }}>
            <span className="icon-tooltip">
            <svg xmlns="http://www.w3.org/2000/svg"
            width="35" height="35" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-archive-icon lucide-archive">
              <rect width="20" height="5" x="2" y="3" rx="1"/>
              <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/>
              <path d="M10 12h4"/>
              </svg>
            </span>
            <span className="main-tooltip-text">Y형 상자 주문하기</span>
          </div>
        </div>
      </div>
    );
  }

// ======= ICONS =======
function ArrowLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="36" height="36" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <path d="m11 17-5-5 5-5"/>
      <path d="m18 17-5-5 5-5"/>
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      width="36" height="36" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <path d="m6 17 5-5-5-5"/>
      <path d="m13 17 5-5-5-5"/>
    </svg>
  );
}

// ======= STYLES =======
const container = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "70vh",
  gap: "32px",
  position: "relative",
  background: "#fff",
};
const slideImage = {
  width: 700,
  height: 580,
  objectFit: "cover",
  borderRadius: 0,
  background: "#f8fafc",
  cursor: "pointer",
  boxShadow: "0 8px 32px #0001",
  userSelect: "none",
};
const button = {
  background: "#f8fafc",
  width: 54,
  height: 54,
  borderRadius: "50%",
  border: "none",
  outline: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2.5rem",
  color: "#aaa",
  cursor: "pointer",
  boxShadow: "0 2px 10px #0002",
  transition: "background 0.17s, color 0.17s",
  zIndex: 3,
};

