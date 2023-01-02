import BaseScreen from '@/components/BaseScreen/BaseScreen';
import Section from '@/components/Section/Section';
import Styles from './styles';
import { dashboardResolvedRouter } from '@/routes/resolvedRoutes';
import { texts, actions } from './enums';
import TextInput from '@/components/TextInput/TextInput';
import Btn from '@/components/Btn/Btn';
import { useState } from 'react';
import { getUserGithubByUserName } from '@/services/userGithub.service';
import { userInfoActions } from '@/store/userInfo';
import { useAppDispatch } from '@/store/helper';
import { useNavigate } from 'react-router-dom';

const Login = (): JSX.Element => {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChangeInput = (value: string): void => {
    setUserName(value);
  };

  // handling
  const getUserGHInfo = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await getUserGithubByUserName(userName);
      dispatch(userInfoActions.setUserInfo(response.data));
      navigate(dashboardResolvedRouter);
    } catch (error) {
      // create a alert component
      alert((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseScreen heading={texts.heading} description={texts.description}>
      <Section>
        <Styles.Content>
          <TextInput
            label={texts.inputLabel}
            placeholder={texts.inputPlaceholder}
            value={userName}
            onChange={(e) => onChangeInput(e?.target?.value)}
          />
          <Btn onClick={getUserGHInfo} isLoading={isLoading}>
            {actions.access}
          </Btn>
        </Styles.Content>
      </Section>
    </BaseScreen>
  );
};

export default Login;
