import { Route, Routes } from 'react-router-dom';
import { routes, routesPrefix } from './routes/enums';

// default layout
import Home from './views/Default/Home';
import About from './views/Default/About';
import Articles from './views/Default/Articles';
import Login from './views/Default/Login';
import DefaultLayout from './layouts/Default';

// private layout
import PrivateLayout from './layouts/Private';
import Dashboard from './views/Private/Dashboard';
import Todo from './views/Private/Todo';
import TodoUsers from './views/Private/TodoUsers/TodoUsers';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={routesPrefix.public} element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path={routes.about} element={<About />} />
        <Route path={routes.articles} element={<Articles />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.forbidden} element={<div>forbidden</div>} />
      </Route>
      <Route path={routesPrefix.app} element={<PrivateLayout />}>
        <Route index element={<Dashboard />} />
        <Route path={routes.dashboard} element={<Dashboard />} />

        <Route path={routes.todo} element={<Todo />} />
        <Route path={routes.todoUsers} element={<TodoUsers />} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
