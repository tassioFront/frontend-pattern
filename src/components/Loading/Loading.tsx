import Spinner from '../Spinner/Spinner';
import Styles from './styles';

interface LoadingTypes {
  height: string;
}

const Loading = ({ height, ...rest }: LoadingTypes): JSX.Element => {
  return (
    <Styles.Loading height={height} {...rest}>
      <Spinner type="brand" />
    </Styles.Loading>
  );
};

export default Loading;
