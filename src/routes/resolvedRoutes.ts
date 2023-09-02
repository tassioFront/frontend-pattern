import { routes, routesPrefix } from './enums';

// default layout
export const homeResolvedRouter = `${routesPrefix.public}`;
export const aboutResolvedRouter = `${routesPrefix.public}${routes.about}`;
export const loginResolvedRouter = `${routesPrefix.public}${routes.login}`;
export const forbiddenResolvedRouter = `${routesPrefix.public}${routes.forbidden}`;
export const articlesResolvedRouter = `${routesPrefix.public}${routes.articles}`;

// private layout
export const dashboardResolvedRouter = `${routesPrefix.app}/${routes.dashboard}`;
export const todoResolvedRouter = `${routesPrefix.app}/${routes.todo}`;
export const todoUsersResolvedRouter = `${routesPrefix.app}/${routes.todoUsers}`;
