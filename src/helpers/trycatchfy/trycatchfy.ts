import { customHttpErrors } from '@/enums/customHttpErrors';
import { forbiddenResolvedRouter } from '@/routes/resolvedRoutes';
import { initTrycatchfy } from '@open-ish/utility-trycatchfy';
import { ITrycatchfyParams } from '@open-ish/utility-trycatchfy/src/lib/models';
import { fakeLogout } from '../useInfo';
import { AxiosResponse } from 'axios';

interface IFakeAxios {
  response: AxiosResponse;
  status: number;
}

const trycatchfy = initTrycatchfy();
interface IWrapperTrycatchfy {
  expectedBehavior: ITrycatchfyParams<IFakeAxios>['expectedBehavior'];
  onForbiddenError?: ITrycatchfyParams<IFakeAxios>['onForbiddenError'];
  onResourceError: ITrycatchfyParams<IFakeAxios>['onResourceError'];
  onEndCycle: ITrycatchfyParams<IFakeAxios>['onEndCycle'];
}

export const wrapperTrycatchfy = async ({
  expectedBehavior,
  onForbiddenError,
  onResourceError,
  onEndCycle,
}: IWrapperTrycatchfy): Promise<void | Error> => {
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
