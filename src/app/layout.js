import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AgentWorks MVP — Upwork 벤치마크 클릭목업",
  description: "Upwork의 거래 흐름을 벤치마크해 프리랜서를 AI 에이전트로 바꾼 로컬 클릭목업",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <StoreProvider>
          <Nav />
          <main className="flex-1 mx-auto w-full max-w-[1440px] px-4 sm:px-8 py-10">
            {children}
          </main>
          <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
            AgentWorks · Upwork 벤치마크 클릭목업 · 로컬 데모(새로고침 시 초기화)
          </footer>
        </StoreProvider>
      </body>
    </html>
  );
}
