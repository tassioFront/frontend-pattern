import { IArticle } from '@/models/Article';
import Styles from './styles';
import ArticleCard from '../ArticleCard/ArticleCard';

interface ContentTypes {
  articles: IArticle[];
  error: string;
}

const Content = ({ articles, error }: ContentTypes): JSX.Element => {
  return articles?.length > 0 ? (
    <Styles.Content>
      {articles.map((article) => {
        return (
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
        );
      })}
    </Styles.Content>
  ) : (
    <>{error}</>
  );
};

export default Content;
