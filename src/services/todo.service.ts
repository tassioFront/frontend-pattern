import { ITodo, ITodoBoard } from '@/models/Todo';
import { storageService } from './localStorage/localStorage.service';
import { fakeApi } from './fakeApi';
import { StorageKeys } from '@/enums/storage-keys';

/*
 * Using localStorage and setTimeout as fake endpoints. Please, ignore it.
 */

export const postTodo = async (payload: ITodo): Promise<ITodo[]> => {
  await fakeApi(payload);
  const id = String(Date.now());
  const todo = { ...payload, id };
  const currentData =
    storageService.get<ITodoBoard[]>(StorageKeys.TodoBoardData) ?? [];
  const board = currentData.find(
    (board) => board.id === todo.status
  ) as ITodoBoard;
  board.todoItems.push(todo);
  storageService.set(StorageKeys.TodoBoardData, currentData);
  return board.todoItems;
};

export const putTodo = async (
  todoEdit: ITodo,
  currentStatus: string
): Promise<ITodo> => {
  await fakeApi(todoEdit);
  const currentData =
    storageService.get<ITodoBoard[]>(StorageKeys.TodoBoardData) ?? [];

  const board = currentData.find(
    (board) => board.id === currentStatus
  ) as ITodoBoard;
  const todo = board.todoItems.findIndex((item) => {
    return item.id === todoEdit.id;
  });

  if (todo === -1) {
    throw new Error('Todo not found');
  }
  const hasChangedStatus = currentStatus !== todoEdit.status;
  if (hasChangedStatus) {
    board.todoItems = board.todoItems.filter(
      (item: ITodo) => item.id !== todoEdit.id
    );
    const boardToUpdate = currentData.find(
      (board) => board.id === todoEdit.status
    ) as ITodoBoard;
    boardToUpdate.todoItems.unshift(todoEdit);
  } else {
    board.todoItems[todo] = { ...todoEdit };
  }
  storageService.set(StorageKeys.TodoBoardData, currentData);
  return todoEdit;
};

export const deleteTodo = async ({
  todoId,
  boardId,
}: {
  todoId: ITodo['id'];
  boardId: ITodoBoard['id'];
}): Promise<void> => {
  await fakeApi(todoId);
  const currentData = storageService.get<ITodoBoard[]>(
    StorageKeys.TodoBoardData
  );
  const boardIdx = currentData.findIndex((board) => board.id === boardId);
  currentData[boardIdx].todoItems = currentData[boardIdx].todoItems.filter(
    (todo) => todo.id !== todoId
  );
  storageService.set(StorageKeys.TodoBoardData, currentData);
};

export const getTodo = async () => {
  const currentData = storageService.get<ITodo[]>(StorageKeys.TodoData) ?? [];
  await fakeApi(currentData);
  return currentData;
};
