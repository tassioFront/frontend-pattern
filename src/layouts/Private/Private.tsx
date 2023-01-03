import Spinner from '@/components/Spinner/Spinner';
import { useGetGHInfoByUserName } from '@/hooks/useGetGHInfoByUserName/useGetGHInfoByUserName';
import { useGHUserNameFromStorage } from '@/hooks/useGHUserNameFromStorage/useGHUserNameFromStorage';
import {
  dashboardResolvedRouter,
  loginResolvedRouter,
} from '@/routes/resolvedRoutes';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Styles from './styles';

const Default = (): JSX.Element => {
  const navigate = useNavigate();
  const onNotHasGHUserName = (): void => navigate(loginResolvedRouter);
  const { GHUserName } = useGHUserNameFromStorage({
    onNotHasGHUserName,
  });
  const onSuccess = (): void => {
    navigate(dashboardResolvedRouter);
  };
  const { isLoading, getUserGHInfo } = useGetGHInfoByUserName();
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
