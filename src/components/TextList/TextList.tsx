import Styles from './styles';

interface TextListTypes {
  list: string[];
  type?: 'light' | 'dark';
}
const TextList = ({
  list,
  type = 'light',
  ...rest
}: TextListTypes): JSX.Element => {
  return (
    <Styles.Wrapper {...rest} className={type}>
      {list.map((item) => {
        return (
          // use custom components in the future
          <li key={item}>
            <p>
              - <span dangerouslySetInnerHTML={{ __html: item }} />;
            </p>
          </li>
        );
      })}
    </Styles.Wrapper>
  );
};

export default TextList;
