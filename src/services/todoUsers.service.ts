import { ITodoUser } from '@/models/Todo';
import { storageService } from './localStorage/localStorage.service';
import { fakeApi } from './fakeApi';
import { StorageKeys } from '@/enums/storage-keys';

export const postTodoUser = async (payload: string): Promise<ITodoUser> => {
  await fakeApi(payload);
  const id = String(Date.now());
  const user = { name: payload, id };
  const currentData =
    storageService.get<ITodoUser[]>(StorageKeys.TodoUsersData) ?? [];
  currentData.push(user);
  storageService.set(StorageKeys.TodoUsersData, currentData);
  return user;
};

export const editTodoUser = async ({
  id,
  name,
}: ITodoUser): Promise<ITodoUser> => {
  await fakeApi(name);
  const currentData =
    storageService.get<ITodoUser[]>(StorageKeys.TodoUsersData) ?? [];
  const user = currentData.find((user) => user.id === id);
  if (user === undefined) {
    throw new Error('User not found');
  }
  user.name = name;
  storageService.set(StorageKeys.TodoUsersData, currentData);
  return user;
};

export const getTodoUsers = async () => {
  const currentData =
    storageService.get<ITodoUser[]>(StorageKeys.TodoUsersData) ?? [];
  await fakeApi(currentData);
  return currentData;
};
