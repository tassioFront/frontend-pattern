import { describe, it } from 'vitest';
import { vasyaClerk } from './vasyaClerk';

describe('challenges - vasyaClerk', () => {
  it('[25, 25, 50]', () => expect(vasyaClerk([25, 25, 50])).toBe('YES'));
  it('[25, 100]', () => expect(vasyaClerk([25, 100])).toBe('NO'));
  it('[25,50,25,100,25,25,25,100,25,25,50,100,50,25]', () =>
    expect(
      vasyaClerk([25, 50, 25, 100, 25, 25, 25, 100, 25, 25, 50, 100, 50, 25])
    ).toBe('NO'));
});
