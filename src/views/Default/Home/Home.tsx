import BaseScreen from '@/components/BaseScreen/BaseScreen';
import Section from '@/components/Section/Section';
import TextList from '@/components/TextList/TextList';
import Styles from './styles';
import { dashboardResolvedRouter } from '@/routes/resolvedRoutes';
import { texts, actions } from './enums';

const Home = (): JSX.Element => {
  const whatWillIFindList = [
    'Frontend good practices',
    'Unit test configuration',
    'Craco configuration',
    'Typescript configuration',
    'Project structure',
  ];
  return (
    <BaseScreen heading={texts.heading} description={texts.description}>
      <Section heading2="So, what will I find here?">
        <p>{texts.whatWillIFindIntro}</p>
        <TextList list={whatWillIFindList} />
      </Section>

      <Section heading2="Wanna see a example?">
        <p>{texts.wannaSeeExampleIntro}</p>
        <p
          dangerouslySetInnerHTML={{ __html: texts.wannaSeeExampleExplanation }}
        />
        <Styles.BtnLink className="primary" to={dashboardResolvedRouter}>
          {actions.seeExample}
        </Styles.BtnLink>
      </Section>
    </BaseScreen>
  );
};

export default Home;
