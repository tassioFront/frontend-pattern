import { Outlet } from 'react-router-dom';
import Styles from './styles';
import Footer from '@/components/Footer/Footer';

const Default = (): JSX.Element => {
  return (
    <Styles.Wrapper>
      <Styles.Header />
      <Styles.Content>
        <Outlet />
      </Styles.Content>
      <Footer />
    </Styles.Wrapper>
  );
};

export default Default;
