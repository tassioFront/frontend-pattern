import { goToId } from '@/helpers/goTo';
import { useEffect } from 'react';
import Styles from './styles';
import { setIdOnUrl } from '@/helpers/setIdOnUrl';

interface TypographyTypes {
  label: string;
  tag: 'h1' | 'h2' | 'h3';
  id: string;
}

export const component = ({ label, tag, id }: TypographyTypes): string =>
  `<i class="fa fa-link" aria-hidden="true"></i>
  <${tag} id="${id}">${label}</${tag}>`;

const Typography = ({ label, id, tag }: TypographyTypes): JSX.Element => {
  useEffect(() => {
    goToId(window.location.hash);
  });
  return (
    <Styles.Wrapper
      dangerouslySetInnerHTML={{
        __html: component({ tag, label, id }),
      }}
      onClick={() => setIdOnUrl(id)}
    />
  );
};

export default Typography;