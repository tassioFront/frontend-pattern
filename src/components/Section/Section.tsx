import { createIdByString } from '@/helpers/string/string';
import Typography from '../Typography/Typography';
import Styles from './styles';

interface SectionTypes {
  children: JSX.Element | JSX.Element[];
  className?: string;
  heading2?: string;
  description?: string;
}
const Section = ({
  children,
  heading2,
  description,
  ...rest
}: SectionTypes): JSX.Element => {
  return (
    <Styles.Wrapper {...rest}>
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
