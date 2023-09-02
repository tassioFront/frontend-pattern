import { configureStore } from '@reduxjs/toolkit';
import userInfo from './userInfo';
import todoUsers from './todoUsers';

const store = configureStore({
  reducer: {
    userInfo,
    todoUsers,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
