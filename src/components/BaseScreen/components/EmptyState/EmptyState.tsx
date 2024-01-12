import { memo } from 'react';
import Styles from './styles';
import Btn from '@/components/Btn/Btn';
import { baseScreen } from '@/enums/dataCy';

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
      <p data-cy={baseScreen.isEmptyMessage}>{message}</p>
      {onEmpty && (
        <Btn data-cy={baseScreen.onEmpty} onClick={onEmpty}>
          Create
        </Btn>
      )}
    </Styles.EmptyState>
  );
});

export default EmptyState;
