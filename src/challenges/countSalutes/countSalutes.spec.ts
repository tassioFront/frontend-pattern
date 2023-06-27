import { describe, it } from 'vitest';
import { countSalutes } from './countSalutes';

describe('challenges - countSalutes', () => {
  it('Should return how many salutes', () => {
    expect(countSalutes('<<----<>---<')).toBe(2);
    expect(countSalutes('<---->---<---<-->')).toBe(4);
    expect(countSalutes('>>>>>>>>>>>>>>>>>>>>>----<->')).toBe(42);
    expect(countSalutes('------')).toBe(0);
  });
});
