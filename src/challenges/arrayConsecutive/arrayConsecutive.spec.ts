import { describe, it } from 'vitest';
import { arrayConsecutive } from './arrayConsecutive';

describe('challenges - arrayConsecutive', () => {
  it('Should return the amount of missing sequence to complete the array', () => {
    expect(arrayConsecutive([6, 2, 3, 8])).toBe(3);
    expect(arrayConsecutive([0, 3])).toBe(2);
    expect(arrayConsecutive([5, 4, 6])).toBe(0);
    expect(arrayConsecutive([6, 3])).toBe(2);
    expect(arrayConsecutive([1])).toBe(0);
  });
});
