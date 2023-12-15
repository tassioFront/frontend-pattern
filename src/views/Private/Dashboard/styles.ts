import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  DashCardWrapper: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    row-gap: var(--spacing-base);

    ${media.greaterThan('tablet')`
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: var(--spacing-base);
    `}
  `,
};

export default Styles;
