import { render, screen } from '@testing-library/react';

import AssociatedChips from './AssociatedChips';

describe('<AssociatedChips />', () => {
  it('should render AssociatedChips with not error event it is empty', () => {
    render(
      <AssociatedChips
        data-testid="a-chips"
        options={[]}
        onClick={() => {}}
        className="testid-chips"
      />
    );
    const AChips = screen.getByTestId('a-chips');
    expect(AChips).toBeInTheDocument();
  });

  it('should render AssociatedChips with data', () => {
    render(
      <AssociatedChips
        onClick={() => {}}
        data-testid="a-chips"
        options={['chip-1', 'chip-2']}
        className="testid-chips"
      />
    );
    const AChips = screen.getByTestId('a-chips');
    expect(AChips.firstChild?.textContent).toBe('chip-1');
  });
});
