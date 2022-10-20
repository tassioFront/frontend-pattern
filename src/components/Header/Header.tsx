import React from 'react';
import Logo from '../Logo/Logo';
import Styles from './styles';

interface HeaderTypes {
  children?: JSX.Element;
  href?: string;
}

const Header: React.FC<HeaderTypes> = ({
  children,
  href,
  ...rest
}: HeaderTypes) => {
  return (
    <Styles.Header role="banner" {...rest}>
      <Logo />
      {children}
    </Styles.Header>
  );
};

export default Header;
