import { createIdByString } from '@/helpers/string/string';
import Typography from '../Typography/Typography';
import Styles from './styles';

interface SectionTypes {
  children: JSX.Element | JSX.Element[];
  className?: string;
  heading2?: string;
  space?: number;
  description?: string;
}
const Section = ({
  children,
  heading2,
  description,
  space = 10,
  ...rest
}: SectionTypes): JSX.Element => {
  return (
    <Styles.Wrapper {...rest} space={space}>
      {heading2 !== undefined && (
        <Styles.Header>
          <Typography
            tag="h2"
            id={createIdByString(heading2)}
            label={heading2}
          />

          {description !== undefined && <p>{description}</p>}
        </Styles.Header>
      )}
      {children}
    </Styles.Wrapper>
  );
};

export default Section;
