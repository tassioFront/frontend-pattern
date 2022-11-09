import { Outlet } from 'react-router-dom';
import Styles from './styles';

const Default = (): JSX.Element => {
  return (
    <Styles.Wrapper>
      private header
      <Outlet />
      private footer
    </Styles.Wrapper>
  );
};

export default Default;
