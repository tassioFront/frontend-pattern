import { describe, it } from 'vitest';
import { reverseInteger } from './reverseInteger';

describe('challenges - reverseInteger', () => {
  it('Should return reversed integer', () => {
    expect(reverseInteger(123)).toBe(321);
    expect(reverseInteger(-123)).toBe(-321);
    expect(reverseInteger(120)).toBe(21);

    // it violates the challenge constraints, so return 0
    expect(reverseInteger(1534236469)).toBe(0);
  });
});
