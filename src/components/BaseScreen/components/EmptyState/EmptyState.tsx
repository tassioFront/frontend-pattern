import { memo } from 'react';
import Styles from './styles';

interface EmptyStateTypes {
  message: string;
}

const EmptyState = memo(function EmptyState({ message }: EmptyStateTypes) {
  return (
    <Styles.EmptyState>
      <p>{message}</p>
    </Styles.EmptyState>
  );
});

export default EmptyState;
