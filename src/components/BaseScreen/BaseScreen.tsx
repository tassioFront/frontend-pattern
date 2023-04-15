import { goToTop } from '@/helpers/goTo';
import { useEffect } from 'react';
import Styles from './styles';
import Typography from '../Typography/Typography';
import { createIdByString } from '@/helpers/string/string';

interface BaseScreenTypes {
  children: JSX.Element | JSX.Element[];
  className?: string;
  heading: string;
  description?: string;
}
const BaseScreen = ({
  children,
  className,
  heading,
  description,
}: BaseScreenTypes): JSX.Element => {
  useEffect(() => {
    goToTop();
  }, []);

  return (
    <Styles.Wrapper className={className}>
      <Styles.Header>
        <Typography tag="h1" id={createIdByString(heading)} label={heading} />
        {description !== null && <p>{description}</p>}
      </Styles.Header>
      {children}
    </Styles.Wrapper>
  );
};

export default BaseScreen;
