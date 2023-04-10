import Styles from './styles';

interface ChipTypes {
  label: string;
  type: string;
}

const Chip = ({ type, label, ...rest }: ChipTypes): JSX.Element => {
  return (
    <Styles.Chip type={`var(${type})`} {...rest}>
      {label}
    </Styles.Chip>
  );
};

export default Chip;
