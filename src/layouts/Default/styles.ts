import styled from 'styled-components';
import screenSizes from '@/styles/screenSizes';
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
    margin: 0 auto;
    width: 100%;
    border: 1px solid var(--color-neutral-light-1);
    border-radius: 4px;

    ${media.greaterThan('tablet')`
      padding: var(--spacing-giant);
    `}
  `,
};

export default Styles;
