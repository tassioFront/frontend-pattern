import { IUserGithub } from '@/models/UserGithub';
import axios, { AxiosResponse } from 'axios';

export const getUserGithubByUserName = async (
  userName: string
): Promise<AxiosResponse<IUserGithub, any>> => {
  return await axios.get(`https://api.github.com/users/${userName}`);
};
