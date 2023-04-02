import { customHttpErrors } from '@/enums/customHttpErrors';
import { forbiddenResolvedRouter } from '@/routes/resolvedRoutes';
import { initTrycatchfy } from '@open-ish/utility-trycatchfy';
import { ITrycatchfyParams } from '@open-ish/utility-trycatchfy/src/lib/models';
import { fakeLogout } from '../useInfo';

interface IFakeAxios {
  response: any;
  status: number;
}

const trycatchfy = initTrycatchfy();

export const wrapperTrycatchfy = async ({
  expectedBehavior,
  onForbiddenError,
  onResourceError,
  onScriptError,
  onEndCycle,
  onHttpExceptionError,
}: Omit<
  ITrycatchfyParams<IFakeAxios>,
  'onUnauthorizedError' | 'onInternalServerError'
>): Promise<void | Error> => {
  const onUnauthorizedErrorDefault = (): void => {
    alert(customHttpErrors.unauthorizedError);
    fakeLogout();
  };
  const onForbiddenErrorDefault = (): void => {
    window.location.href = forbiddenResolvedRouter;
  };
  const onInternalServerErrorDefault = (): void => {
    alert(customHttpErrors.serverError);
  };
  const onScriptErrorDefault = (): void => {
    /* 
      Log your error in some monitoring tool (like Sentry, Dynatrace)
    */
    alert(customHttpErrors.unexpectedError);
  };
  const onExceptionErrorDefault = (): void => {
    /* 
      Log your error in some monitoring tool (like Sentry, Dynatrace).\
      It my happen with unknown status code. Not common
    */
    alert(customHttpErrors.unexpectedError);
  };
  return await trycatchfy<IFakeAxios>({
    expectedBehavior,
    onResourceError,
    onForbiddenError: onForbiddenErrorDefault ?? onForbiddenError,
    onScriptError: onScriptErrorDefault,
    onHttpExceptionError: onExceptionErrorDefault,
    onUnauthorizedError: onUnauthorizedErrorDefault,
    onInternalServerError: onInternalServerErrorDefault,
    onEndCycle,
  });
};
