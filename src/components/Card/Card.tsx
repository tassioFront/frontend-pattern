import { memo } from 'react';
import Styles from './styles';

interface CardTypes {
  floating?: JSX.Element | undefined;
  content: JSX.Element;
  actions?: JSX.Element | undefined;
  className?: string;
}
const Card = memo(function Card({
  floating = undefined,
  content,
  actions = undefined,
  className,
}: CardTypes) {
  return (
    <Styles.Wrapper className={className}>
      {floating && <Styles.Floating>{floating}</Styles.Floating>}
      <Styles.Content>{content}</Styles.Content>
      {actions && (
        <Styles.Actions>
          <hr />
          {actions}
        </Styles.Actions>
      )}
    </Styles.Wrapper>
  );
});

export default Card;
