import { Route, Routes } from 'react-router-dom';

// default layout
import DefaultLayout from './layouts/Default/Default';
import Home from '@/views/Default/Home/Home';
import About from '@/views/Default/About/About';
import Login from '@/views/Default/Login/Login';

// private layout
import PrivateLayout from './layouts/Private/Private';
import { routes, routesPrefix } from './routes/enums';

import { useAppSelector } from '@/store/helper';

function App(): JSX.Element {
  const userInfo = useAppSelector((state) => state.userInfo);
  return (
    <Routes>
      <Route path={routesPrefix.public} element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path={routes.about} element={<About />} />
        <Route path={routes.login} element={<Login />} />
      </Route>
      <Route path={routesPrefix.app} element={<PrivateLayout />}>
        <Route index element={<div>dashboard</div>} />
        <Route
          path={routes.dashboard}
          element={<div>dashboard {userInfo.GHData?.name}</div>}
        />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
