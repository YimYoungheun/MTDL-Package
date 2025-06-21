"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  { img: "/img/b-box-package.jpg", pos: "-550px 125px", size: "75%", text: "단상자 패키지", link: "/b-box-order" },
  { img: "/img/y-box-package.jpg", pos: "-280px 550px", size: "75%", text: "와이형 상자", link: "/y-box-order" },
  { img: "/img/namecard.jpg", pos: "230px 380px", size: "75%", text: "명함 인쇄", link: "/namecard-order" },
  { img: "/img/poster.jpg", pos: "380px 480px", size: "75%", text: "포스터 인쇄", link: "/poster-order" },
];

const CARD_W = 290, CARD_H = 380;

function getCenterClip(vw, vh) {
  const left = (vw - CARD_W) / 2;
  const top = (vh - CARD_H) / 2;
  return `inset(${top}px ${vw - left - CARD_W}px ${vh - top - CARD_H}px ${left}px round 20px)`;
}
function getCardClip(idx, vw, vh) {
  const gap = 20;
  const left = 32 + idx * (CARD_W + gap);
  const top = vh - CARD_H - 32;
  return `inset(${top}px ${vw - left - CARD_W}px ${vh - top - CARD_H}px ${left}px round 20px)`;
}

export default function ClipCardBar() {
  const [mode, setMode] = useState({ idx: null, stage: "card" }); // {idx, stage: "card"|"full"|"shrinking"}
  const [clips, setClips] = useState(cards.map(() => "")); // SSR 안전
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);
  const [bgCentered, setBgCentered] = useState(false);
  const pendingIdx = useRef(null);

  useEffect(() => {
    function updateSize() {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!vw || !vh) return;
    setClips(cards.map((_, i) => {
      if (mode.idx === i) {
        if (mode.stage === "full") return "inset(0 0 0 0 round 0px)";
        if (mode.stage === "shrinking") return getCenterClip(vw, vh);
      }
      return getCardClip(i, vw, vh);
    }));
  }, [mode, vw, vh]);

  function handleCardClick(i) {
    if (mode.idx === i && mode.stage === "full") {
      setBgCentered(true);
      setMode({ idx: i, stage: "shrinking" });
      setTimeout(() => {
        setBgCentered(false);
        setMode({ idx: null, stage: "card" });
      }, 700);
    } else if (mode.idx === null || mode.stage === "card") {
      setMode({ idx: i, stage: "full" });
      setBgCentered(true);
    } else {
      setBgCentered(true);
      setMode(prev => ({ idx: prev.idx, stage: "shrinking" }));
      pendingIdx.current = i;
      setTimeout(() => {
        setBgCentered(false);
        setMode({ idx: null, stage: "card" });
        setTimeout(() => {
          setMode({ idx: pendingIdx.current, stage: "full" });
          setBgCentered(true);
        }, 150);
      }, 700);
    }
  }

  if (!vw || !vh) return null;

  // 배경화면 카드(풀스크린) 상태 판별
  const isFullBG =
    mode.idx !== null &&
    mode.stage === "full";

  return (
    <>
      {/* 오른쪽 위 로고 */}
      <div
        style={{
          position: "fixed",
          top: 36,
          right: 48,
          zIndex: 1001,
          pointerEvents: "none",
        }}
      >
        <img
          src="/img/logo_boxxist.png"
          alt="박시스트 로고"
          style={{
            width: 152,
            height: "auto",
            display: "block",
          }}
        />
      </div>

      {/* 카드들 */}
      {cards.map((card, i) => {
        const isFull = mode.idx === i && mode.stage === "full";
        const isShrinking = mode.idx === i && mode.stage === "shrinking";
        const bgPos =
          isFull || isShrinking || (mode.idx === i && bgCentered)
            ? "center center"
            : card.pos;
        const bgSize =
          isFull || isShrinking || (mode.idx === i && bgCentered)
            ? "cover"
            : card.size || "cover";
        return (
          <div
            key={i}
            onClick={() => handleCardClick(i)}
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              background: `url(${card.img}) no-repeat`,
              backgroundSize: bgSize,
              backgroundPosition: bgPos,
              clipPath: clips[i],
              transition:
                "clip-path 0.4s cubic-bezier(.72,.21,.45,.98), " +
                "background-position 0.7s cubic-bezier(.72,.21,.45,.98), " +
                "background-size 0.7s cubic-bezier(.72,.21,.45,.98)",
              zIndex: isFull ? 2 : 101,
              cursor: "pointer",
              boxShadow: isFull
                ? "0 0 0 transparent"
                : "0 4px 18px rgba(0,0,0,.13)",
              pointerEvents: "auto"
            }}
          >
            {(isFull || isShrinking) && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(255,255,255,0.27)",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
              />
            )}
            
            {/* 👇👇 바로 여기! 👇👇 */}
            {isFull && (
              <AnimatePresence>
                <motion.div
                  key={i}
                  initial={{ y: -60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 60, opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.72, 0.21, 0.45, 0.98] }}
                  style={{
                    position: "absolute",
                    top: "22%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#1A1A1A",
                    fontWeight: 700,
                    fontSize: 48,
                    textShadow: "0 8px 32px rgba(0,0,0,0.13)",
                    textAlign: "center",
                    zIndex: 1100,
                    pointerEvents: "none"
                  }}
                >
                  {card.text}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.7 }}
                    style={{
                      marginTop: 56,
                      pointerEvents: "auto"
                    }}
                  >
                    <a
                      href={card.link}
                      style={{
                        display: "inline-block",
                        background: "#222",
                        color: "#fff",
                        padding: "18px 48px",
                        borderRadius: 28,
                        fontSize: 22,
                        letterSpacing: 2,
                        fontWeight: 600,
                        boxShadow: "0 2px 18px rgba(0,0,0,.14)",
                        textDecoration: "none",
                        transition: "background .2s"
                      }}
                      onMouseOver={e => e.currentTarget.style.background = "#437fff"}
                      onMouseOut={e => e.currentTarget.style.background = "#222"}
                    >
                      제작하러 가기 &gt;
                    </a>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </>
  );
}
