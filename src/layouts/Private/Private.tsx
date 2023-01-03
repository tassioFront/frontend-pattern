import { useGHUserNameCache } from '@/hooks/useGHUserNameCache/useGHUserNameCache';
import { loginResolvedRouter } from '@/routes/resolvedRoutes';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Styles from './styles';

const Default = (): JSX.Element => {
  const navigate = useNavigate();
  useGHUserNameCache({ onNotAuth: () => navigate(loginResolvedRouter) });
  return (
    <Styles.Wrapper>
      <Header />
      <Styles.Content>
        <Outlet />
      </Styles.Content>
      private footer
    </Styles.Wrapper>
  );
};

export default Default;
