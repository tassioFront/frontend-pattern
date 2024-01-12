import Styles from './styles';
import uniqid from 'uniqid';
import { forwardRef } from 'react';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const TextareaInput = forwardRef(function Textarea(
  {
    id = '',
    label,
    error = '',
    className,
    placeholder,
    value,
    required = false,
    onChange,
    ...rest
  }: TextareaProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  const selfId = id || uniqid(`textarea__`);

  return (
    <Styles.Wrapper className={className}>
      <Styles.Label htmlFor={selfId}>{label}</Styles.Label>
      <Styles.Textarea
        id={selfId}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
      {error !== '' && <div>{error}</div>}
    </Styles.Wrapper>
  );
});

export default TextareaInput;
