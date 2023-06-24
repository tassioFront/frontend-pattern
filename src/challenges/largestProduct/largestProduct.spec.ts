import { describe, it } from 'vitest';
import { largestProduct } from './largestProduct';

describe('challenges - largestProduct', () => {
  it('Should return largestProduct by a given array of integer', () => {
    expect(largestProduct([3, 6, -2, -5, 7, 3])).toBe(21);
    expect(largestProduct([-1, -2])).toBe(2);
    expect(largestProduct([5, 1, 2, 3, 1, 4])).toBe(6);
    expect(largestProduct([1, 2, 3, 0])).toBe(6);
    expect(largestProduct([9, 5, 10, 2, 24, -1, -48])).toBe(50);
    expect(largestProduct([-23, 4, -3, 8, -12])).toBe(-12);
    expect(largestProduct([1, 0, 1, 0, 1000])).toBe(0);
  });
});
