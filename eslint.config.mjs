import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Next.js 16 で `next lint` が廃止されたため、ESLint を直接実行する flat config。
// ルールは Next.js 公式の推奨セット（Core Web Vitals + TypeScript）をそのまま使う。
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // ビルド生成物は lint 対象外。
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
