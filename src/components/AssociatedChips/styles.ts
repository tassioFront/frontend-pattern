import styled from 'styled-components';
import ChipGroup from '../Chips/ChipGroup';
import Chip from '../Chips/Chip';
import { media } from '@/styles/media';

const Styles = {
  ChipGroup: styled(ChipGroup)`
    background-color: var(--color-neutral-dark-2);
    border-radius: 2px;
    padding: var(--spacing-xsmall) var(--spacing-small);
  `,
  Chip: styled(Chip)`
    font: var(--text-body-small);
    letter-spacing: var(--text-body-small-letter);
    padding: var(--spacing-xxsmall) var(--spacing-small);

    ${media.greaterThan('tablet')`
      opacity: 0.80;
      will-change: opacity;
      transition: 0.25s;

      &:hover {
        opacity: 1;
      }
    `}
  `,
};

export default Styles;
