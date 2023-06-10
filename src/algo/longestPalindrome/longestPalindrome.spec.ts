import { longestPalindrome } from './longestPalindrome';

describe('algo - longestPalindrome', () => {
  it('should return palindrome if there is', () => {
    expect(longestPalindrome('babad')).toBe('aba');
    expect(longestPalindrome('babbbad')).toBe('abbba');
    expect(longestPalindrome('bababad')).toBe('ababa');
    expect(longestPalindrome('bcababacd')).toBe('cababac');
    expect(longestPalindrome('cbbd')).toBe('bb');
    expect(longestPalindrome('bbd')).toBe('bb');
    expect(longestPalindrome('babbbad')).toBe('abbba');
    expect(longestPalindrome('tassio')).toBe('ss');
    expect(longestPalindrome('')).toBe('');
  });
});
