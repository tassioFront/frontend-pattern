import { render, screen } from '@testing-library/react';

import TextList from './TextList';
import { vi } from 'vitest';

describe('<TextList />', () => {
  const onClick = vi.fn();
  beforeEach(() => {
    onClick.mockClear();
  });
  it('should render list of string with default type', () => {
    const list = ['item 1', 'item 2'];
    render(<TextList data-testid="text-list" list={list} />);
    const textList = screen.getByTestId('text-list');
    const liTags = textList.querySelectorAll('li');
    liTags.forEach((li, index) => {
      expect(li?.textContent).toBe(`- ${list[index]};`);
    });
    expect(textList).toHaveClass('dark');
  });

  it('should render list with light type', () => {
    const list = ['item 1', 'item 2'];
    render(<TextList data-testid="text-list" list={list} type="light" />);
    const textList = screen.getByTestId('text-list');
    expect(textList).toHaveClass('light');
  });
});
