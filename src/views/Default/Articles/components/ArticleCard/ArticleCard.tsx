import Typography from '@/components/Typography/Typography';
import Styles from './styles';
import { memo, useState } from 'react';

interface ArticleCardTypes {
  title: string;
  url: string;
  imageUrl: string;
  alt: string;
  imageSize: string;
  description: string;
  positiveReactionsCount: string;
}
const ArticleCard = memo(function ArticleCard({
  alt,
  url,
  imageUrl,
  imageSize,
  description,
  title,
  positiveReactionsCount,
}: ArticleCardTypes) {
  console.log('Card');
  const [test, setTest] = useState(0);
  return (
    <Styles.Wrapper
      floating={
        <Styles.Floating>
          <i className={`fa fa-heart`} aria-hidden="true"></i>
          {positiveReactionsCount}
        </Styles.Floating>
      }
      content={
        <Styles.Content>
          <Styles.ImgLazyLoad
            src={imageUrl}
            width={imageSize}
            height={imageSize}
            alt={alt}
          />
          <Typography id={title} tag="h3" label={title}></Typography>
          <p>{description}</p>
          <button onClick={() => setTest((test) => test + 1)}>test</button>
          {test}
        </Styles.Content>
      }
      actions={
        <Styles.BtnLink
          className="primary"
          href={url}
          aria-label={'go to article ' + title}
          target="_blank"
          rel="noreferrer"
        >
          See full article
          <i className={`fa fa-external-link`} aria-hidden="true"></i>
        </Styles.BtnLink>
      }
    />
  );
});

export default ArticleCard;
