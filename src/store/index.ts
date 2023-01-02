import { configureStore } from '@reduxjs/toolkit';
import userInfoSlice from './userInfo';

const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
