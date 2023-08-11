import { media } from '@/styles/media';
import styled from 'styled-components';

export default {
  Content: styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    width: 100%;
    gap: var(--spacing-large);

    ${media.greaterThan('tablet')`
      gap: var(--spacing-medium);
      grid-template-columns: 1fr 1fr;
    `}

    ${media.greaterThan('desktop')`
      gap: var(--spacing-medium);
      grid-template-columns: 1fr 1fr 1fr;
    `}
  `,
};
