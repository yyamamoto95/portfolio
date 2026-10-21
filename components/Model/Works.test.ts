import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { works, getTechnologyListText } from './Works';
import { technologyList } from './Technology';

const publicFile = (src: string) => join(process.cwd(), 'public', src);

// 作品データの不整合（画像の参照切れ、技術番号の範囲外）は、画面でしか気づけない種類の不具合になりやすいため、データ単体で検証する。
describe('作品データ', () => {
    it('作品 ID が重複しない', () => {
        expect(new Set(works.map((w) => w.id)).size).toBe(works.length);
    });

    it('作品名が重複しない', () => {
        expect(new Set(works.map((w) => w.name)).size).toBe(works.length);
    });

    it('参照している画像がすべて public に存在する', () => {
        const srcs = works.flatMap((w) => [w.imgSrc, ...(w.link?.map((l) => l.imgSrc) ?? [])]);
        expect(srcs.filter((src) => !existsSync(publicFile(src)))).toEqual([]);
    });

    it('技術番号がすべて technologyList の範囲内', () => {
        for (const work of works) {
            for (const num of work.tecNum) {
                expect(technologyList[num], `${work.name} の技術番号 ${num}`).toBeDefined();
            }
        }
    });
});

describe('getTechnologyListText', () => {
    it('技術名をカンマ区切りで連結する', () => {
        expect(getTechnologyListText([0, 1, 2])).toBe('HTML, CSS, Sass');
    });

    it('空配列では空文字を返す', () => {
        expect(getTechnologyListText([])).toBe('');
    });
});
