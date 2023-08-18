import { IArticle } from '@/models/Article';
import Styles from './styles';
import ArticleCard from '../ArticleCard/ArticleCard';
import { useCallback, useState } from 'react';
import { useObserver } from '@/hooks/useObserver/useObserver';

interface ContentTypes {
  articles: IArticle[];
  error: string;
}

const ITEMS_RENDER_PER_SCROLL = 1;
const ITEMS_RENDER_PER_SCROLL_DESKTOP = 3;

const Content = ({ articles, error }: ContentTypes): JSX.Element => {
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

  return articles?.length > 0 ? (
    <Styles.Content>
      {articles.slice(0, count).map((article) => {
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
  ) : (
    <>{error}</>
  );
};

export default Content;
