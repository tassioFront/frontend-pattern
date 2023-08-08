import { Outlet, Navigate } from 'react-router-dom';
import Styles from './styles';
import Footer from '@/components/Footer/Footer';
import Header from './components/Header/Header';
import { dashboardResolvedRouter } from '@/routes/resolvedRoutes';
import { GHUserNameFromStorage } from '@/helpers/GHUserNameFromStorage/GHUserNameFromStorage';
import BtnFloat from '@/components/BtnFloat/BtnFloat';

const Default = (): JSX.Element => {
  const onHasGHUserName = (): null => Navigate({ to: dashboardResolvedRouter });
  GHUserNameFromStorage({ onHasGHUserName });

  return (
    <Styles.Wrapper>
      <Header />
      <Styles.Content>
        <Outlet />
      </Styles.Content>
      <Footer />
      <BtnFloat />
    </Styles.Wrapper>
  );
};

export default Default;
