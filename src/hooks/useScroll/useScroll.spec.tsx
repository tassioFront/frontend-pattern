import { fireEvent, renderHook } from '@testing-library/react';
import { useScroll } from './useScroll';
import { vi } from 'vitest';

describe('hooks - useScroll', () => {
  it('Should call callback when has scrolled', () => {
    const checkHasScroll = vi.fn();
    renderHook(() => useScroll(checkHasScroll));
    expect(checkHasScroll).not.toBeCalled();
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(checkHasScroll).toBeCalled();
  });
});
