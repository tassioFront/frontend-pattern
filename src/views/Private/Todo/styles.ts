import Section from '@/components/Section/Section';
import styled from 'styled-components';

export default {
  Section: styled(Section)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: var(--spacing-base);
    overflow: unset;
  `,
  Boards: styled.div`
    display: flex;
    justify-content: flex-start;
    overflow-x: auto;
    gap: var(--spacing-base);
    padding-bottom: var(--spacing-base);
  `,
  NoUsers: styled.div`
    align-items: center;
    display: flex;
    margin: auto;
    flex-direction: column;
  `,
};
