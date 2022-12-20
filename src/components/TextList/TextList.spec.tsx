import { render, screen } from '@testing-library/react';

import TextList from './TextList';

describe('<TextList />', () => {
  const onClick = jest.fn();
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
    expect(textList).toHaveClass('light');
  });

  it('should render list with dark type', () => {
    const list = ['item 1', 'item 2'];
    render(<TextList data-testid="text-list" list={list} type="dark" />);
    const textList = screen.getByTestId('text-list');
    expect(textList).toHaveClass('dark');
  });
});
