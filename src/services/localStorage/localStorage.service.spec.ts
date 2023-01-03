import { storageService } from './localStorage.service';

const fakeData = {
  object: { test: 'test' },
  string: 'test',
};

const localStorageMock = (() => {
  return {
    getItem(key: string) {
      return fakeData[key as keyof typeof fakeData];
    },
    setItem(key: string, value: any) {
      fakeData[key as keyof typeof fakeData] = value;
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('localStorage', () => {
  const THERE_IS_NOT_AT_STORAGE = 'not-exist';
  const OBJECT_TYPE = 'object';
  const STRING_TYPE = 'string';
  it('get - should return data from local storage', () => {
    expect(storageService.get(THERE_IS_NOT_AT_STORAGE)).toBe(undefined);
    expect(storageService.get(OBJECT_TYPE)).toEqual(fakeData[OBJECT_TYPE]);
    expect(storageService.get(STRING_TYPE)).toEqual(fakeData[STRING_TYPE]);
  });
  it('set - should set data at local storage', () => {
    storageService.set(OBJECT_TYPE, { test: 'other' });
    expect(storageService.get(OBJECT_TYPE)).toEqual({ test: 'other' });
    storageService.set(STRING_TYPE, 'another');
    expect(storageService.get(STRING_TYPE)).toBe('another');
  });
});
