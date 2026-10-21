// 実行中の Node.js / npm、および @types/node の major が package.json の engines と一致するかを検証し、
// 一致しない場合は非ゼロ終了して install / dev / build を止める。
//
// npm はプロジェクト自身の engines を検査せず（依存パッケージの engines だけを見る）、
// engine-strict を指定しても同様のため、preinstall / predev / prebuild から呼んで強制している。
// 基準は package.json の engines ただ一つで、ここにバージョンを重複して持たない。
//
// 対応する書式は "<メジャー>.x" のみ。Vercel がメジャー指定でしか Node を選べないことに合わせている。
// npm 以外（yarn / pnpm など）で起動された場合も、npm のバージョンを取得できず不一致として止める。
//
// @types/node の major は、固定した Node の major（engines.node）に合わせる。
// Dependabot は @types/node の major 更新を対象外にしている（Node の major とずれた型定義を取り込まないため）。
// その代わり、engines.node だけを上げて型定義の更新を忘れた場合や、型定義だけを手で上げた場合を、ここで検出する。
import { readFileSync } from 'node:fs';

const packageJson = JSON.parse(
    readFileSync(new URL('../package.json', import.meta.url), 'utf8')
);
const { engines } = packageJson;

/** "22.x" 形式の指定からメジャーバージョンを取り出す。他の書式は設定ミスとして停止する。 */
const toRequiredMajor = (engine, range) => {
    const match = /^(\d+)\.x$/.exec(range ?? '');
    if (!match) {
        console.error(
            `package.json の engines.${engine} は "<メジャー>.x" 形式で指定してください（現在: ${JSON.stringify(range)}）`
        );
        process.exit(1);
    }
    return Number(match[1]);
};

// npm は lifecycle script 実行時に npm_config_user_agent へ "npm/10.9.3 node/v22.20.0 ..." を設定する。
const npmVersion = /^npm\/(\d+\.\d+\.\d+)/.exec(
    process.env.npm_config_user_agent ?? ''
)?.[1];

// package.json に宣言された @types/node の範囲から major を取り出す（"^24.19.2" → "24"）。
// 宣言が無ければ検査しない。解釈できない書式は、範囲の文字列をそのまま不一致として扱う。
const typesNodeRange =
    packageJson.devDependencies?.['@types/node'] ??
    packageJson.dependencies?.['@types/node'];
const typesNodeMajor =
    typesNodeRange === undefined
        ? undefined
        : (/^[\^~]?(\d+)(?:\.|$)/.exec(typesNodeRange)?.[1] ?? typesNodeRange);

// engine は、基準にする engines のキー。
const checks = [
    { name: 'node', engine: 'node', required: engines?.node, actual: process.versions.node },
    { name: 'npm', engine: 'npm', required: engines?.npm, actual: npmVersion },
    ...(typesNodeRange === undefined
        ? []
        : [
              {
                  name: '@types/node',
                  engine: 'node',
                  required: engines?.node,
                  actual: typesNodeMajor,
                  hint: '@types/node の major は engines.node の major に合わせて、手で更新してください（Dependabot の major 更新は対象外にしています）。',
              },
          ]),
];

const mismatches = checks.filter(
    ({ engine, required, actual }) =>
        actual === undefined ||
        Number(actual.split('.')[0]) !== toRequiredMajor(engine, required)
);

if (mismatches.length > 0) {
    console.error('package.json の engines と一致しない項目があります。');
    for (const { name, required, actual, hint } of mismatches) {
        console.error(
            `  ${name}: 必要 ${required} / 実際 ${actual ?? '取得できません（npm 以外で起動していませんか）'}`
        );
        if (hint) console.error(`    ${hint}`);
    }
    process.exit(1);
}
