import { Route, Routes } from 'react-router-dom';

// default layout
import DefaultLayout from './layouts/Default/Default';
import Home from '@/views/Default/Home/Home';
import About from '@/views/Default/About/About';
import Login from '@/views/Default/Login/Login';

// private layout
import PrivateLayout from './layouts/Private/Private';
import { routes, routesPrefix } from './routes/enums';
import Dashboard from './views/Private/Dashboard/Dashboard';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={routesPrefix.public} element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path={routes.about} element={<About />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.forbidden} element={<div>forbidden</div>} />
      </Route>
      <Route path={routesPrefix.app} element={<PrivateLayout />}>
        <Route index element={<Dashboard />} />
        <Route path={routes.dashboard} element={<Dashboard />} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
