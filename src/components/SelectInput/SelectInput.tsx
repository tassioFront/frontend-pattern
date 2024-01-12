import Styles from './styles';
import uniqid from 'uniqid';
import { forwardRef, ReactNode } from 'react';

interface SelectOption {
  label: string;
  id: string | number;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: SelectOption[];
  children?: ReactNode;
}

const SelectInput = forwardRef(function Select(
  {
    id = '',
    label,
    error = '',
    className,
    options,
    required = false,
    onChange,
    ...rest
  }: SelectProps,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  const selfId = id || uniqid(`select__`);

  return (
    <Styles.Wrapper className={className}>
      <Styles.Label htmlFor={selfId}>{label}</Styles.Label>
      <Styles.Select
        id={selfId}
        onChange={onChange}
        required={required}
        ref={ref}
        {...rest}
        data-testid="id-select"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id} data-testid={option.id}>
            {option.label}
          </option>
        ))}
      </Styles.Select>
      {error !== '' && <div>{error}</div>}
    </Styles.Wrapper>
  );
});

export default SelectInput;
