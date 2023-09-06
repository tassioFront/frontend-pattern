import { ITodo } from '@/models/Todo';
import { storageService } from './localStorage/localStorage.service';
import { fakeApi } from './fakeApi';
import { StorageKeys } from '@/enums/storage-keys';

/*
 * Using localStorage and setTimeout as fake endpoints. Please, ignore it.
 */

export const postTodo = async (payload: ITodo): Promise<ITodo> => {
  await fakeApi(payload);
  const id = String(Date.now());
  const todo = { ...payload, id };
  const currentData = storageService.get<ITodo[]>(StorageKeys.TodoData) ?? [];
  currentData.push(todo);
  storageService.set(StorageKeys.TodoData, currentData);
  return todo;
};

export const deleteTodo = async (payload: ITodo['id']): Promise<void> => {
  await fakeApi(payload);
  let currentData = storageService.get<ITodo[]>(StorageKeys.TodoData) ?? [];
  const todoIdx = currentData.findIndex((todo) => todo.id === payload);
  if (todoIdx === -1) {
    throw new Error('Todo not found');
  }
  currentData = currentData.filter((todo) => todo.id !== payload);
  storageService.set(StorageKeys.TodoData, currentData);
};

export const putTodo = async (todoEdit: ITodo): Promise<ITodo> => {
  await fakeApi(todoEdit);
  const currentData = storageService.get<ITodo[]>(StorageKeys.TodoData) ?? [];
  const todo = currentData.findIndex((todo) => todo.id === todoEdit.id);
  if (todo === -1) {
    throw new Error('Todo not found');
  }
  currentData[todo] = { ...todoEdit };
  storageService.set(StorageKeys.TodoData, currentData);
  return currentData[todo];
};

export const getTodo = async () => {
  const currentData = storageService.get<ITodo[]>(StorageKeys.TodoData) ?? [];
  await fakeApi(currentData);
  return currentData;
};
