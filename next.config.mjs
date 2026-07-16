import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 부모 폴더의 stray package-lock.json 때문에 Turbopack이 워크스페이스 루트를
  // 한글 경로(원드라이브 데스크탑)로 잘못 추론 → 청크 이름 슬라이싱 무효화 발생.
  // 루트를 ASCII 프로젝트 디렉토리로 고정해 회피한다.
  turbopack: { root: __dirname },
};

export default nextConfig;
