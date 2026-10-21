import { test as base, expect } from '@playwright/test';

// Google Fonts は外部通信のため遮断し、フォールバックフォントで描画を固定する。
// 通信状況による画面差分や不安定さを避けるためで、本番のフォント読み込み自体は検証対象外。
const FONT_HOSTS = /fonts\.(googleapis|gstatic)\.com/;

export const test = base.extend<{ consoleErrors: string[] }>({
    // ページで起きたコンソールエラーと未処理の例外を集める（フォントの遮断による失敗は除く）。
    consoleErrors: async ({ page }, provide) => {
        const errors: string[] = [];
        await page.route(FONT_HOSTS, (route) => route.abort());
        page.on('console', (msg) => {
            if (msg.type() === 'error' && !FONT_HOSTS.test(msg.location().url)) errors.push(msg.text());
        });
        page.on('pageerror', (err) => errors.push(err.message));
        await provide(errors);
    },
});

export { expect };
