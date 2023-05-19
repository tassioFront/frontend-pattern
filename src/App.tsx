import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';

import { routes, routesPrefix } from './routes/enums';
import RouterFallback from './components/RouterFallback/RouterFallback';

// default layout
const DefaultLayout = loadable(
  async () => await import('./layouts/Default/Default')
);
const Home = loadable(async () => await import('@/views/Default/Home/Home'));
const About = loadable(async () => await import('@/views/Default/About/About'));
const Login = loadable(async () => await import('@/views/Default/Login/Login'));

// private layout
const PrivateLayout = loadable(
  async () => await import('./layouts/Private/Private')
);
const Dashboard = loadable(
  async () => await import('@/views/Private/Dashboard/Dashboard')
);

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={routesPrefix.public} element={<DefaultLayout />}>
        <Route index element={<Home fallback={<RouterFallback />} />} />
        <Route
          path={routes.about}
          element={<About fallback={<RouterFallback />} />}
        />
        <Route
          path={routes.login}
          element={<Login fallback={<RouterFallback />} />}
        />
        <Route path={routes.forbidden} element={<div>forbidden</div>} />
      </Route>
      <Route path={routesPrefix.app} element={<PrivateLayout />}>
        <Route index element={<Dashboard />} />
        <Route
          path={routes.dashboard}
          element={<Dashboard fallback={<RouterFallback />} />}
        />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
