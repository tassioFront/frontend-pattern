import Logo from '@/components/Logo/Logo';
import Styles from './styles';
import BtnLink from '@/components/BtnLink/BtnLink';
import {
  homeResolvedRouter,
  aboutResolvedRouter,
  loginResolvedRouter,
} from '@/routes/resolvedRoutes';

const Header = (): JSX.Element => {
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
      icon: 'area-chart',
      label: 'Fake Login',
    },
  ];
  return (
    <Styles.Header>
      <Logo />
      <Styles.Nav>
        {actions.map((action) => {
          return (
            <BtnLink
              key={action.label}
              title={action.title}
              to={action.to}
              className="secondary"
            >
              {action.label}{' '}
              <i className={`fa fa-${action.icon}`} aria-hidden="true"></i>
            </BtnLink>
          );
        })}
      </Styles.Nav>
    </Styles.Header>
  );
};

export default Header;
