import BaseScreen from '@/components/BaseScreen';
import BtnLink from '@/components/BtnLink/BtnLink';
import { dashboardResolvedRouter } from '@/routes/resolvedRoutes';
import Styles from './styles';

const Home = (): JSX.Element => {
  return (
    <BaseScreen heading="Inspiration">
      <Styles.ImgLazyLoad
        src="https://avatars.githubusercontent.com/u/47509510?s=400&amp;u=198ad81755ac4388541562afdad5a9f2d86ed7ca&amp;v=4"
        width="200"
        height="200"
        alt="User image"
      />
      <BtnLink className="primary" to={dashboardResolvedRouter}>
        Go to app
      </BtnLink>
    </BaseScreen>
  );
};

export default Home;
