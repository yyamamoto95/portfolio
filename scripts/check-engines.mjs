// 実行中の Node.js / npm が package.json の engines と一致するかを検証し、
// 一致しない環境では非ゼロ終了して install / dev / build を止める。
//
// npm はプロジェクト自身の engines を検査せず（依存パッケージの engines だけを見る）、
// engine-strict を指定しても同様のため、preinstall / predev / prebuild から呼んで強制している。
// 基準は package.json の engines ただ一つで、ここにバージョンを重複して持たない。
//
// 対応する書式は "<メジャー>.x" のみ。Vercel がメジャー指定でしか Node を選べないことに合わせている。
// npm 以外（yarn / pnpm など）で起動された場合も、npm のバージョンを取得できず不一致として止める。
import { readFileSync } from 'node:fs';

const { engines } = JSON.parse(
    readFileSync(new URL('../package.json', import.meta.url), 'utf8')
);

/** "22.x" 形式の指定からメジャーバージョンを取り出す。他の書式は設定ミスとして停止する。 */
const toRequiredMajor = (name, range) => {
    const match = /^(\d+)\.x$/.exec(range ?? '');
    if (!match) {
        console.error(
            `package.json の engines.${name} は "<メジャー>.x" 形式で指定してください（現在: ${JSON.stringify(range)}）`
        );
        process.exit(1);
    }
    return Number(match[1]);
};

// npm は lifecycle script 実行時に npm_config_user_agent へ "npm/10.9.3 node/v22.20.0 ..." を設定する。
const npmVersion = /^npm\/(\d+\.\d+\.\d+)/.exec(
    process.env.npm_config_user_agent ?? ''
)?.[1];

const checks = [
    { name: 'node', required: engines?.node, actual: process.versions.node },
    { name: 'npm', required: engines?.npm, actual: npmVersion },
];

const mismatches = checks.filter(
    ({ name, required, actual }) =>
        actual === undefined ||
        Number(actual.split('.')[0]) !== toRequiredMajor(name, required)
);

if (mismatches.length > 0) {
    console.error('実行環境が package.json の engines と一致しません。');
    for (const { name, required, actual } of mismatches) {
        console.error(
            `  ${name}: 必要 ${required} / 実際 ${actual ?? '取得できません（npm 以外で起動していませんか）'}`
        );
    }
    process.exit(1);
}
