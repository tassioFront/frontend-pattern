import Styles from './styles';
import Spinner from '../Spinner/Spinner';

const RouterFallback = ({ text }: { text?: string }): JSX.Element => {
  return (
    <Styles.Wrapper>
      <Spinner />
      {/* @to-do[fallback]: create a amazing skeleton fallback instead */}
      <p>{text ?? 'Getting the view content'}</p>
    </Styles.Wrapper>
  );
};

export default RouterFallback;
