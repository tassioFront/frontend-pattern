import { Route, Routes } from 'react-router-dom';

// default layout
import DefaultLayout from './layouts/Default/Default';
import Home from '@/views/Default/Home/Index';

// private layout
import PrivateLayout from './layouts/Private/Private';
import { routes, routesPrefix } from './routes/enums';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={routesPrefix.public} element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path={routes.login} element={<div>login</div>} />
      </Route>
      <Route path={routesPrefix.app} element={<PrivateLayout />}>
        <Route index element={<div>dashboard</div>} />
        <Route path={routes.dashboard} element={<div>dashboard</div>} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
