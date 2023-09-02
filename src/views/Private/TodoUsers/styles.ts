import Section from '@/components/Section/Section';
import { media } from '@/styles/media';
import styled from 'styled-components';

export default {
  Section: styled(Section)`
    display: flex;
    flex-direction: column;

    ${media.greaterThan('mobile')`
      align-items: flex-start; 

      ul {
        align-self: center;
        display: flex;
        gap: var(--spacing-large);
        flex-wrap: wrap;
        justify-content: flex-start;
        width: 100%;

        button {
          margin-left: calc(var(--spacing-base)*-1);
        }
      }
    `}
  `,
  Creation: styled.div`
    display: flex;
    flex-direction: column;

    ${media.greaterThan('mobile')`
      gap: var(--spacing-base);
    `}
  `,
};
