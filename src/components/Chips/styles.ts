import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Chip: styled.div<{ color: string }>`
    background-color: ${(props) => props.color};
    border-radius: 4px;
    color: white;
    padding: var(--spacing-xsmall) var(--spacing-small);
    text-align: center;

    ${media.greaterThan('tablet')`
      padding: var(--spacing-small) var(--spacing-base);
    `}
  `,
  ChipGroup: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-small);
    width: 100%;
  `,
};

export default Styles;
