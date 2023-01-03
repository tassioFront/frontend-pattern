import { getGHUserNameFromCache } from '@/helpers/useInfo';
import { useEffect } from 'react';

interface IUseAuthValidation {
  onAuth?: () => void;
  onNotAuth?: () => void;
}

interface IUseAuthValidationResponse {
  GHUserName: string | null;
}
export const useGHUserNameFromStorage = ({
  onAuth,
  onNotAuth,
}: IUseAuthValidation): IUseAuthValidationResponse => {
  const GHUserName = getGHUserNameFromCache();
  useEffect(() => {
    GHUserName !== null ? onAuth?.() : onNotAuth?.();
  }, [GHUserName]);

  return { GHUserName };
};
