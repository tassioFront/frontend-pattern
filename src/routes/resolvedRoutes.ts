import { routes, routesPrefix } from './enums';

// default layout
export const homeResolvedRouter = `${routesPrefix.public}`;
export const aboutResolvedRouter = `${routes.about}`;

// private layout
export const dashboardResolvedRouter = `${routesPrefix.app}/${routes.dashboard}`;
