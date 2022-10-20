import { Outlet } from 'react-router-dom';
import Styles from './styles';
import Header from '@/components/Header/Header';
import Footer from './components/Footer/Footer';

const Default = (): JSX.Element => {
  return (
    <Styles.Wrapper>
      <Header />
      <Outlet />
      <Footer />
    </Styles.Wrapper>
  );
};

export default Default;
