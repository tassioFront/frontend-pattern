import { getGHUserNameFromCache } from '@/helpers/useInfo';

interface IAuthValidation {
  onHasGHUserName?: () => void;
  onNotHasGHUserName?: () => void;
}

interface IAuthValidationResponse {
  GHUserName: string | null;
}
export const GHUserNameFromStorage = ({
  onHasGHUserName,
  onNotHasGHUserName,
}: IAuthValidation): IAuthValidationResponse => {
  const GHUserName = getGHUserNameFromCache();
  GHUserName !== null ? onHasGHUserName?.() : onNotHasGHUserName?.();

  return { GHUserName };
};
