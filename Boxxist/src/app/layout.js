import { Geist, Geist_Mono } from "next/font/google";
import "./Order-globals.css";
import "@/app/Head-globals.css";
import Headbottom from "@/components/Headbottom"; // 헤더+푸터+본문

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "박시스트",
  description: "패키지 주문 플랫폼",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Headbottom에 children 전달! */}
        <Headbottom>{children}</Headbottom>
      </body>
    </html>
  );
}