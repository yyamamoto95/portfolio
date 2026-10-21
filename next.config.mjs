import path from 'node:path';

// Sass の `@import 'variable'` を解決する読み込みパス（Turbopack では loadPaths を使う）
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    loadPaths: [path.join(import.meta.dirname, 'styles/Base')],
  },
};

export default nextConfig;
