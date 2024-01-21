import { memo } from 'react';
import Styles from './styles';
import Btn from '../Btn/Btn';
import Typography from '../Typography/Typography';

interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isOpen: boolean;
  title: string;
  description?: string;
  onSubmitText?: string;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitLoading?: boolean;
}

const Modal = memo(function Modal({
  children,
  className,
  style,
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
  onSubmitText = 'See the result!',
  isSubmitLoading = false,
}: ModalProps) {
  return (
    <Styles.Overflow
      isOpen={isOpen}
      onClick={onClose}
      style={style}
      className={className}
    >
      <Styles.Wrapper onClick={(e) => e.stopPropagation()}>
        <Styles.Header>
          <Typography id="modal" tag="h1" label={title} />
          <Btn className="secondary" shape="text" onClick={onClose}>
            <i className={`fa fa-times-circle`} aria-label="close modal"></i>
          </Btn>
          {description && <p>{description}</p>}
        </Styles.Header>
        <Styles.Content onClick={(e) => e.stopPropagation()}>
          {children}
        </Styles.Content>
        <Styles.Actions>
          <Btn color="primary" onClick={onSubmit} isLoading={isSubmitLoading}>
            {onSubmitText}
          </Btn>
        </Styles.Actions>
      </Styles.Wrapper>
    </Styles.Overflow>
  );
});

export default Modal;
