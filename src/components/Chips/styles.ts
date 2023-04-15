import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Chip: styled.div<{ type: string }>`
    background-color: ${(props) => props.type};
    border-radius: 4px;
    color: white;
    padding: var(--spacing-xsmall);
    text-align: center;

    ${media.greaterThan('tablet')`
      padding: var(--spacing-small);
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
