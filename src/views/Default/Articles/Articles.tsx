import { useEffect, useState, Suspense, lazy, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

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

enum query {
  modalOpen = 'mo',
}

const Article = (): JSX.Element => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [tags, setTags] = useState<IArticle['tag_list']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalQuery, setModalQuery] = useSearchParams();
  const swArticles: Worker = useMemo(
    () => new Worker(new URL('./woDevTags.ts', import.meta.url)),
    []
  );

  const handleToggleModal = (value: boolean = true) => {
    setIsOpen(value);
    setModalQuery({
      ...modalQuery,
      ...(value && { [query.modalOpen]: 'open' }),
    });
  };
  const getUserInfo = async (): Promise<void> => {
    const expectedBehavior = async (): Promise<void> => {
      setIsLoading(true);
      const response = await getOwnerDevArticlesByUserName();
      setArticles(response.data);
      modalQuery.get(query.modalOpen) && handleToggleModal();
    };
    const onResourceError = (): void => {
      setError(apiErrors.getOwnerDevArticlesByUserName);
    };
    await wrapperTrycatchfy({
      expectedBehavior,
      onResourceError,
      onEndCycle: () => setIsLoading(false),
    });
  };
  const hasData = () => articles.length > 0;
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
      <>
        {hasData() && (
          <Filters
            isOpen={isOpen}
            tags={tags}
            onClose={() => handleToggleModal(false)}
            onOpen={() => handleToggleModal()}
          />
        )}
      </>
      <Section>
        <>
          {hasData() && (
            <Suspense fallback={<RouterFallback />}>
              <ArticlesContent articles={articles} />
            </Suspense>
          )}
          {error !== '' && error}
        </>
      </Section>
    </BaseScreen>
  );
};

export default Article;
