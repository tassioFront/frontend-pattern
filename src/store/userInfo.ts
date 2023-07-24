import { IUserGithub } from '@/models/UserGithub';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import {
  getGHUserNameFromCache,
  getGHUserDataFromCache,
} from '@/helpers/useInfo';

interface UserInfoStore {
  GHData: IUserGithub | null;
}

const initialState: UserInfoStore = {
  GHData: getGHUserNameFromCache() !== null ? getGHUserDataFromCache() : null,
};

const selector = {
  getMainUserInfo: (state: RootState) => {
    return state.userInfo.GHData;
  },
  getIsAuth: (state: RootState): boolean => {
    return Boolean(state.userInfo.GHData?.login);
  },
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo(
      state: UserInfoStore,
      action: PayloadAction<UserInfoStore['GHData']>
    ) {
      state = {
        ...state,
        GHData: action.payload,
      };
      return state;
    },
  },
});

export const userInfoSelectors = selector;
export const userInfoActions = userInfoSlice.actions;

export default userInfoSlice;
