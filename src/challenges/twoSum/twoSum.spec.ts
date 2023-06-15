import { describe, it } from 'vitest';
import { twoSum, twoSum2 } from './twoSum';

describe('challenges - twoSum', () => {
  it('Should return the two required indexes to sum', () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
    expect(twoSum([2, 7, 11, 15], 26)).toEqual([2, 3]);

    expect(twoSum2([3, 2, 4], 6)).toEqual([1, 2]);
    expect(twoSum2([2, 7, 11, 15], 9)).toEqual([0, 1]);
    expect(twoSum2([3, 3], 6)).toEqual([0, 1]);
    expect(twoSum2([2, 7, 11, 15], 26)).toEqual([2, 3]);
    const start = performance.now();
    expect(twoSum2([2, 7, 11, 15, 3, 4, 9, 6], 8)).toEqual([0, 7]);
    console.log(performance.now() - start);
    const start2 = performance.now();
    expect(twoSum([2, 7, 11, 15, 3, 4, 9, 6], 8)).toEqual([0, 7]);
    console.log(performance.now() - start2);
  });
});
