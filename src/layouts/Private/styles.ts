import styled from 'styled-components';
import screenSizes from '@/styles/screenSizes';
import Header from '@/components/Header/Header';
import { media } from '@/styles/media';

const Styles = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    min-height: 100vh;
    width: 100%;
  `,
  Content: styled.main`
    max-width: ${screenSizes.desktopMax};
    max-width: ${screenSizes.desktopMax};
    padding: var(--spacing-xxlarge) var(--spacing-xsmall);
    margin: 0 auto;
    width: 100%;

    ${media.greaterThan('tablet')`
     padding: var(--spacing-xxxxlarge) var(--spacing-base);
   `}
  `,
  Header: styled(Header)`
    background-color: var(--color-neutral-dark-1);
  `,
};

export default Styles;
