import { StorageKeys } from '@/enums/storage-keys';
import { storageService } from '@/services/localStorage/localStorage.service';

export const getGHUserNameFromCache = (): string | null =>
  storageService.get(StorageKeys.GHUserName);
