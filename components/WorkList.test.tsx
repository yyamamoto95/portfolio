import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WorkList from './WorkList';
import { works, getTechnologyListText } from './Model/Works';

describe('WorkList', () => {
    it('作品を全件表示し、初期状態ではどの Modal も開いていない', () => {
        render(<WorkList />);
        for (const work of works) {
            expect(screen.getByRole('heading', { name: work.name })).toBeInTheDocument();
        }
        expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
    });

    it('作品をクリックすると、その作品の詳細だけが Modal で開く', async () => {
        const work = works[0];
        render(<WorkList />);
        await userEvent.click(screen.getByRole('img', { name: work.name }));

        // 開いている Modal は常に1つだけ
        expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(1);
        expect(screen.getByText('主な使用技術')).toBeInTheDocument();
        expect(screen.getByText(getTechnologyListText(work.tecNum))).toBeInTheDocument();
        for (const text of work.comment) {
            expect(screen.getByText(text)).toBeInTheDocument();
        }
        // 他の作品の技術一覧は表示されない
        expect(screen.getAllByText('主な使用技術')).toHaveLength(1);
    });

    it('Close ボタンで Modal が閉じる', async () => {
        render(<WorkList />);
        await userEvent.click(screen.getByRole('img', { name: works[0].name }));
        await userEvent.click(screen.getByRole('button', { name: 'Close' }));
        expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument();
    });
});
