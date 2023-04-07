import { IUserGithub } from '@/models/UserGithub';
import Styles, { imageSize } from './styles';

interface UserInfoContentTypes {
  user: IUserGithub;
  error: string;
}

const UserInfoContent = ({
  user,
  error,
}: UserInfoContentTypes): JSX.Element => {
  return user !== undefined ? (
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
};

export default UserInfoContent;
