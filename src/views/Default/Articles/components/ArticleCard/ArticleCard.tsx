import Typography from '@/components/Typography/Typography';
import Styles from './styles';

interface ArticleCardTypes {
  title: string;
  url: string;
  imageUrl: string;
  alt: string;
  imageSize: string;
  description: string;
  positiveReactionsCount: string;
}
const ArticleCard = ({
  alt,
  url,
  imageUrl,
  imageSize,
  description,
  title,
  positiveReactionsCount,
}: ArticleCardTypes): JSX.Element => {
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
};

export default ArticleCard;
