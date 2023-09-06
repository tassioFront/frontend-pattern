import Section from '@/components/Section/Section';
import { media } from '@/styles/media';
import styled from 'styled-components';

export default {
  Section: styled(Section)`
    display: flex;
    flex-direction: column;

    ${media.greaterThan('desktopMax')`
      flex-direction: row;
      justify-content: space-between;
      gap: var(--spacing-base);
    `}
  `,
  NoUsers: styled.div`
    align-items: center;
    display: flex;
    margin: auto;
    flex-direction: column;
  `,
};
