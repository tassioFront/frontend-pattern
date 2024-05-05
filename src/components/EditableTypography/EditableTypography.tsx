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

  const handleResetState = () => {
    setEdit(false);
    setNewText(label);
  };

  useClickOutside(ref, () => {
    if (!newText) return;
    handleResetState();
  });

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;
    const isEsc = key === 'Escape';
    const isEnter = key === 'Enter';

    if (!newText) return;

    if (isEsc) {
      handleResetState();
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
          placeholder="Edit me"
          onKeyDown={onKeyDown}
          onChange={(event) => setNewText(event.target.value)}
          title="Press Esc or click outside to cancel"
        />
      ) : (
        <Styles.Typography onClick={() => setEdit(true)} title="Click to edit">
          <Typography
            tag={tag}
            id={id}
            label={label || 'editing...'}
            className={className}
          />
        </Styles.Typography>
      )}
    </>
  );
};

export default EditableTypography;
