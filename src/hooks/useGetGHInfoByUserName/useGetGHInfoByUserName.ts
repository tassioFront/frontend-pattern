import { IUserGithub } from '@/models/UserGithub';
import { getUserGithubByUserName } from '@/services/userGithub.service';
import { useAppDispatch } from '@/store/helper';
import { userInfoActions } from '@/store/userInfo';
import { AxiosResponse } from 'axios';
import { useState } from 'react';

interface getUserGHInfoParams {
  userName: string;
  onSuccess?: (response: AxiosResponse<IUserGithub>) => void;
}

interface IUseGetGHInfoByUserNameResponse {
  isLoading: boolean;
  getUserGHInfo: (params: getUserGHInfoParams) => Promise<void>;
}

export const useGetGHInfoByUserName = (): IUseGetGHInfoByUserNameResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  // handling
  const getUserGHInfo = async ({
    userName,
    onSuccess,
  }: getUserGHInfoParams): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getUserGithubByUserName(userName);
      dispatch(userInfoActions.setUserInfo(response.data));
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
