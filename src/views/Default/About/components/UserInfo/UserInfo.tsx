import { apiErrors } from '@/enums/home';
import { wrapperTrycatchfy } from '@/helpers/trycatchfy/trycatchfy';
import { IUserGithub } from '@/models/UserGithub';
import { getUserGithubByUserName } from '@/services/userGithub.service';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading/Loading';
import UserInfoContent from './UserInfoContent';

const UserInfo = (): JSX.Element => {
  const [user, setUser] = useState<IUserGithub>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const getUserInfo = async (): Promise<void> => {
    const expectedBehavior = async (): Promise<void> => {
      setIsLoading(true);
      const response = await getUserGithubByUserName('tassioFront');
      setUser(response.data);
    };
    const onResourceError = (): void => {
      alert(apiErrors.getUserGithubByUserName);
      setError(apiErrors.getUserGithubByUserName);
    };
    await wrapperTrycatchfy({
      expectedBehavior,
      onResourceError,
      onEndCycle: () => setIsLoading(false),
    });
  };
  useEffect(() => {
    void getUserInfo();
  }, []);
  return (
    <>
      {!isLoading ? (
        <UserInfoContent user={user as IUserGithub} error={error} />
      ) : (
        <Loading height="50vh" />
      )}
    </>
  );
};

export default UserInfo;
