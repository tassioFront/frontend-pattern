import Styles from './styles';

interface ISpinnerProps {
  type?: 'default' | 'brand';
  className?: string;
}

enum types {
  default = 'var(--color-neutral-white)',
  brand = 'var(--color-brand-primary-dark-1)',
}

const Spinner = ({
  type = 'default',
  className,
}: ISpinnerProps): JSX.Element => (
  <Styles.Spinner className={className} viewBox="0 0 50 50">
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
