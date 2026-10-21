import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import GlobalNavi from './GlobalNavi';

// 現在のパスだけをテストから切り替えられるよう、next/router を差し替える。
const router = vi.hoisted(() => ({ pathname: '/' }));
vi.mock('next/router', () => ({ useRouter: () => router }));

/** isActive が付いているナビ項目（li）を返す */
const activeItems = () =>
    screen.getAllByRole('listitem').filter((li) => li.classList.contains('isActive'));

describe('GlobalNavi', () => {
    it.each([
        ['/', 'Home'],
        ['/about', 'About'],
        ['/works', 'Works'],
        ['/contact', 'Contact'],
    ])('%s では %s だけが有効になる', (pathname, label) => {
        router.pathname = pathname;
        render(<GlobalNavi />);
        expect(activeItems()).toHaveLength(1);
        expect(activeItems()[0]).toHaveTextContent(label);
    });

    it('どの項目にも該当しないパス（404 など）ではどの項目も有効にならない', () => {
        router.pathname = '/404';
        render(<GlobalNavi />);
        expect(activeItems()).toHaveLength(0);
    });

    it('各項目が正しいリンク先を持つ', () => {
        router.pathname = '/';
        render(<GlobalNavi />);
        expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
        expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
        expect(screen.getByRole('link', { name: 'Works' })).toHaveAttribute('href', '/works');
        expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
    });
});
