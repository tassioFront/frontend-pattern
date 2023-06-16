import { describe, it } from 'vitest';
import { isPalindrome } from './isPalindrome';

describe('challenges - isPalindrome', () => {
  it('Should return true when is a palindrome', () => {
    expect(isPalindrome(' ')).toBeTruthy();
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBeTruthy();
    expect(isPalindrome('race a car')).toBeFalsy();
    expect(isPalindrome('A man, a plan, a canal: Panam')).toBeFalsy();
    expect(isPalindrome('A man, a plan, a canal: Panam')).toBeFalsy();
    expect(isPalindrome('A man@, a _plan,  a^ canal,.: Panama')).toBeTruthy();
    expect(
      isPalindrome('bbbbbA man, a plan, a canal: Panamaaaaaa')
    ).toBeFalsy();
  });
});
