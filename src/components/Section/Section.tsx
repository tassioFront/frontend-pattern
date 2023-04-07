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
          <h2>{heading2}</h2>
          {description !== undefined && <p>{description}</p>}
        </Styles.Header>
      )}
      {children}
    </Styles.Wrapper>
  );
};

export default Section;
