import Styles from './styles';

interface ChipGroupTypes {
  className?: string;
  children: JSX.Element[];
}

const ChipGroup = ({
  children,
  className,
  ...rest
}: ChipGroupTypes): JSX.Element => {
  return (
    <Styles.ChipGroup className={className} {...rest}>
      {children}
    </Styles.ChipGroup>
  );
};

export default ChipGroup;
