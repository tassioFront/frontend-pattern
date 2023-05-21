import { goToTop } from '@/helpers/goTo';
import { useEffect } from 'react';
import Styles from './styles';
import Typography from '../Typography/Typography';
import { createIdByString } from '@/helpers/string/string';
import Loading from '../Loading/Loading';

interface BaseScreenTypes {
  children: JSX.Element | JSX.Element[];
  className?: string;
  heading: string;
  isLoading?: boolean;
  description?: string | null;
}
const BaseScreen = ({
  children,
  className,
  heading,
  isLoading = false,
  description = null,
}: BaseScreenTypes): JSX.Element => {
  const id = createIdByString(heading);
  useEffect(() => {
    goToTop();
  }, []);

  return (
    <Styles.Wrapper className={className} data-testid={id + '-wrapper'}>
      {!isLoading ? (
        <>
          <Styles.Header data-testid={id + '-header'}>
            <Typography tag="h1" id={id} label={heading} />
            {description !== null && <p id={id + '-desc'}>{description}</p>}
          </Styles.Header>
          {children}
        </>
      ) : (
        <Loading height="50vh" data-testid="loading" />
      )}
    </Styles.Wrapper>
  );
};

export default BaseScreen;
