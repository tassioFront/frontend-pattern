import { ITodo, ITodoBoard } from '@/models/Todo';
import { IWOAction } from './types';

let boards = [] as ITodoBoard[];

self.onmessage = (
  e: MessageEvent<{
    boards: ITodoBoard[];
    todoItems: ITodo[] | ITodo;
    itemEdit: ITodo;
    currentStatus: string;
    action: IWOAction['action'];
    boardToUpdateId: ITodoBoard['id'];
    todoId: ITodo['id'];
    newTitle: string;
  }>
) => {
  if (e.data.action === 'replaceBoardTodos') {
    if (!boards.length || boards?.length !== e.data.boards?.length) {
      boards = e.data.boards;
    }
    const todoItems = e.data.todoItems;
    const currentStatus = e.data.currentStatus;

    const boardToUpdate = boards.findIndex(
      (copyBoard) => copyBoard.id === currentStatus
    );

    if ((todoItems as ITodo[])?.length !== undefined) {
      boards[boardToUpdate].todoItems = todoItems as ITodo[];
    } else {
      boards[boardToUpdate]?.todoItems?.push?.(todoItems as ITodo);
    }

    self.postMessage({ boards, action: 'replaceBoardTodos' });
  }

  if (e.data.action === 'updateTodoByBoardId') {
    const copyBoards = e.data.boards;
    const itemEdit = e.data.itemEdit;
    const currentStatus = e.data.currentStatus;

    const sourceBoard = copyBoards.find(
      (board) => board.id === currentStatus
    ) as ITodoBoard;
    const todo = sourceBoard.todoItems.findIndex((item) => {
      return item.id === itemEdit.id;
    });
    const hasChangedStatus = currentStatus !== itemEdit.boardId;

    if (hasChangedStatus) {
      sourceBoard.todoItems = sourceBoard.todoItems.filter(
        (item: ITodo) => item.id !== itemEdit.id
      );
      const destinationBoard = copyBoards.find(
        (board) => board.id === itemEdit.boardId
      ) as ITodoBoard;
      destinationBoard.todoItems.unshift(itemEdit);
    } else {
      sourceBoard.todoItems[todo] = { ...itemEdit };
    }

    self.postMessage({ boards: copyBoards, action: 'updateTodoByBoardId' });
  }

  if (e.data.action === 'deleteTodo') {
    const copyBoards = e.data.boards;
    const boardToUpdateId = e.data.boardToUpdateId;
    const todoId = e.data.todoId;

    const boardIdx = copyBoards.findIndex(
      (board) => board.id === boardToUpdateId
    );
    copyBoards[boardIdx].todoItems = copyBoards[boardIdx].todoItems.filter(
      (todo) => todo.id !== todoId
    );

    self.postMessage({ boards: copyBoards, action: 'deleteTodo' });
  }

  if (e.data.action === 'updateBoardTitle') {
    const copyBoards = e.data.boards;
    const currentStatus = e.data.currentStatus;
    const newTitle = e.data.newTitle;

    const boardToUpdate = copyBoards.find(
      (copyBoard) => copyBoard.id === currentStatus
    ) as ITodoBoard;
    boardToUpdate.title = newTitle;

    self.postMessage({ boards: copyBoards, action: 'updateBoardTitle' });
  }
};
