import Typography from '@/components/Typography/Typography';
import Styles from './styles';
import { memo } from 'react';
import ImgLazyLoad from '@/components/ImgLazyLoad/ImgLazyLoad';

interface DashCardTypes {
  title: string;
  url: string;
  imageUrl: string;
  alt: string;
  description: string;
}
const DashCard = memo(function DashCard({
  alt,
  url,
  imageUrl,
  description,
  title,
}: DashCardTypes) {
  return (
    <Styles.Wrapper
      content={
        <Styles.Content>
          <ImgLazyLoad src={imageUrl} width={'64'} height={'64'} alt={alt} />
          <Typography id={title} tag="h3" label={title}></Typography>
          <p>{description}</p>
        </Styles.Content>
      }
      actions={
        <Styles.BtnLink
          className="primary"
          to={url}
          aria-label={'go to feature ' + title}
        >
          See feature
        </Styles.BtnLink>
      }
    />
  );
});

export default DashCard;
