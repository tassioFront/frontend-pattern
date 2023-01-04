import { IUserGithub } from '@/models/UserGithub';
import { getUserGithubByUserName } from '@/services/userGithub.service';
import { useAppDispatch, useAppSelector } from '@/store/helper';
import { userInfoActions, userInfoSelectors } from '@/store/userInfo';
import { AxiosResponse } from 'axios';
import { useState } from 'react';

export interface getUserGHInfoOnSuccessParams {
  response: AxiosResponse<IUserGithub> | { data: IUserGithub | null };
}
interface getUserGHInfoParams {
  userName: string;
  onSuccess?: (response: getUserGHInfoOnSuccessParams['response']) => void;
}

interface IUseGetGHInfoByUserNameResponse {
  isLoading: boolean;
  getUserGHInfo: (params: getUserGHInfoParams) => Promise<void>;
}

export const useGetGHInfoByUserName = (): IUseGetGHInfoByUserNameResponse => {
  // state
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(userInfoSelectors.getIsAuth);
  const cachedData = useAppSelector(userInfoSelectors.getMainUserInfo);

  // handling
  const getUserGHInfo = async ({
    userName,
    onSuccess,
  }: getUserGHInfoParams): Promise<void> => {
    try {
      setIsLoading(true);
      let response = { data: cachedData };
      if (!isAuth) {
        response = await getUserGithubByUserName(userName);
      }
      dispatch(userInfoActions.setUserInfo(response?.data));
      onSuccess?.(response);
    } catch (error) {
      // create a alert component
      alert((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserGHInfo };
};
