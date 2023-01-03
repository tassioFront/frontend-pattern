import { Outlet, useNavigate } from 'react-router-dom';
import Styles from './styles';
import Footer from '@/components/Footer/Footer';
import Header from './components/Header/Header';
import { dashboardResolvedRouter } from '@/routes/resolvedRoutes';
import { GHUserNameFromStorage } from '@/helpers/GHUserNameFromStorage/GHUserNameFromStorage';

const Default = (): JSX.Element => {
  const navigate = useNavigate();
  const onHasGHUserName = (): void => navigate(dashboardResolvedRouter);
  GHUserNameFromStorage({ onHasGHUserName });

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
