import { Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/Default/Default';
import { routes } from './enums/routes';
function App(): JSX.Element {
  return (
    <Routes>
      <Route path={routes.publicPrefix} element={<DefaultLayout />}>
        <Route index element={<div>teste</div>} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
