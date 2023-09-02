import { memo } from 'react';
import Styles from './styles';
import Btn from '@/components/Btn/Btn';

interface EmptyStateTypes {
  message: string;
  onEmpty?: () => void;
}

const EmptyState = memo(function EmptyState({
  message,
  onEmpty,
}: EmptyStateTypes) {
  return (
    <Styles.EmptyState>
      <p>{message}</p>
      {onEmpty && <Btn onClick={onEmpty}>Create</Btn>}
    </Styles.EmptyState>
  );
});

export default EmptyState;
