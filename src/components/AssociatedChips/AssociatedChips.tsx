import { goToTop } from '@/helpers/goTo';
import { useEffect } from 'react';
import Styles from './styles';

interface AssociatedChipsTypes {
  className?: string;
  options: string[];
}
const AssociatedChips = ({
  options,
  className,
}: AssociatedChipsTypes): JSX.Element => {
  useEffect(() => {
    goToTop();
  }, []);
  const DEFAULT_COLOR = '--color-brand-secondary-dark-1';

  return (
    <Styles.ChipGroup className={className}>
      {options.map((opt) => (
        <Styles.Chip key={opt} label={opt} color={DEFAULT_COLOR} />
      ))}
    </Styles.ChipGroup>
  );
};

export default AssociatedChips;
