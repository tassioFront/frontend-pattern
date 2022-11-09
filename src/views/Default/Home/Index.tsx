import BtnLink from '@/components/BtnLink/BtnLink';
import { dashboardResolvedRouter } from '@/routes/resolvedRoutes';

const Home = (): JSX.Element => {
  return (
    <div>
      <BtnLink className="primary" to={dashboardResolvedRouter}>
        Go to app
      </BtnLink>
    </div>
  );
};

export default Home;
