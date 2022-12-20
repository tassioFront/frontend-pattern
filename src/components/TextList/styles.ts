import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Wrapper: styled.ul`
    align-items: center;
    display: flex;
    height: 100%;
    width: 100%;
    padding: var(--spacing-small);
    flex-direction: column;
    border-radius: var(--border-radius);

    &.light {
      background-color: var(--color-neutral-white);
    }

    &.dark {
      background-color: var(--color-neutral-regular);
    }

    ${media.greaterThan('tablet')`
      padding: var(--spacing-medium) 0;
    `}
  `,
};

export default Styles;
