import { goToTop } from '@/helpers/goToTop';
import { useEffect } from 'react';
import Styles from './styles';

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
  });

  return (
    <Styles.Wrapper className={className}>
      <Styles.Header>
        <h1>{heading}</h1>
        {description !== null && <p>{description}</p>}
      </Styles.Header>
      {children}
    </Styles.Wrapper>
  );
};

export default BaseScreen;
