import BaseScreen from '@/components/BaseScreen/BaseScreen';
import Section from '@/components/Section/Section';
import { texts } from './enums';
import { apiErrors } from '@/enums/home';
import { wrapperTrycatchfy } from '@/helpers/trycatchfy/trycatchfy';
import { useEffect, useState } from 'react';
import { getOwnerDevArticlesByUserName } from '@/services/devPublicApi.service';
import { IArticle } from '@/models/Article';
import PostsContent from './components/Content/Content';

const Article = (): JSX.Element => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const getUserInfo = async (): Promise<void> => {
    const expectedBehavior = async (): Promise<void> => {
      setIsLoading(true);
      const response = await getOwnerDevArticlesByUserName();
      setArticles(response.data);
    };
    const onResourceError = (): void => {
      alert(apiErrors.getOwnerDevArticlesByUserName);
      setError(apiErrors.getOwnerDevArticlesByUserName);
    };
    await wrapperTrycatchfy({
      expectedBehavior,
      onResourceError,
      onEndCycle: () => setIsLoading(false),
    });
  };
  useEffect(() => {
    void getUserInfo();
  }, []);

  return (
    <BaseScreen
      heading={texts.heading}
      description={texts.description}
      isLoading={isLoading}
    >
      <>
        <Section>
          <>
            {articles?.length > 0 && (
              <PostsContent articles={articles} error={error} />
            )}
          </>
        </Section>
      </>
    </BaseScreen>
  );
};

export default Article;
