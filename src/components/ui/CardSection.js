"use client";
import React, { useState, useEffect, useRef } from "react";

const cards = [
  { img: "/img/b-box-package.jpg", pos: "-550px 125px", size: "75%" },
  { img: "/img/y-box-package.jpg", pos: "-280px 550px", size: "75%" },
  { img: "/img/namecard.jpg", pos: "230px 380px", size: "75%" },
  { img: "/img/poster.jpg", pos: "380px 480px", size: "75%" },
];

const CARD_W = 290, CARD_H = 380;

// clip 계산 함수는 항상 width/height를 파라미터로 받음!
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

  // 마운트 이후에만 window 접근 (SSR-safe)
  useEffect(() => {
    function updateSize() {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 클립패스 상태 관리 (브라우저 사이즈 얻어온 후에만)
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

  // SSR 환경에선 아무것도 렌더 안함
  if (!vw || !vh) return null;

  return (
    <>
      {cards.map((card, i) => {
        const isFull = mode.idx === i && mode.stage === "full";
        const isShrinking = mode.idx === i && mode.stage === "shrinking";
        const bgPos = (isFull || isShrinking || (mode.idx === i && bgCentered)) ? "center center" : card.pos;
        const bgSize = (isFull || isShrinking || (mode.idx === i && bgCentered)) ? "cover" : card.size || "cover";
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
              zIndex: isFull ? -5 : 101,
              cursor: "pointer",
              boxShadow: isFull
                ? "0 0 0 transparent"
                : "0 4px 18px rgba(0,0,0,.13)",
              pointerEvents: "auto"
            }}
          />
        );
      })}
    </>
  );
}
