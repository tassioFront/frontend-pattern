import Styles from './styles';
import Spinner from '../Spinner/Spinner';

const RouterFallback = ({ text }: { text?: string }): JSX.Element => {
  return (
    <Styles.Wrapper>
      <Spinner type="brand" />
      <p>{text ?? 'Getting the view content'}</p>
    </Styles.Wrapper>
  );
};

export default RouterFallback;
