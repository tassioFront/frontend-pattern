import { memo } from 'react';
import Styles from './styles';

interface ProgressBarTypes {
  progress: string;
}

const ProgressBar = memo(function ProgressBar({
  progress,
  ...rest
}: ProgressBarTypes) {
  return (
    <Styles.Wrapper {...rest}>
      <Styles.PlaceHolder />
      <Styles.Content progress={progress} />
    </Styles.Wrapper>
  );
});

export default ProgressBar;
