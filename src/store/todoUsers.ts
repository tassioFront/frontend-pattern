import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { RootState } from '.';
import { BaseScreenTypes } from '@/components/BaseScreen/BaseScreen';
import { ITodoUser } from '@/models/Todo';
import { getTodoUsers } from '@/services/todoUsers.service';
import { storageService } from '@/services/localStorage/localStorage.service';
import { StorageKeys } from '@/enums/storage-keys';

const currentUser = storageService.get<ITodoUser | null>(
  StorageKeys.TodoSelectedUser
);
const todoUsersAdapter = createEntityAdapter<ITodoUser>();

export const getAllTodoUsers = createAsyncThunk('todoUsers/all', async () => {
  const response = await getTodoUsers();
  return response;
});

const usersSlice = createSlice({
  name: 'todoUsers',
  initialState: todoUsersAdapter.getInitialState<{
    status: BaseScreenTypes['uiCurrentState'];
    selectedUser: null | ITodoUser;
  }>({
    status: 'isLoading',
    selectedUser: currentUser,
  }),
  reducers: {
    saveTodoUser: (state, action) => {
      if (state.status !== 'hasData') {
        state.status = 'hasData';
      }
      todoUsersAdapter.addOne(state, action);
    },
    updateTodoUser(state, action) {
      const { id, name } = action.payload;
      todoUsersAdapter.updateOne(state, { id, changes: { name } });
    },
    setSelectedUser(state, action: { payload: ITodoUser['id']; type: string }) {
      state.selectedUser = state.entities[action.payload] as ITodoUser;
      storageService.set(StorageKeys.TodoSelectedUser, state.selectedUser);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTodoUsers.pending, (state) => {
      state.status = 'isLoading';
    });
    builder.addCase(getAllTodoUsers.fulfilled, (state, action) => {
      if (state.status === 'isLoading') {
        todoUsersAdapter.upsertMany(state, action.payload);
        state.status = action.payload?.length > 0 ? 'hasData' : 'isEmpty';
      }
    });
    builder.addCase(getAllTodoUsers.rejected, (state) => {
      if (state.status === 'isLoading') {
        state.status = 'isError';
      }
    });
  },
});

export const todoUsersStatus = (state: RootState) => state.todoUsers.status;
export const todoSelectedUser = (state: RootState) =>
  state.todoUsers.selectedUser;
export const { selectAll: selectAllTodoUsers, selectById: selectTodoUserById } =
  todoUsersAdapter.getSelectors<RootState>((state) => state.todoUsers);

export const { saveTodoUser, updateTodoUser, setSelectedUser } =
  usersSlice.actions;

export default usersSlice.reducer;
