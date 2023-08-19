import { useEffect, useState, Suspense, lazy, useMemo } from 'react';

import BaseScreen from '@/components/BaseScreen/BaseScreen';
import Section from '@/components/Section/Section';
import { texts } from './enums';
import { apiErrors } from '@/enums/home';
import { wrapperTrycatchfy } from '@/helpers/trycatchfy/trycatchfy';
import { getOwnerDevArticlesByUserName } from '@/services/devPublicApi.service';
import { IArticle } from '@/models/Article';
import RouterFallback from '@/components/RouterFallback/RouterFallback';
import Filters from './components/Filters/Filters';

const ArticlesContent = lazy(
  async () => await import('./components/Content/Content')
);

const Article = (): JSX.Element => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [tags, setTags] = useState<IArticle['tag_list']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpen, setIsOpenError] = useState(false);
  const swArticles: Worker = useMemo(
    () => new Worker(new URL('./woDevTags.ts', import.meta.url)),
    []
  );

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
  const handleTags = () => {
    if (window.Worker) {
      swArticles.postMessage(articles);
    }
  };

  useEffect(() => {
    void getUserInfo();
  }, []);
  useEffect(() => {
    !isLoading && handleTags();
  }, [isLoading]);
  useEffect(() => {
    if (window.Worker) {
      swArticles.onmessage = (e: MessageEvent<IArticle['tag_list']>) => {
        setTags(e.data);
        return () => {
          swArticles.terminate();
        };
      };
    }
  }, [swArticles]);

  return (
    <BaseScreen
      heading={texts.heading}
      description={texts.description}
      isLoading={isLoading}
    >
      <Filters
        isOpen={isOpen}
        tags={tags}
        onClose={() => setIsOpenError(false)}
        onOpen={() => setIsOpenError(true)}
      />
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
