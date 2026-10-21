import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScroll } from './useScroll';

describe('useScroll', () => {
    it('onScroll で ref の要素を smooth スクロールする', () => {
        const { result } = renderHook(() => useScroll());
        const [ref, onScroll] = result.current;
        // jsdom には scrollIntoView が無いため、呼び出しだけを検証できる関数に差し替える
        const scrollIntoView = vi.fn();
        (ref as { current: unknown }).current = { scrollIntoView };

        onScroll();

        expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('ref が未設定でも onScroll は例外を投げない', () => {
        const { result } = renderHook(() => useScroll());
        expect(() => result.current[1]()).not.toThrow();
    });
});
