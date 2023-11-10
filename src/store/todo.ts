import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { BaseScreenTypes } from '@/components/BaseScreen/BaseScreen';
import { ITodo } from '@/models/Todo';
import { getTodo } from '@/services/todo.service';
import { calcTodoProgress } from '@/helpers/calcTodoProgress/calcTodoProgress';
import { startTransition } from 'react';

const todoAdapter = createEntityAdapter<ITodo>();

export const getAllTodo = createAsyncThunk('todo/all', async () => {
  const response = await getTodo();
  return response;
});

const editProgressBar = (state: RootState['todo']) => {
  startTransition(() => {
    state.progressBar = calcTodoProgress({
      total: state.ids.length,
      done: state.doneIds.length,
      inProgress: state.inProgressIds.length,
    });
  });
};

const todoSlice = createSlice({
  name: 'todo',
  initialState: todoAdapter.getInitialState<{
    status: BaseScreenTypes['uiCurrentState'];
    doneIds: Array<ITodo['id']>;
    todoIds: Array<ITodo['id']>;
    inProgressIds: Array<ITodo['id']>;
    progressBar: number;
  }>({
    status: 'isLoading',
    doneIds: [],
    todoIds: [],
    inProgressIds: [],
    progressBar: 0,
  }),
  reducers: {
    saveTodo: (state, action: { payload: ITodo; type: string }) => {
      if (state.status !== 'hasData') {
        state.status = 'hasData';
      }
      todoAdapter.addOne(state, action);
      const statusId = action.payload.status + 'Ids';
      state[statusId].unshift(action.payload.id);
      editProgressBar(state);
    },
    updateTodo(state, action: { payload: ITodo; type: string }) {
      const { id, title, description, authorId, assignedId, status } =
        action.payload;
      const currentStatus = state.entities[id]?.status;
      const hasChangedStatus = currentStatus !== status;
      if (hasChangedStatus) {
        const currentStatusId = (currentStatus as string) + 'Ids';
        const statusId = status + 'Ids';
        state[currentStatusId] = state[currentStatusId].filter(
          (todo: ITodo['id']) => todo !== id
        );
        state[statusId].unshift(id);
        editProgressBar(state);
      }
      todoAdapter.updateOne(state, {
        id,
        changes: { title, description, authorId, assignedId, status },
      });
    },
    removeTodo: (state, action: { payload: ITodo; type: string }) => {
      const { id, status } = action.payload;
      const statusId = status + 'Ids';
      state[statusId] = state[statusId].filter(
        (todo: ITodo['id']) => todo !== id
      );
      todoAdapter.removeOne(state, id);
      editProgressBar(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTodo.pending, (state) => {
      state.status = 'isLoading';
    });
    builder.addCase(getAllTodo.fulfilled, (state, action) => {
      if (state.status === 'isLoading') {
        todoAdapter.upsertMany(state, action.payload);
        for (const item of action.payload) {
          const statusId = item.status + 'Ids';
          state[statusId].unshift(item.id);
        }
        state.status = 'hasData';
      }
      editProgressBar(state);
    });
    builder.addCase(getAllTodo.rejected, (state) => {
      if (state.status === 'isLoading') {
        state.status = 'isError';
      }
    });
  },
});

export const todoStatus = (state: RootState) => state.todo.status;
export const todoIds = (state: RootState) => state.todo.todoIds;
export const inprogressIds = (state: RootState) => state.todo.inProgressIds;
export const progressBar = (state: RootState) => state.todo.progressBar;
export const selectAllTodo = (state: RootState) => state.todo.entities;
export const doneIds = (state: RootState) => state.todo.doneIds;

export const { saveTodo, updateTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;