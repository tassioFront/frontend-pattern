import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Footer: styled.footer`
    margin-top: auto;
    padding: var(--spacing-medium) var(--spacing-base);
    text-align: center;

    ${media.greaterThan('tablet')`
      padding: var(--spacing-xxlarge) var(--spacing-medium);
    `}
  `,
};

export default Styles;
