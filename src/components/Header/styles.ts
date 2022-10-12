import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Header: styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-xsmall) var(--spacing-small);

    ${media.greaterThan('mobileMax')`
      padding: var(--spacing-xxlarge) var(--spacing-medium);
    `}
  `,
};

export default Styles;
