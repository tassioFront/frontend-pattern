import { Outlet } from 'react-router-dom';
import Styles from './styles';
import Footer from '@/components/Footer/Footer';
import Header from './components/Header/Header';

const Default = (): JSX.Element => {
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
