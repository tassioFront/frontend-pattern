import { media } from '@/styles/media';
import styled from 'styled-components';
import Btn from '../Btn/Btn';

const Styles = {
  Btn: styled(Btn)`
    bottom: var(--spacing-base);
    cursor: pointer;
    position: fixed;
    opacity: 0;
    transition: opacity var(--transition-duration);
    right: var(--spacing-base);
    will-change: opacity;
    z-index: var(--zindex-1);

    &.show {
      opacity: 1;
    }

    ${media.greaterThan('tablet')`
      bottom: var(--spacing-large);
      right: var(--spacing-large);
    `}
  `,
};

export default Styles;
