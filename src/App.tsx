import { Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/Public/Public';
// import PrivateLayout from "./layouts/Private/Private";
// import Login from "./views/Public/Login/Login";
// import SignUp from "./views/Public/SignUp/SignUp";
import { routes } from './enums/routes';
// import Dashboard from "./views/Private/Dashboard/Dashboard";
// import Exchange from "./views/Private/Exchange/Exchange";
// import History from "./views/Private/History/History";
// import { QueryClient, QueryClientProvider } from "react-query";
// import Content from "./views/Private/History/components/Content/Content";
// const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    // <QueryClientProvider client={queryClient}>
    <Routes>
      {/* <Route path={routes.appPrefix} element={<PrivateLayout />}>
          <Route index element={<Dashboard />} />
          <Route path={routes.exchange} element={<Exchange />} />
          <Route path={routes.history} element={<History />}>
            <Route path={":id"} element={<Content />} />
          </Route>
        </Route>
        */}
      <Route path={routes.publicPrefix} element={<PublicLayout />}>
        <Route index element={<div>teste</div>} />
        {/* <Route path={routes.login} element={<Login />} /> */}
        {/* <Route path={routes.signUp} element={<SignUp />} /> */}
      </Route>

      <Route path="*" element={<div>404</div>} />
    </Routes>
    // </QueryClientProvider>
  );
}

export default App;
