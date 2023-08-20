import { IUserGithub } from '@/models/UserGithub';
import Styles, { imageSize } from './styles';

interface UserInfoContentTypes {
  user: IUserGithub;
}

const UserInfoContent = ({ user }: UserInfoContentTypes): JSX.Element => {
  return (
    <Styles.Content>
      <Styles.ImgLazyLoad
        src={user.avatar_url}
        width={imageSize}
        height={imageSize}
        alt="User image"
      />
      <h3>{user?.name}</h3>
      <p>{user?.bio}</p>
    </Styles.Content>
  );
};

export default UserInfoContent;
