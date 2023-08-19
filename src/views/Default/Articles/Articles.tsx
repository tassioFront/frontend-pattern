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
  // @todo[web-worker-article]: this is for teaching purposes. See the article here: https://dev.to/tassiofront/avoid-overloading-the-main-thread-with-web-workers-557c
  const swSearchParam = new URLSearchParams(window.location.search).get('sw');
  let hasOffSw: null | boolean = null;
  if (swSearchParam) {
    hasOffSw = swSearchParam === 'off';
  }

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
    // @todo[web-worker-article]: this is for teaching purposes. See the article here: https://dev.to/tassiofront/avoid-overloading-the-main-thread-with-web-workers-557c
    if (hasOffSw) {
      const map = new Map();
      for (const article of articles) {
        for (const tag of article.tag_list) {
          map.set(tag, tag);
        }
      }
      for (let idx = 0; idx < 1000000000; idx++) {
        idx++;
      }
      setTags(Array.from(map.values()));
    } else {
      if (window.Worker) {
        swArticles.postMessage(articles);
      }
    }
  };
  const swArticles: Worker = useMemo(
    () => new Worker(new URL('./sw.ts', import.meta.url)),
    []
  );

  useEffect(() => {
    void getUserInfo();
  }, []);
  useEffect(() => {
    if (window.Worker) {
      swArticles.onmessage = (e: MessageEvent<IArticle['tag_list']>) => {
        setTags(e.data);
      };
    }
  }, [swArticles]);
  useEffect(() => {
    !isLoading && handleTags();
  }, [isLoading]);

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
        hasOffSw={hasOffSw}
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
