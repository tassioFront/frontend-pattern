import BaseScreen from '@/components/BaseScreen/BaseScreen';
import Section from '@/components/Section/Section';
import Styles from './styles';
import { texts, actions } from './enums';
import TextInput from '@/components/TextInput/TextInput';
import Btn from '@/components/Btn/Btn';
import { useCallback, useState } from 'react';
import {
  useGetGHInfoByUserName,
  getUserGHInfoOnSuccessParams,
} from '@/hooks/useGetGHInfoByUserName/useGetGHInfoByUserName';
import { storageService } from '@/services/localStorage/localStorage.service';
import { StorageKeys } from '@/enums/storage-keys';
import { loginCy } from '@/enums/dataCy';
import { useNavigate } from 'react-router-dom';
import { dashboardResolvedRouter } from '@/routes/resolvedRoutes';

const Login = (): JSX.Element => {
  // state
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const onChangeInput = (value: string): void => {
    setUserName(value);
  };
  const onSuccess = (
    response: getUserGHInfoOnSuccessParams['response']
  ): void => {
    storageService.set(StorageKeys.GHUserName, response?.data?.login);
    navigate(dashboardResolvedRouter);
  };

  // handling
  const { isLoading, getUserGHInfo } = useGetGHInfoByUserName();
  const onSubmit = useCallback(
    async (event: unknown, userNameResult: string) => {
      const key = (event as React.KeyboardEvent<HTMLImageElement>).key;
      const isNotSubmitOrEnterKey = key !== undefined && key !== 'Enter';
      if (isNotSubmitOrEnterKey) {
        return;
      }
      await getUserGHInfo({ userName: userNameResult, onSuccess });
    },
    []
  );

  return (
    <BaseScreen heading={texts.heading} description={texts.description}>
      <Section>
        <Styles.Content>
          <TextInput
            data-cy={loginCy.userNameInput}
            label={texts.inputLabel}
            placeholder={texts.inputPlaceholder}
            value={userName}
            onChange={(e) => onChangeInput(e?.target?.value)}
            onKeyDown={async (e) => await onSubmit(e, userName)}
          />
          <Btn
            data-cy={loginCy.userNameBtn}
            onClick={async (e) => await onSubmit(e, userName)}
            isLoading={isLoading}
          >
            {actions.access}
          </Btn>
        </Styles.Content>
      </Section>
    </BaseScreen>
  );
};

export default Login;
