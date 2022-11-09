import { apiErrors } from '@/enums/home';
import { UserGithub } from '@/models/UserGithub';
import axios, { AxiosResponse } from 'axios';

export const getUserGithubByUserName = async (
  userName: string
): Promise<AxiosResponse<UserGithub, any>> => {
  try {
    return await axios.get(`https://api.github.com/users/${userName}`);
  } catch (error) {
    throw new Error(apiErrors.getUserGithubByUserName);
  }
};
