import { GHUserNameFromStorage } from '@/helpers/GHUserNameFromStorage/GHUserNameFromStorage';
import { loginResolvedRouter } from '@/routes/resolvedRoutes';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Styles from './styles';
import Footer from '@/components/Footer/Footer';

const Default = (): JSX.Element => {
  // handling
  const onNotHasGHUserName = () => Navigate({ to: loginResolvedRouter });
  GHUserNameFromStorage({
    onNotHasGHUserName,
  });

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
