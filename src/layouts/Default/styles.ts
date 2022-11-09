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
  Content: styled.section`
    max-width: ${screenSizes.desktopMax};
    padding: var(--spacing-xxlarge) var(--spacing-xsmall);
    margin: 0 auto;
    width: 100%;
    background-color: var(--color-neutral-light-5);

    ${media.greaterThan('tablet')`
      padding: var(--spacing-xxxxlarge) var(--spacing-base);
    `}
  `,
  Header: styled(Header)`
    justify-content: center;
  `,
};

export default Styles;
