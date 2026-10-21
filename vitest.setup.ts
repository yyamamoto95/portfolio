import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// globals を有効にしていないため、Testing Library の自動クリーンアップが働かない。
// テスト間で描画結果が残らないよう、明示的に後始末する。
afterEach(() => cleanup());
