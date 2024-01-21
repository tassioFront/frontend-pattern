import { describe, it, vi, expect } from 'vitest';
import {
  deleteBoardById,
  deleteTodoById,
  getBoards,
  getTodos,
  getTodosByBoardId,
  postBoard,
  postTodo,
  putBoardTitle,
  putMoveTodoToAnotherBoard,
  putMoveTodoToAnotherIndex,
  putTodoById,
} from '../todos';
import { ITodo } from '@/models/Todo';
import { storageService } from '../../../localStorage/localStorage.service';
import * as fakeService from '../../createFakeId';

const createFakeId = vi.spyOn(fakeService, 'createFakeId');

const localStorageGet = vi.spyOn(storageService, 'get');
const localStorageSet = vi
  .spyOn(storageService, 'set')
  .mockImplementation(() => null);

describe('todos - backendLess - empty state and fails', () => {
  it('Should treat return empty state when try to get todos or boards', async () => {
    const boards = await getBoards();
    const todos = await getTodos();
    const todosByBoardId = await getTodosByBoardId({ boardId: 123 });

    expect(boards).toEqual([]);
    expect(todos).toEqual([]);
    expect(todosByBoardId).toEqual([]);
  });
  it('Should not insert the first task as there is not board to insert it', async () => {
    let err = new Error('');
    try {
      await postTodo({
        todo: {
          title: 'Should not create it',
        } as ITodo,
        boardId: 123,
      });
    } catch (error) {
      err = error;
    }

    expect(err.message.includes('Board was not found')).toBeTruthy();
  });
  it('Should not be able to update board and todo as there are not either', async () => {
    let todoErr = new Error('');
    try {
      await putTodoById({
        todoId: 123,
        updatedTodo: {
          title: 'should not update',
        },
      });
    } catch (error) {
      todoErr = error;
    }

    let boardErr = new Error('');
    try {
      await putBoardTitle({
        boardId: 123,
        title: 'Should not update',
      });
    } catch (error) {
      boardErr = error;
    }

    expect(boardErr.message.includes('Board was not found')).toBeTruthy();
    expect(todoErr.message.includes('Todo was not found')).toBeTruthy();
  });

  it('Should not move todo position as there is no board', async () => {
    let wrongSourceErr = new Error('');
    try {
      await putMoveTodoToAnotherIndex({
        boardId: 123,
        todoId: 789,
        newIndex: 2,
      });
    } catch (error) {
      wrongSourceErr = error;
    }

    expect(wrongSourceErr.message).toBe('boardId board not found');
  });
  it('Should not move todo to another board', async () => {
    // validate wrong sourceBoardId
    let wrongSourceErr = new Error('');
    try {
      await putMoveTodoToAnotherBoard({
        sourceBoardId: 123,
        targetBoardId: 145,
        todoId: 789,
        newIndex: 2,
      });
    } catch (error) {
      wrongSourceErr = error;
    }

    expect(
      wrongSourceErr.message.includes('sourceBoardId board not found')
    ).toBeTruthy();

    // validate wrong targetBoardId
    localStorageGet.mockImplementationOnce(() => [{ id: 123 }]);
    let wrongTargetErr = new Error('');
    try {
      await putMoveTodoToAnotherBoard({
        sourceBoardId: 123,
        targetBoardId: 145,
        todoId: 789,
        newIndex: 2,
      });
    } catch (error) {
      wrongTargetErr = error;
    }

    expect(wrongTargetErr.message).toBe('targetBoardId board not found');

    // validate wrong todoId
    localStorageGet.mockImplementationOnce(() => [
      { id: 123, todosOrder: [] },
      { id: 145, todosOrder: [] },
    ]);
    let todoIdErr = new Error('');
    try {
      await putMoveTodoToAnotherBoard({
        sourceBoardId: 123,
        targetBoardId: 145,
        todoId: 789,
        newIndex: 2,
      });
    } catch (error) {
      todoIdErr = error;
    }

    expect(todoIdErr.message).toBe('todoId todo not found');
  });
});

describe('todos - backendLess - happy cases', () => {
  beforeEach(() => {
    localStorageSet.mockClear();
    localStorageGet.mockClear();
  });

  const boardMock1 = { id: 123, title: 'Todo', todosOrder: [] };
  const boardMock3 = { id: 789, title: 'Todo', todosOrder: ['1', '2'] };
  const boardMock4 = { id: 115, title: 'In Progress', todosOrder: ['3'] };
  const boardMock5 = { id: 897, title: 'Done', todosOrder: ['4', '5'] };
  const boardMock6 = { id: 854, title: 'Done again', todosOrder: ['6', '7'] };

  const todoMock1 = { id: '1', title: 'first one', boardId: 789 };
  const todoMock2 = { id: '2', title: 'second one', boardId: 789 };
  const todoMock3 = { id: '3', title: 'third one', boardId: 115 };
  const todoMock4 = { id: '4', title: '4th one', boardId: 897 };
  const todoMock5 = { id: '5', title: '5th one', boardId: 897 };
  const todoMock6 = { id: '6', title: '6th one', boardId: 854 };
  const todoMock7 = { id: '7', title: '7th one', boardId: 854 };

  it('Should create the first board', async () => {
    await postBoard({
      title: 'It should be created!',
    });

    expect(localStorageSet).toHaveBeenCalledWith('tdbd', [
      expect.objectContaining({
        title: 'It should be created!',
        todosOrder: [],
      }),
    ]);
  });
  it('Should create the first todo', async () => {
    localStorageGet.mockImplementationOnce(() => [{ ...boardMock1 }]);
    createFakeId.mockImplementationOnce(() => '789');

    await postTodo({
      todo: {
        title: 'first task',
      },
      boardId: 123,
    });

    expect(localStorageSet).toHaveBeenNthCalledWith(1, 'tdbd', [
      expect.objectContaining({
        title: 'Todo',
        todosOrder: ['789'],
      }),
    ]);
    expect(localStorageSet).toHaveBeenNthCalledWith(2, 'td', [
      expect.objectContaining({
        title: 'first task',
      }),
    ]);
  });

  it('Should return todos by boardId', async () => {
    localStorageGet.mockImplementationOnce(() => [
      { ...todoMock1 },
      { ...todoMock2 },
      { ...todoMock3 },
    ]);
    localStorageGet.mockImplementationOnce(() => [
      { ...boardMock1 },
      { ...boardMock3 },
      { ...boardMock4 },
    ]);

    const response = await getTodosByBoardId({
      boardId: todoMock1.boardId,
    });

    expect(response).toEqual([
      { id: '1', title: 'first one', boardId: 789 },
      { id: '2', title: 'second one', boardId: 789 },
    ]);
  });
  it('Should update board title', async () => {
    localStorageGet.mockImplementationOnce(() => [
      { ...boardMock1 },
      { ...boardMock3 },
      { ...boardMock4 },
    ]);

    await putBoardTitle({
      boardId: boardMock1.id,
      title: 'hey. It changed!',
    });

    expect(localStorageSet).toHaveBeenCalledWith('tdbd', [
      expect.objectContaining({
        title: 'hey. It changed!',
        todosOrder: boardMock1.todosOrder,
      }),
      { ...boardMock3 },
      { ...boardMock4 },
    ]);
  });
  it('Should update todo by using todoId', async () => {
    localStorageGet.mockImplementationOnce(() => [
      { ...todoMock1 },
      { ...todoMock2 },
      { ...todoMock3 },
    ]);

    await putTodoById({
      todoId: todoMock2.id,
      updatedTodo: {
        ...todoMock2,
        title: 'hey. It changed!',
        description: 'I just added it!',
      },
    });

    expect(localStorageSet).toHaveBeenCalledWith('td', [
      { ...todoMock1 },
      {
        ...todoMock2,
        title: 'hey. It changed!',
        description: 'I just added it!',
      },
      { ...todoMock3 },
    ]);
  });
  it('Should move todo to another board', async () => {
    localStorageGet.mockImplementationOnce(() => [
      { ...boardMock1 },
      { ...boardMock3 },
      { ...boardMock4 },
    ]);
    localStorageGet.mockImplementation(() => [
      { ...todoMock1 },
      { ...todoMock2 },
      { ...todoMock3 },
    ]);

    await putMoveTodoToAnotherBoard({
      sourceBoardId: todoMock3.boardId,
      targetBoardId: boardMock3.id,
      todoId: todoMock3.id,
      newIndex: 1,
    });

    expect(localStorageSet).toHaveBeenNthCalledWith(1, 'td', [
      { ...todoMock1 },
      {
        ...todoMock2,
      },
      { ...todoMock3, boardId: boardMock3.id },
    ]);

    expect(localStorageSet).toHaveBeenNthCalledWith(2, 'tdbd', [
      { ...boardMock1 },
      { ...boardMock3, todosOrder: ['1', '3', '2'] },
      { ...boardMock4, todosOrder: [] },
    ]);
  });

  it('Should move todo to another index', async () => {
    localStorageGet.mockImplementationOnce(() => [
      { ...boardMock1 },
      { ...boardMock3 },
      { ...boardMock4 },
    ]);

    await putMoveTodoToAnotherIndex({
      boardId: boardMock3.id,
      todoId: todoMock1.id,
      newIndex: 1,
    });

    expect(localStorageSet).toHaveBeenCalledWith('tdbd', [
      { ...boardMock1 },
      { ...boardMock3, todosOrder: ['3', '1', '2'] },
      { ...boardMock4 },
    ]);
  });

  it('Should delete todo by id', async () => {
    localStorageGet.mockImplementationOnce(() => [
      { ...boardMock1 },
      { ...boardMock5 },
    ]);
    localStorageGet.mockImplementation(() => [
      { ...todoMock4 },
      { ...todoMock5 },
    ]);

    await deleteTodoById({
      todoId: todoMock4.id,
      boardId: todoMock4.boardId,
    });

    expect(localStorageSet).toHaveBeenNthCalledWith(1, 'tdbd', [
      { ...boardMock1 },
      { ...boardMock5, todosOrder: ['5'] },
    ]);

    expect(localStorageSet).toHaveBeenNthCalledWith(2, 'td', [
      { ...todoMock5 },
    ]);
  });

  it('Should delete board by id and its todos', async () => {
    localStorageGet.mockImplementationOnce(() => [
      { ...boardMock5 },
      { ...boardMock6 },
    ]);
    localStorageGet.mockImplementation(() => [
      { ...todoMock5 },
      { ...todoMock6 },
      { ...todoMock7 },
    ]);

    await deleteBoardById({
      boardId: boardMock6.id,
    });

    expect(localStorageSet).toHaveBeenNthCalledWith(1, 'tdbd', [
      { ...boardMock5 },
    ]);

    expect(localStorageSet).toHaveBeenNthCalledWith(2, 'td', [
      { ...todoMock5 },
    ]);
  });
});
