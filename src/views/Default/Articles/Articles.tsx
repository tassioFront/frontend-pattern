import { useEffect, useState, Suspense, lazy } from 'react';

import BaseScreen from '@/components/BaseScreen/BaseScreen';
import Section from '@/components/Section/Section';
import { texts } from './enums';
import { apiErrors } from '@/enums/home';
import { wrapperTrycatchfy } from '@/helpers/trycatchfy/trycatchfy';
import { getOwnerDevArticlesByUserName } from '@/services/devPublicApi.service';
import { IArticle } from '@/models/Article';
import RouterFallback from '@/components/RouterFallback/RouterFallback';

const ArticlesContent = lazy(
  async () => await import('./components/Content/Content')
);

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
      <Section>
        <>
          {articles?.length > 0 && (
            <Suspense fallback={<RouterFallback />}>
              <ArticlesContent articles={articles} error={error} />
            </Suspense>
          )}
        </>
      </Section>
    </BaseScreen>
  );
};

export default Article;
