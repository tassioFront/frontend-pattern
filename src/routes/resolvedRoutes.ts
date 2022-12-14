import { routes, routesPrefix } from './enums';

// default layout
export const homeResolvedRouter = `${routesPrefix.public}`;
export const aboutResolvedRouter = `${routesPrefix.public}${routes.about}`;
export const loginResolvedRouter = `${routesPrefix.public}${routes.login}`;

// private layout
export const dashboardResolvedRouter = `${routesPrefix.app}/${routes.dashboard}`;
