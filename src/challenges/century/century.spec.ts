import { describe, it } from 'vitest';
import { century } from './century';

describe('challenges - century', () => {
  it('Should return century by a given year', () => {
    expect(century(1)).toBe(1);
    expect(century(3)).toBe(1);
    expect(century(10)).toBe(1);
    expect(century(100)).toBe(1);
    expect(century(101)).toBe(2);
    expect(century(1700)).toBe(17);
    expect(century(1988)).toBe(20);
    expect(century(1905)).toBe(20);
    expect(century(2001)).toBe(21);
  });
});
