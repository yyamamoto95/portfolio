import { test, expect } from './fixtures';

test('作品をクリックすると Modal が開き、Close で閉じる', async ({ page }) => {
    await page.goto('/works');
    await page.locator('section img').first().click();

    const close = page.getByRole('button', { name: 'Close' });
    await expect(close).toBeVisible();
    await expect(page.getByText('主な使用技術')).toBeVisible();

    await close.click();
    await expect(close).toHaveCount(0);
});

// ユニットテストでは検証できない、実際のレイアウト上のオーバーレイ（Modal の外側）のクリック。
test('Modal の外側をクリックしても閉じる', async ({ page }) => {
    await page.goto('/works');
    await page.locator('section img').first().click();

    const close = page.getByRole('button', { name: 'Close' });
    await expect(close).toBeVisible();

    await page.mouse.click(5, 5);
    await expect(close).toHaveCount(0);
});
