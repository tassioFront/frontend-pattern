import { getGHUserNameFromCache } from '@/helpers/useInfo';
import { useEffect } from 'react';

interface IUseAuthValidation {
  onHasGHUserName?: () => void;
  onNotHasGHUserName?: () => void;
}

interface IUseAuthValidationResponse {
  GHUserName: string | null;
}
export const useGHUserNameFromStorage = ({
  onHasGHUserName,
  onNotHasGHUserName,
}: IUseAuthValidation): IUseAuthValidationResponse => {
  const GHUserName = getGHUserNameFromCache();
  useEffect(() => {
    GHUserName !== null ? onHasGHUserName?.() : onNotHasGHUserName?.();
  }, [GHUserName]);

  return { GHUserName };
};
