import Styles from './styles';

interface ChipTypes {
  label: string;
  color: string;
  className?: string;
}

/**
 * @param color a string of css var name, such as: --color-brand-secondary-dark-1. It is to color flexibility
 */
const Chip = ({ color, label, className }: ChipTypes): JSX.Element => {
  return (
    <Styles.Chip color={`var(${color})`} className={className}>
      {label}
    </Styles.Chip>
  );
};

export default Chip;
