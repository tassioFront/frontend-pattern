import { memo } from 'react';
import Styles from './styles';

interface ErrorTypes {
  message: string;
}

const Error = memo(function Error({ message }: ErrorTypes) {
  return (
    <Styles.Error>
      <p>{message}</p>
    </Styles.Error>
  );
});

export default Error;
