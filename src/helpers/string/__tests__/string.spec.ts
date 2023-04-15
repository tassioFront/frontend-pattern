import { createIdByString } from '../string';

const MOCK_ID = {
  simpleTitle: 'title 1',
  simpleTitleResult: 'title-1',
  avoidSymbol: 'title.,:()two',
  avoidSymbolResult: 'titletwo',
};

describe('string - createIdByString', () => {
  it('convert simple title to id format', () => {
    expect(createIdByString(MOCK_ID.simpleTitle)).toBe(
      MOCK_ID.simpleTitleResult
    );
    expect(createIdByString(MOCK_ID.avoidSymbol)).toBe(
      MOCK_ID.avoidSymbolResult
    );
  });
});
