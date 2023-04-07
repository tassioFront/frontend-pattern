import Styles from './styles';

interface ISpinnerProps {
  type?: 'default' | 'brand';
}

enum types {
  default = 'var(--color-neutral-white)',
  brand = 'var(--color-brand-primary-dark-1)',
}

const Spinner = ({ type = 'default', ...rest }: ISpinnerProps): JSX.Element => (
  <Styles.Spinner viewBox="0 0 50 50" {...rest}>
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="2"
      stroke={types[type]}
    />
  </Styles.Spinner>
);

export default Spinner;
