# introduce

This is my portfolio.

You can see my introduction and works. It was created with Next.js.

→ [HomePage](https://yudai95.com 'HomePage')

## テスト

| コマンド | 内容 |
|---|---|
| `npm test` | ユニットテスト（Vitest） |
| `npm run test:e2e` | E2E（Playwright。本番ビルドに対して実行） |

GitHub Actions（`.github/workflows/ci.yml`）が、PR ごとに型・lint・ユニットテスト・ビルド・E2E・画面比較・本番依存の脆弱性確認を実行します。依存ライブラリの更新は Dependabot が週1回 PR にします。

実行環境は `package.json` の `engines`（Node 24.x / npm 11.x）に固定していて、合わない環境では install / dev / build が止まります。

`@types/node` の major は Node の major に合わせるため、Dependabot の major 更新は対象外です。Node を上げるときは、`engines.node` と `@types/node` を手で揃えてください。食い違うと install / CI が失敗します（`scripts/check-engines.mjs`）。

### 画面比較の基準画像

- Linux 上の描画を正としているため、画面比較（`e2e/visual.spec.ts`）は Linux（CI）でのみ実行します。macOS ではスキップされます
- 意図した見た目の変更があったら、Actions の「画面比較の基準画像を更新」を、更新したいブランチを指定して実行します。生成された基準画像を `e2e/visual.spec.ts-snapshots/` に置き（手順はワークフローのコメント参照）、目視で確認してから commit します

### ロックファイルの注意

npm 11.6.0（Node 24.8 / 24.9 に同梱）には、`npm install` のたびにプラットフォーム別のネイティブバイナリ（Vitest が使う rolldown など）の記録をロックファイルから消すバグがあります。Linux の CI が壊れるため、Node は最新の 24.x（npm 11.6.2 以上）を使ってください。CI は、ロックファイルが最新であることも検査します。
