import Styles from './styles';
import Spinner from '../Spinner/Spinner';

const RouterFallback = (): JSX.Element => {
  return (
    <Styles.Wrapper>
      <Spinner />
      {/* @to-do[fallback]: create a amazing skeleton fallback instead */}
      <p>Getting that amazing data to you xD</p>
    </Styles.Wrapper>
  );
};

export default RouterFallback;
