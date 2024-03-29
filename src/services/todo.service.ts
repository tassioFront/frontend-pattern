import { ITodo, ITodoBoard } from '@/models/Todo';
import {
  IDeleteBoardById,
  IDeleteTodoById,
  IPutBoardTitle,
  IPutMoveTodoToAnotherBoard,
  IPutTodoById,
  IPutTodoToAnotherIndex,
  deleteBoardById,
  deleteTodoById,
  getBoards,
  getTodosByBoardId,
  postBoard,
  postTodo,
  putBoardTitle,
  putMoveTodoToAnotherBoard,
  putMoveTodoToAnotherIndex,
  putTodoById,
} from './backendLess/todos/todos';

/*
 * Using localStorage and setTimeout as fake endpoints. Please, ignore it.
 */

export const readBoards = async () => {
  const response = await getBoards();
  return response;
};

interface IReadTodosByBoardId {
  boardId: ITodoBoard['id'];
}
export const readTodosByBoardId = async ({
  boardId,
}: IReadTodosByBoardId): Promise<ITodo[] | []> => {
  const todos = await getTodosByBoardId({
    boardId,
  });

  return todos;
};

export const createBoard = async (
  board: Omit<ITodoBoard, 'id' | 'todoItems'>
): Promise<ITodoBoard> => {
  const response = await postBoard(board);
  return response;
};

interface ICreateTodo {
  boardId: ITodoBoard['id'];
  todo: Omit<ITodo, 'id'>;
}
export const createTodo = async ({ boardId, todo }: ICreateTodo) => {
  const response = await postTodo({ todo, boardId });
  return response;
};

export const updateBoardTitle = async (payload: IPutBoardTitle) => {
  const response = await putBoardTitle(payload);

  return response;
};

export const updateTodoById = async (payload: IPutTodoById) => {
  const response = await putTodoById(payload);

  return response;
};

export const updateMoveTodoToAnotherBoard = async (
  payload: IPutMoveTodoToAnotherBoard
) => {
  const response = await putMoveTodoToAnotherBoard(payload);
  return response;
};

export const updateMoveTodoToAnotherIndex = async (
  payload: IPutTodoToAnotherIndex
) => {
  const response = await putMoveTodoToAnotherIndex(payload);
  return response;
};

export const removeBoardById = async (payload: IDeleteBoardById) => {
  await deleteBoardById(payload);
};

export const removeTodoById = async (payload: IDeleteTodoById) => {
  await deleteTodoById(payload);
};
