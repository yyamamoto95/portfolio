import { test, expect } from './fixtures';

const items = [
    { name: 'About', url: '/about' },
    { name: 'Works', url: '/works' },
    { name: 'Contact', url: '/contact' },
];

test('ナビで遷移すると、遷移先の項目が有効（isActive）になる', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('li.isActive')).toHaveText('Home');
    for (const { name, url } of items) {
        await page.locator('ul a', { hasText: new RegExp(`^${name}$`) }).click();
        await expect(page).toHaveURL(url);
        await expect(page.locator('li.isActive')).toHaveText(name);
    }
});

test('URL を直接開いたページでも、該当する項目が有効になる', async ({ page }) => {
    await page.goto('/works');
    await expect(page.locator('li.isActive')).toHaveText('Works');
});
