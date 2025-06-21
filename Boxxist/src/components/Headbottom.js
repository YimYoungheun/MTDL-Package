import React from "react";
import Link from "next/link";

export default function Headbottom({ children }) {
  return (
    <>
      {/* ------- 헤더 ------- */}
      <header className="site-header">
        <Link href="/" className="site-logo">
          <img
            src="/img/logo_boxxist.png"
            alt="Boxxist 로고"
            style={{ height: 40, width: "auto", display: "block" }}
          />
        </Link>
        <nav className="site-nav">
          <div className="menu-item">제품라인업</div>
          <div className="menu-item">샘플제작</div>
          <div className="menu-item">고객지원</div>
          <div className="menu-item">회사소개</div>
        </nav>
        <div className="site-icons">
          {/* 회원가입 */}
          <span className="icon-tooltip">
            <svg xmlns="http://www.w3.org/2000/svg"
              width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ verticalAlign: "middle" }}
            >
              <path d="M2 21a8 8 0 0 1 13.292-6"/>
              <circle cx="10" cy="8" r="5"/>
              <path d="M19 16v6"/>
              <path d="M22 19h-6"/>
            </svg>
            <span className="tooltip-text">회원가입</span>
          </span>
          {/* 마이페이지 */}
          <span className="icon-tooltip">
            <svg xmlns="http://www.w3.org/2000/svg"
              width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ verticalAlign: "middle" }}
            >
              <circle cx="12" cy="8" r="5"/>
              <path d="M20 21a8 8 0 0 0-16 0"/>
            </svg>
            <span className="tooltip-text">마이페이지</span>
          </span>
          {/* 검색 */}
          <span className="icon-tooltip">
            <svg xmlns="http://www.w3.org/2000/svg"
              width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ verticalAlign: "middle" }}
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.34-4.34"/>
            </svg>
            <span className="tooltip-text">검색</span>
          </span>
          {/* 메뉴 */}
          <span className="icon-tooltip">
            <svg xmlns="http://www.w3.org/2000/svg"
              width="26" height="26" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ verticalAlign: "middle" }}
            >
              <path d="M4 12h16"/>
              <path d="M4 18h16"/>
              <path d="M4 6h16"/>
            </svg>
            <span className="tooltip-text">메뉴</span>
          </span>
        </div>
      </header>

      {/* ------- 본문 Main ------- */}
      <main>
        {children}
      </main>

      {/* ------- 푸터 ------- */}
      <footer className="site-footer" style={{
        background: "#222",
        color: "#eee",
        marginTop: 10,
        marginBottom: 0,
        padding: "40px 0 45px 0"
      }}>
        <div className="footer-inner">
          {/* 왼쪽: 로고 */}
          <div className="footer-logo">
            <img src="/img/company_logo.png" alt="회사 로고" />
          </div>
          {/* 가운데: 회사 정보 및 안내 */}
          <div className="footer-info">
            <div className="footer-links">
              <span>저작권안내</span>
              <span>개인정보 처리방침</span>
              <span>이용약관</span>
              <span>프라이버시 센터</span>
              <span>사이트맵</span>
            </div>
            <div className="footer-contact">
              고객센터 : 02-2279-8966
            </div>
            <div className="footer-copy">
              COPYRIGHT ⓒ 주식회사 메타디자인연구소 COMPANY. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
