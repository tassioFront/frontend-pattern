import { useState } from 'react';

interface IUseDescriptiveRequest {
  handleOnSuccess: () => Promise<
    'isLoading' | 'isError' | 'isEmpty' | 'hasData' | 'isIdle' | void
  >;
  handleOnError?: (error: unknown) => void;
  handleOnFinally?: () => void;
  initialState?: 'isLoading' | 'isError' | 'isEmpty' | 'hasData' | 'isIdle';
}
export const useDescriptiveRequest = ({
  handleOnSuccess,
  handleOnError = () => null,
  handleOnFinally = () => null,
  initialState = 'isIdle',
}: IUseDescriptiveRequest) => {
  const [uiStateStatus, setUiStateStatus] = useState<
    'isLoading' | 'isError' | 'isEmpty' | 'hasData' | 'isIdle'
  >(initialState);
  const requestData = async () => {
    try {
      setUiStateStatus('isLoading');
      const definedStatus = await handleOnSuccess();
      setUiStateStatus(definedStatus ?? 'hasData');
    } catch (error) {
      setUiStateStatus('isError');
      handleOnError(error);
    } finally {
      handleOnFinally();
    }
  };

  return {
    requestData,
    uiStateStatus,
    setUiStateStatus,
  };
};
