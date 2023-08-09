import { media } from '@/styles/media';
import styled from 'styled-components';

export default {
  Content: styled.div`
    align-items: center;
    flex-direction: column;
    display: flex;
    width: 100%;
    gap: var(--spacing-large);

    ${media.greaterThan('desktop')`
      flex-direction: row;
      gap: var(--spacing-medium);
      justify-content: center;
    `}
  `,
};
