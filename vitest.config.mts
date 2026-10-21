import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// ユニットテストの設定。Pages Router のコンポーネントを jsdom 上で描画して検証する。
// three.js / WebGL を使う背景（components/three）は jsdom で描画できないため対象外とし、E2E で検証する。
export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./vitest.setup.ts'],
        include: ['**/*.test.{ts,tsx}'],
        exclude: ['**/node_modules/**', '.next/**'],
    },
});
