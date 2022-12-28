import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Header: styled.header`
    ${media.greaterThan('mobileMax')`
      padding: var(--spacing-xxlarge) var(--spacing-medium);
    `}
  `,
};

export default Styles;
