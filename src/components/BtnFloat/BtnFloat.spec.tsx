import { fireEvent, render, screen } from '@testing-library/react';
import BtnFloat from './BtnFloat';

describe('BtnFloat', () => {
  it('Should show btn float when scrollY is grater than showNumber', () => {
    render(
      <BtnFloat dataTestid="btn-float-1" showNumber={500}>
        btn float
      </BtnFloat>
    );
    const getBtn = (): HTMLElement => screen.getByTestId('btn-float-1');

    expect(getBtn()).not.toHaveClass('show');
    fireEvent.scroll(window, { target: { scrollY: 1000 } });
    expect(getBtn()).toHaveClass('show');
  });
});
