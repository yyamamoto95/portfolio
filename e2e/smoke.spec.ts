import { test, expect } from './fixtures';

const pages = [
    { path: '/', title: 'Yudai Yamamoto' },
    { path: '/about', title: 'About | Yudai Yamamoto' },
    { path: '/works', title: 'Works | Yudai Yamamoto' },
    { path: '/contact', title: 'Contact | Yudai Yamamoto' },
];

for (const { path, title } of pages) {
    test(`${path} が表示され、コンソールエラーがなく、画像がすべて読み込まれる`, async ({ page, consoleErrors }) => {
        const response = await page.goto(path);
        expect(response?.status()).toBe(200);
        await expect(page).toHaveTitle(title);
        await page.waitForLoadState('networkidle');

        const brokenImages = await page.$$eval('img', (images) =>
            images.filter((img) => !(img.complete && img.naturalWidth > 0)).map((img) => img.src)
        );
        expect(brokenImages).toEqual([]);
        expect(consoleErrors).toEqual([]);
    });
}

test('存在しない URL は 404 になり、ホームへ戻れる', async ({ page }) => {
    const response = await page.goto('/no-such-page');
    expect(response?.status()).toBe(404);
    await page.getByText('ホームに戻ります').click();
    await expect(page).toHaveURL('/');
});
