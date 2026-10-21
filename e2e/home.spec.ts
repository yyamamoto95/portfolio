import { test, expect } from './fixtures';

// WebGL の描画は jsdom では検証できないため、実ブラウザで「描画されている」「動いている」ことを確認する。
test('ホームの three.js 背景が描画され、時間とともに動く', async ({ page, consoleErrors }) => {
    await page.goto('/');
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    await page.waitForTimeout(800);

    const firstFrame = await canvas.screenshot();
    // 何も描画されていない（単色の）canvas は PNG が極端に小さくなる
    expect(firstFrame.length).toBeGreaterThan(2000);
    await expect.poll(async () => !(await canvas.screenshot()).equals(firstFrame), { timeout: 5000 }).toBe(true);

    expect(consoleErrors).toEqual([]);
});
