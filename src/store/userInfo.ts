import { IUserGithub } from '@/models/UserGithub';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { getGHUserDataFromCache } from '@/helpers/useInfo';

interface UserInfoStore {
  GHData: IUserGithub | null;
}

const initialState: UserInfoStore = {
  GHData: getGHUserDataFromCache(),
};

const userInfoSelectors = {
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
    },
  },
});
export { userInfoSelectors };
export const userInfoActions = userInfoSlice.actions;

export default userInfoSlice.reducer;
