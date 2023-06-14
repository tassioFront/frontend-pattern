import { describe, it } from 'vitest';
import { mergeStringsAlternately } from './mergeStringsAlternately';

describe('challenges - mergeStringsAlternately', () => {
  it('Should return merged words', () => {
    expect(mergeStringsAlternately('abc', 'pqr')).toBe('apbqcr');
    expect(mergeStringsAlternately('abcd', 'efgh')).toBe('aebfcgdh');
    expect(mergeStringsAlternately('ab', 'efgh')).toBe('aebfgh');
    expect(mergeStringsAlternately('abce', 'gh')).toBe('agbhce');

    const abe = Array(100).fill('abeg').join('');
    const cdf = Array(100).fill('cdfj').join('');
    const acbdef = Array(100).fill('acbdefgj').join('');

    const start = performance.now();
    expect(mergeStringsAlternately(abe, cdf)).toBe(acbdef);
    console.log(performance.now() - start);
  });
});
