import { getGHUserNameFromCache } from '@/helpers/useInfo';
import { useEffect } from 'react';

interface IUseAuthValidation {
  onAuth?: () => void;
  onNotAuth?: () => void;
}
export const useGHUserNameCache = ({
  onAuth,
  onNotAuth,
}: IUseAuthValidation): void => {
  const GHUserName = getGHUserNameFromCache();
  useEffect(() => {
    GHUserName !== null ? onAuth?.() : onNotAuth?.();
  }, [GHUserName]);
};
