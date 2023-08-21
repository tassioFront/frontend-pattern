import Logo from '@/components/Logo/Logo';
import Styles from './styles';
import {
  homeResolvedRouter,
  aboutResolvedRouter,
  loginResolvedRouter,
  articlesResolvedRouter,
} from '@/routes/resolvedRoutes';
import Menu from '@/components/Menu/Menu';
import { useState } from 'react';

const Header = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      title: 'Go to home page',
      to: homeResolvedRouter,
      icon: 'home',
      label: 'Home',
    },
    {
      title: 'Go to about page',
      to: aboutResolvedRouter,
      icon: 'address-card',
      label: 'About',
    },
    {
      title: 'Go to Fake Login page',
      to: loginResolvedRouter,
      label: 'Fake Login',
    },
    {
      title: 'Go to Articles page',
      to: articlesResolvedRouter,
      icon: 'star',
      label: 'Articles',
    },
  ];

  return (
    <Styles.Header>
      <Logo />
      <Menu open={open} actions={actions} setOpen={setOpen} />
    </Styles.Header>
  );
};

export default Header;
