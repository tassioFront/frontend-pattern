import Styles from './styles';
import { ChipTypes } from './types';

/**
 * @param color a string of css var name, such as: --color-brand-secondary-dark-1. It is to color flexibility
 */
const Chip = ({
  color,
  label,
  className,
  type = 'default',
}: ChipTypes): JSX.Element => {
  return (
    <Styles.Chip color={`var(${color})`} className={className} type={type}>
      {label}
    </Styles.Chip>
  );
};

export default Chip;
