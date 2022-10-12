import { Outlet } from 'react-router-dom';
import Styles from './styles';
// import { useEffect } from "react";
// import { resolvedRoutes } from "@/enums/routes";
const Public = (): JSX.Element => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const userCache = localStorage.getItem("user");
  //   userCache && navigate(resolvedRoutes.dashboard);
  // }, [navigate]);

  return (
    <>
      <Styles.Header />
      <Outlet />
    </>
  );
};

export default Public;
