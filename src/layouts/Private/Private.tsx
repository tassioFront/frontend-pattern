import { GHUserNameFromStorage } from '@/helpers/GHUserNameFromStorage/GHUserNameFromStorage';
import { loginResolvedRouter } from '@/routes/resolvedRoutes';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Styles from './styles';
import Footer from '@/components/Footer/Footer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { getAllTodoUsers } from '@/store/todoUsers';

const Default = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  // handling
  const onNotHasGHUserName = () => Navigate({ to: loginResolvedRouter });
  GHUserNameFromStorage({
    onNotHasGHUserName,
  });
  void dispatch(getAllTodoUsers());

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
