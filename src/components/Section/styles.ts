import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Wrapper: styled.section`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: flex-start;
    margin: var(--spacing-xlarge) 0;
    flex-direction: column;

    ${media.greaterThan('tablet')`
    margin: var(--spacing-xxxlarge) 0;
    `}
  `,
  Header: styled.div`
    margin-bottom: var(--spacing-large);
    text-align: left;
    width: 100%;

    ${media.greaterThan('tablet')`
      margin-bottom: var(--spacing-xlarge);
    `}
  `,
};

export default Styles;
