import { act, renderHook } from '@testing-library/react';
import { useDescriptiveRequest } from './useDescriptiveRequest';
import { vi } from 'vitest';

describe('hooks - useDescriptiveRequest', () => {
  it('Should set ui state to isError and call handleOnError and set ui state to loading when is changed', async () => {
    const handleOnError = vi.fn();
    const handleOnFinally = vi.fn();
    const error = new Error('forcing an error');
    const render = renderHook(() =>
      useDescriptiveRequest({
        handleOnSuccess: () => {
          return Promise.reject(error);
        },
        handleOnError,
        handleOnFinally,
      })
    );
    const { requestData, setUiStateStatus } = render.result.current;
    expect(render.result.current.uiStateStatus).toBe('isIdle');

    await act(async () => {
      await requestData();
    });
    expect(render.result.current.uiStateStatus).toBe('isError');
    expect(handleOnError).toBeCalledWith(error);
    expect(handleOnFinally).toBeCalled();

    act(() => {
      setUiStateStatus('isLoading');
    });
    expect(render.result.current.uiStateStatus).toBe('isLoading');
  });

  it('Should treat handleOnSuccess ', async () => {
    const handleOnSuccess = vi.fn();
    const handleOnError = vi.fn();
    const handleOnFinally = vi.fn();
    const render = renderHook(() =>
      useDescriptiveRequest({
        handleOnSuccess,
        handleOnError,
        handleOnFinally,
        initialState: 'isLoading',
      })
    );
    const { requestData } = render.result.current;
    expect(render.result.current.uiStateStatus).toBe('isLoading');

    await act(async () => {
      await requestData();
    });
    expect(render.result.current.uiStateStatus).toBe('hasData');
    expect(handleOnError).not.toBeCalled();
    expect(handleOnFinally).toBeCalled();
  });
});
