import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

describe('Modal', () => {
    it('isShow が false のときは何も描画しない', () => {
        render(
            <Modal isShow={false} onClose={vi.fn()}>
                本文
            </Modal>
        );
        expect(screen.queryByText('本文')).not.toBeInTheDocument();
    });

    it('isShow が true のときは本文と Close ボタンを描画する', () => {
        render(
            <Modal isShow onClose={vi.fn()}>
                本文
            </Modal>
        );
        expect(screen.getByText('本文')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });

    it('Close ボタンで onClose(false) を呼ぶ', async () => {
        const onClose = vi.fn();
        render(
            <Modal isShow onClose={onClose}>
                本文
            </Modal>
        );
        await userEvent.click(screen.getByRole('button', { name: 'Close' }));
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledWith(false);
    });

    // 閉じるのは「クリックされた要素がハンドラの付いた要素そのもの」の場合だけ。
    // 本文のクリックが外側のオーバーレイまで伝わっても閉じないことを守る。
    it('本文のクリックでは閉じない', async () => {
        const onClose = vi.fn();
        render(
            <Modal isShow onClose={onClose}>
                本文
            </Modal>
        );
        await userEvent.click(screen.getByText('本文'));
        expect(onClose).not.toHaveBeenCalled();
    });
});
