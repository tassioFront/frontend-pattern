import Styles from './styles';
import classNames from 'classnames';

export interface BtnTypes {
  color?: 'primary' | 'secondary';
  shape?: 'default' | 'outlined' | 'text';
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Btn = ({
  children,
  color = 'primary',
  isLoading = false,
  onClick,
  className,
  shape = 'default',
  type = 'button',
  ...rest
}: BtnTypes): JSX.Element => {
  return (
    <Styles.Btn
      aria-busy={isLoading}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
        !isLoading && onClick(e)
      }
      className={classNames(color, 'shape--' + shape, className)}
      type={type}
      {...rest}
    >
      {isLoading && <Styles.Spinner />}
      <Styles.Children className={isLoading ? 'isLoading' : ''}>
        {children}
      </Styles.Children>
    </Styles.Btn>
  );
};

export default Btn;
