import styled from 'styled-components';
import ChipGroup from '../Chips/ChipGroup';
import Chip from '../Chips/Chip';

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
    opacity: 0.85;
  `,
};

export default Styles;
