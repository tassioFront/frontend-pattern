import { render, fireEvent, screen } from '@testing-library/react';

import Btn from './Btn';

describe('<Button />', () => {
  const onClick = jest.fn();
  beforeEach(() => {
    onClick.mockClear();
  });
  it('should render Btn with default values and behavior', () => {
    render(
      <Btn data-testid="btn" onClick={onClick}>
        Default
      </Btn>
    );
    const btn = screen.getByTestId('btn');
    expect(btn).toHaveClass('primary shape--default');
    expect(btn).toHaveAttribute('type', 'button');
    expect(btn.querySelector('.isLoading')).not.toBeInTheDocument();
    expect(btn.firstChild?.textContent).toBe('Default');
    fireEvent.click(screen.getByTestId('btn'));
    expect(onClick).toBeCalled();
  });

  it('should render Btn with primary color', () => {
    render(
      <Btn data-testid="btn" color="primary" onClick={onClick}>
        Primary
      </Btn>
    );
    const btn = screen.getByTestId('btn');
    expect(btn).toHaveClass('primary shape--default');
  });

  it('should render Btn with outlined shape', () => {
    render(
      <Btn data-testid="btn" color="primary" shape="outlined" onClick={onClick}>
        Primary
      </Btn>
    );
    const btn = screen.getByTestId('btn');
    expect(btn).toHaveClass('primary shape--outlined');
  });

  it('should not call onClick and show children when button is loading', () => {
    render(
      <Btn data-testid="btn" isLoading={true} onClick={onClick}>
        Loading
      </Btn>
    );
    const btn = screen.getByTestId('btn');
    expect(btn.querySelector('.isLoading')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(onClick).not.toBeCalled();
  });
});
