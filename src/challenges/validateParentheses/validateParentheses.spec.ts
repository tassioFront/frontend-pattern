import { describe, it } from 'vitest';
import { validateParentheses } from './validateParentheses';

describe('challenges - validateParentheses', () => {
  it('Should return true if is there are only valid parentheses', () => {
    expect(validateParentheses('()')).toBeTruthy();
    expect(validateParentheses('')).toBeTruthy();
    expect(validateParentheses(')(()))')).toBeFalsy();
    expect(validateParentheses('((()))')).toBeTruthy();
    expect(validateParentheses(')((()))(')).toBeFalsy();
    expect(validateParentheses('(')).toBeFalsy();
    expect(validateParentheses('(())((()())())')).toBeTruthy();
  });
});
