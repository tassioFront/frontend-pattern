import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Error: styled.div`
    align-items: center;
    background-color: var(--color-neutral-regular);
    border-radius: 2px;
    display: flex;
    justify-content: center;
    margin: auto;
    min-height: 25vh;
    padding: var(--spacing-medium) var(--spacing-base);
    width: 100%;

    ${media.greaterThan('tablet')`
      padding: var(--spacing-xxlarge) var(--spacing-medium);
    `}
  `,
};

export default Styles;
