import { IArticle } from '@/models/Article';
import Styles from './styles';
import { memo, useCallback, useMemo, useState } from 'react';
import { useObserver } from '@/hooks/useObserver/useObserver';
import ArticleCard from '../ArticleCard/ArticleCard';
import { ISearch } from '../../types';

interface ContentTypes {
  articles: IArticle[];
  isOpen: boolean;
  search: ISearch;
}

const ITEMS_RENDER_PER_SCROLL = 1;
const ITEMS_RENDER_PER_SCROLL_DESKTOP = 3;

let searchCache: IArticle[] | null = null;

const Content = memo(function Content({
  articles,
  search,
  isOpen,
}: ContentTypes) {
  const { byText, byTags } = search;
  const isDesktop = window.innerWidth > 768;
  const itemsPerPage = isDesktop
    ? ITEMS_RENDER_PER_SCROLL_DESKTOP
    : ITEMS_RENDER_PER_SCROLL;
  const [count, setCount] = useState(itemsPerPage);
  const onVisible = useCallback(
    (isVisible: boolean) => {
      const isIncrease = isVisible && count < articles.length;
      isIncrease && setCount(count + itemsPerPage);
    },
    [count]
  );
  const [observerElement] = useObserver({
    onVisible,
  });
  const filterBySearch = useMemo(() => {
    return articles.filter((product) => {
      const hasFoundByText = product.title
        .toLowerCase()
        .includes(byText.toLowerCase());
      if (!hasFoundByText) {
        return false;
      }
      const hasFilterByTextOnly = byTags.length === 0;
      let hasTag = false;
      for (const tag of byTags) {
        hasTag = product.tag_list.includes(tag);
        if (hasTag) {
          break;
        }
      }
      return hasFilterByTextOnly || hasTag;
    });
  }, [byText, isOpen]);

  const rows = isOpen && searchCache !== null ? searchCache : filterBySearch;
  searchCache = rows;
  return (
    <Styles.Content>
      {rows.length > 0 ? (
        rows.slice(0, count).map((article) => {
          return (
            article !== null && (
              <ArticleCard
                alt={article.title}
                imageSize="200"
                key={article.title}
                imageUrl={article.cover_image}
                url={article.url}
                title={article.title}
                description={article.description}
                positiveReactionsCount={article.positive_reactions_count}
              />
            )
          );
        })
      ) : (
        <p>Nothing here. Do you wanna try another search?</p>
      )}
      <span ref={observerElement} />
    </Styles.Content>
  );
});

export default Content;
