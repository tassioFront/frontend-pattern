import { describe, it } from 'vitest';
import { polygonArea } from './polygonArea';

describe('challenges - polygonArea', () => {
  it('Should return the polygon area sum', () => {
    expect(polygonArea(2)).toBe(5);
    expect(polygonArea(3)).toBe(13);
    expect(polygonArea(1)).toBe(1);
    expect(polygonArea(5)).toBe(41);
    expect(polygonArea(7000)).toBe(97986001);
    expect(polygonArea(8000)).toBe(127984001);
    expect(polygonArea(9998)).toBe(199900013);
  });
});
