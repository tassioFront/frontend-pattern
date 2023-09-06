import { configureStore } from '@reduxjs/toolkit';
import userInfo from './userInfo';
import todoUsers from './todoUsers';
import todo from './todo';

const store = configureStore({
  reducer: {
    userInfo,
    todoUsers,
    todo,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
