import { longestConsecutiveSequence } from './longestConsecutiveSequence';

describe('algo - longestConsecutiveSequence', () => {
  it('should return the longest sequence by given array', () => {
    const nums = [100, 4, 200, 1, 3, 2];
    expect(longestConsecutiveSequence(nums)).toBe(4);
    expect(longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])).toBe(9);
    expect(
      longestConsecutiveSequence([
        0, 3, 7, 2, 5, 8, 4, 6, 0, 1, 10, 200, 300, 400, 500, 45, 12, 9, 11, 11,
        11,
      ])
    ).toBe(13);
  });
});
