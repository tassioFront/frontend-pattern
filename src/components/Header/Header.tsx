import React from 'react';
import Styles from './styles';

interface HeaderTypes {
  children?: JSX.Element | JSX.Element[];
  href?: string;
}

const Header: React.FC<HeaderTypes> = ({
  children,
  href,
  ...rest
}: HeaderTypes) => {
  return (
    <Styles.Header role="banner" {...rest}>
      {children}
    </Styles.Header>
  );
};

export default Header;
