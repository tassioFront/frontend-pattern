import { goToTop } from '@/helpers/goTo';
import { memo, useEffect } from 'react';
import Styles from './styles';
import Typography from '../Typography/Typography';
import { createIdByString } from '@/helpers/string/string';
import Loading from '../Loading/Loading';
import Error from './components/Error/Error';
import EmptyState from './components/EmptyState/EmptyState';

interface BaseScreenTypes {
  children: JSX.Element | JSX.Element[];
  className?: string;
  heading: string;
  description?: string | null;
  uiCurrentState?: 'isLoading' | 'isError' | 'isEmpty' | 'isData';
  isEmptyMessage?: string;
  isErrorMessage?: string;
}

const BaseScreen = memo(function BaseScreen({
  children,
  className,
  heading,
  description = null,
  uiCurrentState = 'isData',
  isEmptyMessage = 'There is not data so far. How about add it?',
  isErrorMessage = 'Sorry, something was wrong',
}: BaseScreenTypes) {
  console.log('base scr');
  const id = createIdByString(heading);
  useEffect(() => {
    goToTop();
  }, []);

  const uiState = {
    isLoading: () => <Loading height="50vh" data-testid="loading" />,
    isError: () => <Error message={isErrorMessage} />,
    isEmpty: () => <EmptyState message={isEmptyMessage} />,
    isData: () => children,
  };

  return (
    <Styles.Wrapper className={className} data-testid={id + '-wrapper'}>
      <>
        <Styles.Header data-testid={id + '-header'}>
          <Typography tag="h1" id={id} label={heading} />
          {description !== null && <p id={id + '-desc'}>{description}</p>}
        </Styles.Header>
        {uiState[uiCurrentState]()}
      </>
    </Styles.Wrapper>
  );
});

export default BaseScreen;
