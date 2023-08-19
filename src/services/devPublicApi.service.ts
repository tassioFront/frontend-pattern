import { IArticle } from '@/models/Article';
import axios, { AxiosResponse } from 'axios';

export const getOwnerDevArticlesByUserName = async (): Promise<
  AxiosResponse<IArticle[], any>
> => {
  // more here: https://developers.forem.com/api/v1#tag/articles/operation/getArticles
  return await axios.get(
    `https://dev.to/api/articles?username=tassiofront&state=all 
    
  `,
    {
      headers: {
        accept: 'application/vnd.forem.api-v1+json',
      },
    }
  );
};
