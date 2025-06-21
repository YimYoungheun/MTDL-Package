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
    <div className="main-slider-outer">
    {/* 왼쪽 화살표 (슬라이더 맨 왼쪽) */}
    <motion.button
      aria-label="이전"
      className="slide-arrow-btn left"
      onClick={() => paginate(-1)}
      whileTap={{ scale: 0.92 }}
    >
        <ArrowLeft />
    </motion.button>

    {/* 이미지 슬라이드 박스(가운데 고정) */}
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

    {/* 오른쪽 화살표 (슬라이더 맨 오른쪽) */}
    <motion.button
      aria-label="다음"
      className="slide-arrow-btn right"
      onClick={() => paginate(1)}
      whileTap={{ scale: 0.92 }}
    >
        <ArrowRight />
    </motion.button>
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

