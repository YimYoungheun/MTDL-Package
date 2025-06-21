"use client";
import { useState } from "react";
import Link from "next/link";

export default function Headbottom({ children }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="header-inner" style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          height: 100,
          width: "100%"
        }}>
          {/* 왼쪽: 로고 */}
          <div style={{ minWidth: 180, display: "flex", alignItems: "center" }}>
            <Link href="/" className="site-logo">
              <img src="/img/logo_boxxist.png" alt="Boxxist 로고"
                style={{ height: 40, width: "auto", display: "block" }} />
            </Link>
          </div>

          {/* 가운데: 메뉴 */}
          <nav className="site-nav"
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              gap: 85
            }}>
            <div className="menu-item" tabIndex={0}onMouseEnter={() => setShowDropdown(true)}>전체제품</div>
            <div className="menu-item" tabIndex={0}onMouseEnter={() => setShowDropdown(true)}>제작사례</div>
            <div className="menu-item" tabIndex={0}onMouseEnter={() => setShowDropdown(true)}>고객지원</div>
            <div className="menu-item" tabIndex={0}onMouseEnter={() => setShowDropdown(true)}>회사소개</div>
          </nav>

          {/* 오른쪽: 아이콘 */}
          <div style={{ minWidth: 220, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <div className="site-head-icons" style={{ display: "flex", gap: 18 }}>
              {/* 회원가입 */}
              <span className="head-icon-tooltip">
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="26" height="26" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ verticalAlign: "middle" }}>
                  <path d="M2 21a8 8 0 0 1 13.292-6"/>
                  <circle cx="10" cy="8" r="5"/>
                  <path d="M19 16v6"/>
                  <path d="M22 19h-6"/>
                </svg>
                <span className="head-tooltip-text">회원가입</span>
              </span>
              {/* 마이페이지 */}
              <span className="head-icon-tooltip">
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="26" height="26" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ verticalAlign: "middle" }}>
                  <circle cx="12" cy="8" r="5"/>
                  <path d="M20 21a8 8 0 0 0-16 0"/>
                </svg>
                <span className="head-tooltip-text">마이페이지</span>
              </span>
              {/* 검색 */}
              <span className="head-icon-tooltip">
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="26" height="26" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ verticalAlign: "middle" }}>
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.34-4.34"/>
                </svg>
                <span className="head-tooltip-text">검색</span>
              </span>
              {/* 메뉴 */}
              <span className="head-icon-tooltip">
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="26" height="26" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ verticalAlign: "middle" }}>
                  <path d="M4 12h16"/>
                  <path d="M4 18h16"/>
                  <path d="M4 6h16"/>
                </svg>
                <span className="head-tooltip-text">메뉴</span>
              </span>
          </div>
        </div>
      </div>

        {/* ▼▼▼ 드롭다운: header 바깥에 position: absolute + width: 100vw ▼▼▼ */}
        {showDropdown && (
          <div
            className="nav-dropdown-outer"
            style={{
              position: "absolute",
              zIndex: 200,
              pointerEvents: "auto",
              background: "transparent",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="dropdown-inner">
              <div className="dropdown-col">
                <div className="dropdown-title">전체제품</div>
                <Link href="/namecard-order" className="dropdown-link">명함</Link>
                <Link href="/poster-order" className="dropdown-link">포스터</Link>
                <Link href="/b-box-order" className="dropdown-link">B형 상자</Link>
                <Link href="/y-box-order" className="dropdown-link">Y형 상자</Link>
              </div>
              <div className="dropdown-col">
                <div className="dropdown-title">제작사례</div>
                <div className="dropdown-link">제작사례 1</div>
                <div className="dropdown-link">제작사례 2</div>
                <div className="dropdown-link">제작사례 3</div>
              </div>
              <div className="dropdown-col">
                <div className="dropdown-title">고객지원</div>
                <div className="dropdown-link">고객지원 1</div>
                <div className="dropdown-link">고객지원 2</div>
                <div className="dropdown-link">고객지원 3</div>
              </div>
              <div className="dropdown-col">
                <div className="dropdown-title">회사소개</div>
                <div className="dropdown-link">회사소개 1</div>
                <div className="dropdown-link">회사소개 2</div>
                <div className="dropdown-link">회사소개 3</div>
              </div>
            </div>
          </div>
        )}
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
        padding: "30px 0 45px 0"
      }}>
        <div className="footer-inner">
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
            <div className="footer-logo">
              <img src="/img/logo_metadesign.png" alt="회사 로고" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
