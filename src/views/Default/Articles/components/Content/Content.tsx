import { IArticle } from '@/models/Article';
import Styles from './styles';
import { useCallback, useState } from 'react';
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

const Content = ({ articles, search, isOpen }: ContentTypes): JSX.Element => {
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

  const rows = isOpen
    ? searchCache
    : articles.filter((product) => {
        const hasFoundByText = product.title
          .toLowerCase()
          .includes(search.byText.toLowerCase());
        if (!hasFoundByText) {
          return false;
        }
        const hasFilterByTextOnly = search.byTags.length === 0;
        let hasTag = false;
        search.byTags.forEach((tag) => {
          hasTag = product.tag_list.includes(tag);
        });
        return hasFilterByTextOnly || hasTag;
      });
  searchCache = rows;
  return (
    <Styles.Content>
      {(rows as IArticle[]).slice(0, count).map((article) => {
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
      })}
      <span ref={observerElement} />
    </Styles.Content>
  );
};

export default Content;
