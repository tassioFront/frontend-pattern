import { ITodo, ITodoBoard } from '@/models/Todo';
import { storageService } from '../../localStorage/localStorage.service';
import { fakeApi } from '../../fakeApi';
import { StorageKeys } from '@/enums/storage-keys';
import { createFakeId } from '../createFakeId';

/*
 * BACKEND_LESS
 * This is just to simulate a backend and make dynamic todos (please ignore for frontend purposes)
 * I might create a real service in the future and take care of if
 */
export const getTodos = async () => {
  const currentData = storageService.get<ITodo[]>(StorageKeys.TodoData) ?? [];
  await fakeApi(currentData);

  return currentData;
};

export const getBoards = async () => {
  const currentData =
    storageService.get<ITodoBoard[]>(StorageKeys.TodoBoardData) ?? [];
  await fakeApi(currentData);
  return currentData;
};

interface IGetTodosByBoardId {
  boardId: ITodoBoard['id'];
}
export const getTodosByBoardId = async ({
  boardId,
}: IGetTodosByBoardId): Promise<ITodo[] | []> => {
  const todos = await getTodos();
  const boards = await getBoards();
  const todosGroup = todos.filter((todo) => todo.boardId === boardId);
  const todosOrder = boards.find((board) => board.id === boardId)?.todosOrder;

  if (todosOrder?.length === undefined || todosOrder?.length <= 0) {
    return [];
  }
  return todosOrder?.map((order) => {
    return {
      ...(todosGroup.find((todo) => todo.id === order) as ITodo),
    };
  });
};

interface IPostBoardParams {
  title: ITodoBoard['title'];
}
export const postBoard = async ({
  title,
}: IPostBoardParams): Promise<ITodoBoard> => {
  const newBoard: ITodoBoard = {
    id: Date.now().toString(),
    title,
    todosOrder: [],
    todoItems: [],
  };

  const boards = await getBoards();
  boards.push(newBoard);
  storageService.set(StorageKeys.TodoBoardData, boards);

  return newBoard;
};

interface IPostTodo {
  todo: Omit<ITodo, 'id'>;
  boardId: ITodoBoard['id'];
}
export const postTodo = async ({
  todo,
  boardId,
}: IPostTodo): Promise<ITodo> => {
  await fakeApi(todo);
  const id = createFakeId();
  const todoUpdated = { ...todo, id };
  const currentBoards =
    storageService.get<ITodoBoard[]>(StorageKeys.TodoBoardData) ?? [];
  const boardIdx = currentBoards.findIndex((board) => board.id === boardId);
  const currentTodos = storageService.get<ITodo[]>(StorageKeys.TodoData) ?? [];

  if (!currentBoards.length || boardIdx === -1) {
    throw new Error('Board was not found');
  }

  currentBoards[boardIdx].todosOrder.push(todoUpdated.id);
  currentTodos.push(todoUpdated);

  storageService.set(StorageKeys.TodoBoardData, currentBoards);
  storageService.set(StorageKeys.TodoData, currentTodos);
  return todoUpdated;
};

export interface IPutBoardTitle {
  title: ITodoBoard['title'];
  boardId: ITodoBoard['id'];
}
export const putBoardTitle = async ({
  boardId,
  title,
}: IPutBoardTitle): Promise<ITodoBoard | null> => {
  const boards = await getBoards();
  const boardIdx = boards.findIndex((todo) => todo.id === boardId);

  if (boardIdx === -1) {
    throw new Error('Board was not found');
  }
  const updatedBoardData = { ...boards[boardIdx], title };
  boards[boardIdx] = updatedBoardData;
  storageService.set(StorageKeys.TodoBoardData, boards);
  return updatedBoardData;
};

export interface IPutTodoById {
  todoId: ITodo['id'];
  updatedTodo: ITodo;
}
export const putTodoById = async ({
  todoId,
  updatedTodo,
}: IPutTodoById): Promise<ITodo> => {
  const todos = await getTodos();
  const todoIdx = todos.findIndex((todo) => todo.id === todoId);

  if (todoIdx === -1) {
    throw new Error('Todo was not found');
  }
  const hasChangedStatus = todos[todoIdx].boardId !== updatedTodo.boardId;

  if (hasChangedStatus) {
    const boards = await getBoards();
    const boardIdxToRemover = boards.findIndex(
      (board) => board.id === todos[todoIdx].boardId
    );
    const boardIdxToAdd = boards.findIndex(
      (board) => board.id === updatedTodo.boardId
    );

    boards[boardIdxToRemover].todosOrder = boards[
      boardIdxToRemover
    ].todosOrder.filter((id) => id !== updatedTodo.id);
    boards[boardIdxToAdd].todosOrder.unshift(updatedTodo.id);
    storageService.set(StorageKeys.TodoBoardData, boards);
  }

  const updatedTodoData = { ...todos[todoIdx], ...updatedTodo };
  todos[todoIdx] = updatedTodoData;
  storageService.set(StorageKeys.TodoData, todos);
  return updatedTodoData;
};

export interface IPutMoveTodoToAnotherBoard {
  todoId: ITodo['id'];
  sourceBoardId: ITodoBoard['id'];
  targetBoardId: ITodoBoard['id'];
  newIndex: number;
}
export const putMoveTodoToAnotherBoard = async ({
  sourceBoardId,
  targetBoardId,
  todoId,
  newIndex,
}: IPutMoveTodoToAnotherBoard): Promise<void> => {
  const boards = await getBoards();
  const sourceIndex = boards.findIndex((board) => board.id === sourceBoardId);
  const targetIndex = boards.findIndex((board) => board.id === targetBoardId);

  if (sourceIndex === -1) {
    throw new Error('sourceBoardId board not found');
  }

  if (targetIndex === -1) {
    throw new Error('targetBoardId board not found');
  }

  boards[sourceIndex].todosOrder = boards[sourceIndex].todosOrder.filter(
    (todo) => todo !== todoId
  );

  const hasTodo = boards[targetIndex].todosOrder.indexOf(todoId);

  if (hasTodo !== -1) {
    throw new Error('todo is already there');
  }

  boards[targetIndex].todosOrder.splice(newIndex, 0, todoId);

  const todos = await getTodos();
  const updatedTodo = todos.find((todo) => todo.id === todoId);

  if (!updatedTodo) {
    throw new Error('todoId todo not found');
  }

  const todoIdx = todos.findIndex((todo) => todo.id === todoId);

  if (todoIdx === -1) {
    throw new Error('Todo was not found');
  }

  const updatedTodoData = {
    ...todos[todoIdx],
    ...updatedTodo,
    boardId: targetBoardId,
  };
  todos[todoIdx] = updatedTodoData;

  storageService.set(StorageKeys.TodoData, todos);
  storageService.set(StorageKeys.TodoBoardData, boards);
};

export interface IPutTodoToAnotherIndex {
  todoId: ITodo['id'];
  boardId: ITodoBoard['id'];
  newIndex: number;
}
export const putMoveTodoToAnotherIndex = async ({
  boardId,
  todoId,
  newIndex,
}: IPutTodoToAnotherIndex): Promise<void> => {
  const boards = await getBoards();
  const sourceIndex = boards.findIndex((board) => board.id === boardId);

  if (sourceIndex === -1) {
    throw new Error('boardId board not found');
  }

  const fromIdx = boards[sourceIndex].todosOrder.indexOf(todoId);

  if (fromIdx === -1) {
    throw new Error('todoId todo not found');
  }
  boards[sourceIndex].todosOrder.splice(fromIdx, 1);
  boards[sourceIndex].todosOrder.splice(newIndex, 0, todoId);
  storageService.set(StorageKeys.TodoBoardData, boards);
};

export interface IDeleteTodoById {
  todoId: ITodo['id'];
  boardId: ITodo['boardId'];
}
export const deleteTodoById = async ({
  todoId,
  boardId,
}: IDeleteTodoById): Promise<void> => {
  const boards = await getBoards();
  let todos = await getTodos();
  const boardIdx = boards.findIndex((board) => board.id === boardId);

  if (boardIdx === -1) {
    throw new Error('boardId board not found');
  }
  boards[boardIdx].todosOrder = boards[boardIdx].todosOrder.filter(
    (id) => id !== todoId
  );
  todos = todos.filter((todo) => todo.id !== todoId);

  storageService.set(StorageKeys.TodoBoardData, boards);
  storageService.set(StorageKeys.TodoData, todos);
};

export interface IDeleteBoardById {
  boardId: ITodo['boardId'];
}
export const deleteBoardById = async ({
  boardId,
}: IDeleteBoardById): Promise<void> => {
  const boards = await getBoards();
  const todos = await getTodos();
  const sourceIndex = boards.findIndex((board) => board.id === boardId);

  if (sourceIndex === -1) {
    throw new Error('boardId board not found');
  }

  const boardsUpdated = boards.filter((board) => board.id !== boardId);
  const todosUpdated = todos.filter((todo) => todo.boardId !== boardId);

  storageService.set(StorageKeys.TodoBoardData, boardsUpdated);
  storageService.set(StorageKeys.TodoData, todosUpdated);
};
