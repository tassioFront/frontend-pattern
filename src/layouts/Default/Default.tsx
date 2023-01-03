import { Outlet, useNavigate } from 'react-router-dom';
import Styles from './styles';
import Footer from '@/components/Footer/Footer';
import Header from './components/Header/Header';
import { useGHUserNameFromStorage } from '@/hooks/useGHUserNameFromStorage/useGHUserNameFromStorage';
import { dashboardResolvedRouter } from '@/routes/resolvedRoutes';

const Default = (): JSX.Element => {
  const navigate = useNavigate();
  const onHasGHUserName = (): void => navigate(dashboardResolvedRouter);
  useGHUserNameFromStorage({ onHasGHUserName });

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
