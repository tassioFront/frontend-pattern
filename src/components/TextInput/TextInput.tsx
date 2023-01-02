import Styles from './styles';
import uniqid from 'uniqid';

interface TextInputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
const TextInput = ({
  id,
  label,
  error = '',
  type = 'text',
  className,
  placeholder,
  value,
  required = false,
  onChange,
  ...rest
}: TextInputTypes): JSX.Element => {
  const selfId = id ?? uniqid(`input__`);
  return (
    <Styles.Wrapper className={className}>
      <Styles.Label htmlFor={selfId}>{label}</Styles.Label>
      <Styles.Input
        id={selfId}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        {...rest}
      />
      {error !== '' && <div>{error}</div>}
    </Styles.Wrapper>
  );
};

export default TextInput;
