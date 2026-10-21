import { test, expect } from './fixtures';

// 基準画像は Linux（CI）で生成している。OS やフォントが違うと描画が変わるため、Linux 以外では実行しない。
test.skip(process.platform !== 'linux', '画面比較の基準画像は Linux（CI）で生成するため、Linux 以外ではスキップする');

const pages = [
    { path: '/', name: 'home' },
    { path: '/about', name: 'about' },
    { path: '/works', name: 'works' },
    { path: '/contact', name: 'contact' },
    { path: '/no-such-page', name: 'not-found' },
];

for (const { path, name } of pages) {
    test(`見た目: ${path}`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        // WebGL の背景は常に動くため比較対象から外す（描画の有無と動きは home.spec.ts で検証する）。
        await expect(page).toHaveScreenshot(`${name}.png`, {
            mask: [page.locator('canvas')],
            animations: 'disabled',
        });
    });
}
