import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Wrapper: styled.section`
    align-items: center;
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: flex-start;
    padding: var(--spacing-xxlarge) var(--spacing-xsmall);
    flex-direction: column;

    ${media.greaterThan('tablet')`
      padding: var(--spacing-xxxlarge) var(--spacing-base);
    `}
  `,
  Header: styled.div`
    margin-bottom: var(--spacing-xlarge);
    text-align: center;
    width: 100%;

    ${media.greaterThan('tablet')`
      margin-bottom: var(--spacing-giant);
    `}

    h1 {
      ${media.greaterThan('tablet')`
       margin-bottom: var(--spacing-large);
    `}
    }
  `,
};

export default Styles;
