import { StorageKeys } from '@/enums/storage-keys';
import { loginResolvedRouter } from '@/routes/resolvedRoutes';
import { storageService } from '@/services/localStorage/localStorage.service';
import { IUserGithub } from '@/models/UserGithub';

export const getGHUserNameFromCache = (): string | null =>
  storageService.get<string>(StorageKeys.GHUserName);

export const getGHUserDataFromCache = (): IUserGithub | null =>
  storageService.get<IUserGithub | null>(StorageKeys.GHUserData);

export const fakeLogout = (): void => {
  storageService.remove(StorageKeys.GHUserName);
  window.location.href = loginResolvedRouter;
};
