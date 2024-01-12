import { ITodoBoard } from '@/models/Todo';
import { storageService } from './localStorage/localStorage.service';
import { fakeApi } from './fakeApi';
import { StorageKeys } from '@/enums/storage-keys';

/*
 * Using localStorage and setTimeout as fake endpoints. Please, ignore it.
 */

export const postBoard = async (
  payload: Omit<ITodoBoard, 'id'>
): Promise<ITodoBoard> => {
  await fakeApi(payload);
  const id = String(Date.now());
  const board = { ...payload, id };
  const currentData =
    storageService.get<ITodoBoard[]>(StorageKeys.TodoBoardData) ?? [];
  currentData.push(board);
  storageService.set(StorageKeys.TodoBoardData, currentData);
  return board;
};

export const getTodoByBoardId = async (id: string) => {
  const currentData =
    storageService.get<ITodoBoard[]>(StorageKeys.TodoBoardData) ?? [];
  const todoItems = currentData.find((board) => board.id === id)
    ?.todoItems as ITodoBoard['todoItems'];
  await fakeApi(currentData);
  return todoItems;
};

export const deleteBoard = async ({
  boardId,
}: {
  boardId: ITodoBoard['id'];
}): Promise<void> => {
  await fakeApi(boardId);
  let currentData = storageService.get<ITodoBoard[]>(StorageKeys.TodoBoardData);
  currentData = currentData.filter((board) => board.id !== boardId);

  storageService.set(StorageKeys.TodoBoardData, currentData);
};

export const putBoard = async (boardEdit: ITodoBoard): Promise<ITodoBoard> => {
  await fakeApi(boardEdit);
  const currentData =
    storageService.get<ITodoBoard[]>(StorageKeys.TodoBoardData) ?? [];
  const todo = currentData.findIndex((todo) => todo.id === boardEdit.id);
  if (todo === -1) {
    throw new Error('Todo not found');
  }
  currentData[todo] = { ...boardEdit };
  storageService.set(StorageKeys.TodoBoardData, currentData);
  return currentData[todo];
};

export const patchBoardTitle = async (
  payload: Omit<ITodoBoard, 'todoItems'>
): Promise<ITodoBoard> => {
  await fakeApi(payload);
  const currentData =
    storageService.get<ITodoBoard[]>(StorageKeys.TodoBoardData) ?? [];
  const boardIdx = currentData.findIndex((board) => board.id === payload.id);
  if (boardIdx === -1) {
    throw new Error('Board not found');
  }
  currentData[boardIdx] = { ...currentData[boardIdx], title: payload.title };
  storageService.set(StorageKeys.TodoBoardData, currentData);
  return currentData[boardIdx];
};

export const getBoards = async () => {
  const currentData =
    storageService.get<ITodoBoard[]>(StorageKeys.TodoBoardData) ?? [];
  await fakeApi(currentData);
  return currentData;
};
