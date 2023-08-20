import Styles from './styles';
import Chip from '../Chips/Chip';
import { memo } from 'react';

interface AssociatedChipsTypes {
  className?: string;
  options: string[];
}
const AssociatedChips = memo(function AssociatedChips({
  options,
  className,
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
          type="tag"
          onClick={() => alert('Sorry, we are working on it.')}
        />
      ))}
    </Styles.ChipGroup>
  );
});

export default AssociatedChips;
