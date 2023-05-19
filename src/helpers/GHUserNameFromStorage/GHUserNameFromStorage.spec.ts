import * as service from '@/helpers/useInfo';

import { vi } from 'vitest';

import { GHUserNameFromStorage } from './GHUserNameFromStorage';

const getGHUserNameFromCache = vi.spyOn(service, 'getGHUserNameFromCache');
const onHasGHUserName = vi.fn();
const onNotHasGHUserName = vi.fn();

describe('GHUserNameFromStorage', () => {
  it('should call onNotHasGHUserName as there is not GH username', () => {
    getGHUserNameFromCache.mockReturnValue(null);
    GHUserNameFromStorage({ onHasGHUserName, onNotHasGHUserName });
    expect(onNotHasGHUserName).toBeCalled();
  });

  it('should call onHasGHUserName as there is GH username', () => {
    getGHUserNameFromCache.mockReturnValue('id');
    GHUserNameFromStorage({ onHasGHUserName, onNotHasGHUserName });
    expect(onHasGHUserName).toBeCalled();
  });
});
