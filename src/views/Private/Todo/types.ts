import { ITodo } from '@/models/Todo';

export interface IBoardActions {
  replaceBoardTodos: ({
    todoItems,
    currentStatus,
  }: {
    todoItems: ITodo | ITodo[];
    currentStatus: string;
  }) => void;
  updateTodoByBoardId: ({
    itemEdit,
    currentStatus,
  }: {
    itemEdit: ITodo;
    currentStatus: string;
  }) => void;
  deleteTodo: ({
    boardToUpdateId,
    todoId,
  }: {
    boardToUpdateId: string;
    todoId: string;
  }) => void;

  deleteBoard: ({ boardToUpdateId }: { boardToUpdateId: string }) => void;
  updateBoardTitle: ({
    currentStatus,
    newTitle,
  }: {
    currentStatus: string;
    newTitle: string;
  }) => void;
}
