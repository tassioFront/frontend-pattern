import { describe, it } from 'vitest';
import { romanToInteger } from './romanToInteger';

describe('challenges - romanToInteger', () => {
  it('Should transform roman number into integer', () => {
    expect(romanToInteger('III')).toBe(3);
    expect(romanToInteger('IV')).toBe(4);
    expect(romanToInteger('IX')).toBe(9);
    expect(romanToInteger('VIII')).toBe(8);
    expect(romanToInteger('LVIII')).toBe(58);
    expect(romanToInteger('MCMXCIV')).toBe(1994);
    expect(romanToInteger('MMMCMXCIX')).toBe(3999);
  });
});
