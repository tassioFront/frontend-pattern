import Styles from './styles';
import Chip from '../Chips/Chip';
import { memo } from 'react';

interface AssociatedChipsTypes {
  className?: string;
  options: string[];
  selected?: string[];
  onClick: (value: string) => void;
}
const AssociatedChips = memo(function AssociatedChips({
  options,
  className,
  onClick,
  selected = [],
  ...rest
}: AssociatedChipsTypes) {
  const DEFAULT_COLOR = '--color-brand-secondary-light-1';

  return (
    <Styles.ChipGroup className={className} {...rest}>
      {options.map((opt) => (
        <Chip
          key={opt}
          label={opt}
          color={DEFAULT_COLOR}
          className={selected.includes(opt) ? 'selected' : ''}
          type="tag"
          onClick={() => onClick(opt)}
        />
      ))}
    </Styles.ChipGroup>
  );
});

export default AssociatedChips;
