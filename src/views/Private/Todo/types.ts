import { ITodo } from '@/models/Todo';

export interface IBoardActions {
  replaceBoardTodos: (payload: {
    todoItems: ITodo | ITodo[];
    currentStatus: string;
  }) => void;
  updateTodoByBoardId: (payload: {
    itemEdit: ITodo;
    currentStatus: string;
  }) => void;
  deleteTodo: (payload: { boardToUpdateId: string; todoId: string }) => void;
  deleteBoard: (payload: { boardToUpdateId: string }) => void;
  updateBoardTitle: (payload: {
    currentStatus: string;
    newTitle: string;
  }) => void;
}

export interface IWOAction {
  action:
    | 'replaceBoardTodos'
    | 'updateTodoByBoardId'
    | 'deleteTodo'
    | 'updateBoardTitle';
}
