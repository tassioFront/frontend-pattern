import { Outlet, useNavigate } from 'react-router-dom';
import Styles from './styles';
import Footer from '@/components/Footer/Footer';
import Header from './components/Header/Header';
import { useGHUserNameCache } from '@/hooks/useGHUserNameCache/useGHUserNameCache';
import { dashboardResolvedRouter } from '@/routes/resolvedRoutes';

const Default = (): JSX.Element => {
  const navigate = useNavigate();
  useGHUserNameCache({ onAuth: () => navigate(dashboardResolvedRouter) });

  return (
    <Styles.Wrapper>
      <Header />
      <Styles.Content>
        <Outlet />
      </Styles.Content>
      <Footer />
    </Styles.Wrapper>
  );
};

export default Default;
