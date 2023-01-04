import Spinner from '@/components/Spinner/Spinner';
import { GHUserNameFromStorage } from '@/helpers/GHUserNameFromStorage/GHUserNameFromStorage';
import { useGetGHInfoByUserName } from '@/hooks/useGetGHInfoByUserName/useGetGHInfoByUserName';
import {
  dashboardResolvedRouter,
  loginResolvedRouter,
} from '@/routes/resolvedRoutes';
import { useEffect } from 'react';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Styles from './styles';

const Default = (): JSX.Element => {
  // state
  const navigate = useNavigate();
  const { isLoading, getUserGHInfo } = useGetGHInfoByUserName();

  // handling
  const onNotHasGHUserName = (): null => Navigate({ to: loginResolvedRouter });
  const { GHUserName } = GHUserNameFromStorage({
    onNotHasGHUserName,
  });
  const onSuccess = (): void => {
    navigate(dashboardResolvedRouter);
  };
  useEffect(() => {
    GHUserName !== null && getUserGHInfo({ userName: GHUserName, onSuccess });
  }, []);

  return (
    <Styles.Wrapper>
      <Header />
      <Styles.Content>
        {isLoading ? <Spinner type="brand" /> : <Outlet />}
      </Styles.Content>
      private footer
    </Styles.Wrapper>
  );
};

export default Default;
