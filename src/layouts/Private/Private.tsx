import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Styles from './styles';

const Default = (): JSX.Element => {
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
