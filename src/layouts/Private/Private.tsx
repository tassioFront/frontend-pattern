import { Outlet } from 'react-router-dom';
import Styles from './styles';
import Header from '@/components/Header/Header';

const Default = (): JSX.Element => {
  return (
    <Styles.Wrapper>
      <Header>
        <div>Private header</div>
      </Header>
      <Outlet />
      private footer
    </Styles.Wrapper>
  );
};

export default Default;
