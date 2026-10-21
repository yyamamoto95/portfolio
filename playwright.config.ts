import { defineConfig, devices } from '@playwright/test';

const PORT = 3100;

// E2E・画面比較の設定。本番ビルド（next build → next start）に対して実行し、Vercel と同じ状態を検証する。
export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    // 再試行は一時的な失敗の吸収用。CI の失敗は HTML レポート（差分画像を含む）で確認する。
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
    use: {
        baseURL: `http://127.0.0.1:${PORT}`,
        trace: 'on-first-retry',
        // ヘッドレスの Linux でも WebGL（three.js の背景）を描画できるよう、ソフトウェアレンダリングを使う。
        launchOptions: {
            args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
        },
    },
    expect: {
        // 既定の threshold（0.2）は緩く、水色から緑への変化のような配色の崩れを見逃すため、厳しくしている。
        toHaveScreenshot: { threshold: 0.02, maxDiffPixelRatio: 0.001 },
    },
    projects: [
        { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
        { name: 'mobile', use: { ...devices['Pixel 7'] } },
    ],
    webServer: {
        command: `npm run build && npm run start -- -p ${PORT}`,
        url: `http://127.0.0.1:${PORT}`,
        // 古いビルドを配信中のサーバーを誤って使い回さないよう、既存サーバーは再利用しない。
        reuseExistingServer: false,
        timeout: 240_000,
    },
});
