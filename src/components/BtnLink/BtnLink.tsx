import { LinkProps } from 'react-router-dom';
import Styles from './styles';
const BtnLink = ({
  children,
  to,
  className,
  ...rest
}: LinkProps): JSX.Element => {
  return (
    <Styles.Link to={to} {...rest} className={className}>
      {children}
    </Styles.Link>
  );
};

export default BtnLink;
