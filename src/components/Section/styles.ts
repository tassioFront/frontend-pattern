import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Wrapper: styled.section`
    align-items: center;
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: flex-start;
    padding: var(--spacing-xlarge) 0;
    flex-direction: column;

    ${media.greaterThan('tablet')`
      padding: var(--spacing-xxxlarge) 0;
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
