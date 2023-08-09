import { IArticle } from '@/models/Article';
import axios, { AxiosResponse } from 'axios';

export const getOwnerDevArticlesByUserName = async (): Promise<
  AxiosResponse<IArticle[], any>
> => {
  return await axios.get(`https://dev.to/api/articles?username=tassiofront
  `);
};
