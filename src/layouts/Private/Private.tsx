import { Outlet } from 'react-router-dom';
import Styles from './styles';

const Default = (): JSX.Element => {
  return (
    <Styles.Wrapper>
      <Styles.Header>
        <div>Private header content</div>
      </Styles.Header>
      <Styles.Content>
        <Outlet />
      </Styles.Content>
      private footer
    </Styles.Wrapper>
  );
};

export default Default;
