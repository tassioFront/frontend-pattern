import Logo from '@/components/Logo/Logo';
import Styles from './styles';
import BtnLink from '@/components/BtnLink/BtnLink';
import { fakeLogout } from '@/helpers/useInfo';
import { loginResolvedRouter } from '@/routes/resolvedRoutes';

const Header = (): JSX.Element => {
  const actions = [
    {
      title: 'Go to login page',
      to: loginResolvedRouter,
      icon: 'sign-out',
      label: 'logout',
      onClick: () => fakeLogout(),
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
              className="primary"
              onClick={action.onClick}
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
