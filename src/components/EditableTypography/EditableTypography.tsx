import { useEffect, useRef, useState } from 'react';
import { TypographyTypes } from '../Typography/Typography';
import Styles from './styles';
import { useClickOutside } from '@/hooks/useClickOutside/useClickOutside';

interface EditableTypographyTypes extends TypographyTypes {
  updateText: (value: string) => void;
}

const EditableTypography = ({
  label,
  id,
  tag,
  className,
  updateText,
}: EditableTypographyTypes): JSX.Element => {
  const [isEdit, setEdit] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const [newText, setNewText] = useState(label);
  useClickOutside(ref, () => {
    setEdit(false);
  });
  const onKeyDown = (event: unknown) => {
    const key = (event as React.KeyboardEvent<HTMLImageElement>).key;
    const isEsc = key === 'Escape';
    const isEnter = key === 'Enter';
    if (isEsc) {
      setEdit(false);
      return;
    }
    if (!isEnter) {
      return;
    }
    updateText(newText);
    setEdit(false);
  };
  useEffect(() => {
    if (ref?.current === null) {
      return;
    }
    ref.current.focus();
    ref.current.select();
  }, [isEdit]);

  return (
    <>
      {isEdit ? (
        <Styles.TextInput
          data-testid="editable__input"
          label=""
          ref={ref}
          value={newText}
          onKeyDown={onKeyDown}
          onChange={(event) => setNewText(event.target.value)}
          title="Press Esc or click outside to cancel"
        />
      ) : (
        <span onClick={() => setEdit(true)} title="Click to edit">
          <Styles.Typography
            tag={tag}
            id={id}
            label={label}
            className={className}
          />
        </span>
      )}
    </>
  );
};

export default EditableTypography;
