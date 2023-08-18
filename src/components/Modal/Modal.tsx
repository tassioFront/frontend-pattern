import { memo, useEffect } from 'react';
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
  onClose: () => void;
}

const Modal = memo(function Modal({
  children,
  className,
  style,
  title,
  description,
  isOpen,
  onClose,
}: ModalProps) {
  useEffect(() => {
    setTimeout(() => {
      (
        window.document.querySelector('body') as HTMLBodyElement
      ).style.overflowY = isOpen ? 'hidden' : 'auto';
    }, 500);
  }, [isOpen]);
  return (
    <Styles.Wrapper
      isOpen={isOpen}
      onClick={onClose}
      style={style}
      className={className}
    >
      <Styles.Content onClick={(e) => e.stopPropagation()}>
        <Styles.Header>
          <Typography id="modal" tag="h1" label={title} />
          <Btn className="secondary" shape="text" onClick={onClose}>
            <i className={`fa fa-times-circle`} aria-label="close modal"></i>
          </Btn>
          {description && <p>{description}</p>}
        </Styles.Header>
        {children}
        <Styles.Actions>
          <Btn color="primary" onClick={onClose}>
            Got it!
          </Btn>
        </Styles.Actions>
      </Styles.Content>
    </Styles.Wrapper>
  );
});

export default Modal;