import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import Chip from './Chip';
import ChipGroup from './ChipGroup';
import { chipsTexts } from './content';

const error = vi.spyOn(console, 'error').mockImplementation(() => null);

describe('<Chips />', () => {
  beforeEach(() => {
    error.mockClear();
  });

  it('should render Chip children and not show an error', () => {
    render(
      <ChipGroup data-testid="chips">
        <Chip color="color" label="Hi, I am Chip component" />
        <Chip color="color" label="Hi, I am Chip component" />
      </ChipGroup>
    );
    const chips = screen.getByTestId('chips');
    expect(error).not.toBeCalledWith(chipsTexts.onError);
    expect(chips.firstChild?.textContent).toBe('Hi, I am Chip component');
  });
});
