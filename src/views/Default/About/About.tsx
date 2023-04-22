import BaseScreen from '@/components/BaseScreen/BaseScreen';
import Section from '@/components/Section/Section';
import { texts } from './enums';
import { apiErrors } from '@/enums/home';
import { wrapperTrycatchfy } from '@/helpers/trycatchfy/trycatchfy';
import { IUserGithub } from '@/models/UserGithub';
import { getUserGithubByUserName } from '@/services/userGithub.service';
import { useEffect, useState } from 'react';
import { storageService } from '@open-ish/utility-storagefy';
import { StorageKeys } from '@/enums/storage-keys';
import UserInfoContent from './components/UserInfo/UserInfoContent';
import Loading from '@/components/Loading/Loading';
import { IContent, challenges, techs } from './content';
import Techs from './components/Techs/Techs';
import Challenges from './components/Challenges/Challenges';

const About = (): JSX.Element => {
  const [user, setUser] = useState<IUserGithub & IContent>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const getUserInfo = async (): Promise<void> => {
    const expectedBehavior = async (): Promise<void> => {
      setIsLoading(true);
      const ghDataCache = storageService.get<IUserGithub>(
        StorageKeys.GHUserData
      );
      const hasCache = ghDataCache?.login !== undefined;
      if (hasCache) {
        return setUser({ ...ghDataCache, techs, challenges });
      }
      const response = await getUserGithubByUserName('tassioFront');
      storageService.set<IUserGithub>(StorageKeys.GHUserData, response.data);
      setUser({ ...response.data, techs, challenges });
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
    <BaseScreen heading={texts.heading} description={texts.description}>
      {!isLoading ? (
        <>
          <Section heading2={texts.whoAmI}>
            <UserInfoContent user={user as IUserGithub} error={error} />
          </Section>
          {user !== undefined && (
            <>
              <Section heading2={texts.techsIntro}>
                <Techs techs={user.techs} />
              </Section>
              <Section heading2={texts.challenges}>
                <Challenges challenges={user.challenges} />
              </Section>
            </>
          )}
        </>
      ) : (
        <Loading height="50vh" />
      )}
    </BaseScreen>
  );
};

export default About;