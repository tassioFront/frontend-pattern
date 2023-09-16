import { media } from '@/styles/media';
import styled from 'styled-components';

export default {
  Content: styled.div`
    display: grid;
    grid-template-columns: auto;
    grid-auto-rows: auto;
    width: 100%;
    gap: var(--spacing-large);
    justify-items: center;

    ${media.greaterThan('tablet')`
      gap: var(--spacing-medium);
      grid-template-columns: repeat(2, 1fr);
    `}

    ${media.greaterThan('desktop')`
      gap: var(--spacing-medium);
      grid-template-columns: repeat(3, 1fr);
    `}
  `,
};
