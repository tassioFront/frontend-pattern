import BaseScreen from '@/components/BaseScreen/BaseScreen';
import Section from '@/components/Section/Section';
import UserInfo from './components/UserInfo/UserInfo';
import { texts } from './enums';

const About = (): JSX.Element => {
  return (
    <BaseScreen heading={texts.heading}>
      <Section heading2="Who am I?">
        <UserInfo />
      </Section>
    </BaseScreen>
  );
};

export default About;
