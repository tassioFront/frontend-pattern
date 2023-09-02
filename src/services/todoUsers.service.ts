import { ITodoUser } from '@/models/Todo';
import { storageService } from './localStorage/localStorage.service';
import { fakeApi } from './fakeApi';

export const postTodoUser = async (payload: string): Promise<ITodoUser> => {
  await fakeApi(payload);
  const id = String(Date.now());
  const user = { name: payload, id };
  const currentData = storageService.get<ITodoUser[]>('td-u') ?? [];
  currentData.push(user);
  storageService.set('td-u', currentData);
  return user;
};

export const editTodoUser = async ({
  id,
  name,
}: ITodoUser): Promise<ITodoUser> => {
  await fakeApi(name);
  const currentData = storageService.get<ITodoUser[]>('td-u') ?? [];
  const user = currentData.find((user) => user.id === id);
  if (user === undefined) {
    throw new Error('User not found');
  }
  user.name = name;
  storageService.set('td-u', currentData);
  return user;
};

export const getTodoUsers = async () => {
  const currentData = storageService.get<ITodoUser[]>('td-u') ?? [];
  await fakeApi(currentData);
  return currentData;
};
