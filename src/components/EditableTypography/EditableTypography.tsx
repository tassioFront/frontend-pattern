import { useEffect, useRef, useState } from 'react';
import Typography, { TypographyTypes } from '../Typography/Typography';
import Styles from './styles';
import { useClickOutside } from '@/hooks/useClickOutside/useClickOutside';
import { editableTypo } from '@/enums/dataCy';

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
  const [isEdit, setEdit] = useState(label === '');
  const ref = useRef<HTMLInputElement>(null);
  const [newText, setNewText] = useState(label);
  useClickOutside(ref, () => {
    setEdit(false);
  });
  const onKeyDown = (event: unknown) => {
    const key = (event as React.KeyboardEvent<HTMLImageElement>).key;
    if (!newText) return;
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
          data-cy={editableTypo.editableInput}
          label=""
          ref={ref}
          value={newText}
          onKeyDown={onKeyDown}
          onChange={(event) => setNewText(event.target.value)}
          title="Press Esc or click outside to cancel"
        />
      ) : (
        <Styles.Typography onClick={() => setEdit(true)} title="Click to edit">
          <Typography tag={tag} id={id} label={label} className={className} />
          <i
            title="edit text"
            className="fa fa-pencil"
            aria-label="edit text"
          />
        </Styles.Typography>
      )}
    </>
  );
};

export default EditableTypography;
