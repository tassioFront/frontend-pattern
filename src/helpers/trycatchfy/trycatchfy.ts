import { initTrycatchfy } from '@open-ish/utility-trycatchfy';
import { ITrycatchfyParams } from '@open-ish/utility-trycatchfy/src/lib/models';

interface IFakeAxios {
  response: any;
  status: number;
}

export const customHttpErrors = [
  { statusCode: 900, handleName: 'myCustomStatusCode' },
];

const trycatchfy = initTrycatchfy({
  customHttpErrors, // optional custom handle
});

export const wrapperTrycatchfy = async ({
  expectedBehavior,
  onForbiddenError,
  onResourceError,
  onScriptError,
  // myCustomStatusCode,
  onEndCycle,
  onHttpExceptionError,
}: ITrycatchfyParams<IFakeAxios>): Promise<void | Error> => {
  // }: Omit<
  //   ITrycatchfyParams<IFakeAxios>,
  //   'onUnauthorizedError' | 'onInternalServerError'
  // >) => {
  const onUnauthorizedErrorDefault = () => {
    console.log('logout user');
  };
  const onInternalServerErrorDefault = () => {
    console.log('server error - reload');
  };
  return await trycatchfy<IFakeAxios>({
    expectedBehavior,
    onForbiddenError,
    onResourceError,
    // customHttpErrorsHandle: { myCustomStatusCode },
    onScriptError,
    onHttpExceptionError,
    onUnauthorizedError: onUnauthorizedErrorDefault,
    onInternalServerError: onInternalServerErrorDefault,
    onEndCycle,
  });
};
