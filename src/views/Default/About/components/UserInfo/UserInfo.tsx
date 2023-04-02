import Spinner from '@/components/Spinner/Spinner';
import { apiErrors } from '@/enums/home';
import { wrapperTrycatchfy } from '@/helpers/trycatchfy/trycatchfy';
import { IUserGithub } from '@/models/UserGithub';
import { getUserGithubByUserName } from '@/services/userGithub.service';
import { useEffect, useState } from 'react';
import Styles, { imageSize } from './styles';

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
  const childrenToRender =
    user !== undefined ? (
      <Styles.Content>
        <Styles.ImgLazyLoad
          src={user.avatar_url}
          width={imageSize}
          height={imageSize}
          alt="User image"
        />
        <h2>{user?.name}</h2>
        <p>{user?.bio}</p>
      </Styles.Content>
    ) : (
      <>{error}</>
    );
  useEffect(() => {
    void getUserInfo();
  }, []);
  return <>{!isLoading ? childrenToRender : <Spinner type="brand" />}</>;
};

export default UserInfo;
