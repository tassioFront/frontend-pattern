import { StorageKeys } from '@/enums/storage-keys';
import { loginResolvedRouter } from '@/routes/resolvedRoutes';
import { storageService } from '@/services/localStorage/localStorage.service';

export const getGHUserNameFromCache = (): string | null =>
  storageService.get(StorageKeys.GHUserName);

export const fakeLogout = (): void => {
  storageService.remove(StorageKeys.GHUserName);
  window.location.href = loginResolvedRouter;
};
