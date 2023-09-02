import { useEffect, useState, Suspense, lazy } from 'react';
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
import { ISearch } from './types';

const ArticlesContent = lazy(
  async () => await import('./components/Content/Content')
);

enum query {
  modalOpen = 'mo',
}

const swArticles: Worker = new Worker(
  new URL('./woDevTags.ts', import.meta.url)
);

const Article = (): JSX.Element => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [tags, setTags] = useState<IArticle['tag_list']>([]);
  const [baseState, setBaseState] = useState<
    'isLoading' | 'isError' | 'isEmpty' | 'hasData'
  >('isLoading');
  const [search, setSearch] = useState<ISearch>({
    byText: '',
    byTags: [],
  });

  const [modalQuery, setModalQuery] = useSearchParams();

  const hasData = () => articles.length > 0;

  const handleSearchText = (value: string) => {
    setSearch({ ...search, byText: value });
  };
  const handleSearchTags = (value: string) => {
    const isAddHandle = search.byTags.findIndex((tag) => tag === value) === -1;
    const byTags = isAddHandle
      ? [...search.byTags, value]
      : search.byTags.filter((tag) => tag !== value);
    setSearch({ ...search, byTags });
  };
  const handleToggleModal = (value: boolean = true) => {
    setModalQuery({
      ...modalQuery,
      ...(value && { [query.modalOpen]: 'open' }),
    });
  };
  const handleTags = () => {
    if (window.Worker) {
      swArticles.postMessage(articles);
    }
  };
  const getUserInfo = async (): Promise<void> => {
    const expectedBehavior = async (): Promise<void> => {
      const response = await getOwnerDevArticlesByUserName();
      setArticles(response.data);
      modalQuery.get(query.modalOpen) && handleToggleModal();
      const baseStateValue = response.data.length === 0 ? 'isEmpty' : 'hasData';
      setBaseState(baseStateValue);
    };
    const onResourceError = (): void => {
      setBaseState('isError');
    };
    await wrapperTrycatchfy({
      expectedBehavior,
      onResourceError,
    });
  };

  useEffect(() => {
    void getUserInfo();
  }, []);
  useEffect(() => {
    baseState === 'hasData' && handleTags();
  }, [baseState]);
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
      uiCurrentState={baseState}
      isErrorMessage={apiErrors.getOwnerDevArticlesByUserName}
    >
      <>
        {hasData() && (
          <>
            <Filters
              selectedTags={search.byTags}
              handleSearchText={handleSearchText}
              handleSearchTags={handleSearchTags}
              isOpen={!!modalQuery.get(query.modalOpen)}
              tags={tags}
              onClose={() => handleToggleModal(false)}
              onOpen={() => handleToggleModal()}
            />
            <Section>
              <Suspense fallback={<RouterFallback />}>
                <ArticlesContent
                  articles={articles}
                  search={search}
                  isOpen={!!modalQuery.get(query.modalOpen)}
                />
              </Suspense>
            </Section>
          </>
        )}
      </>
    </BaseScreen>
  );
};

export default Article;
