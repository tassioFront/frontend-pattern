import styled from 'styled-components';
import TextInput from '../TextInput/TextInput';

const Styles = {
  TextInput: styled(TextInput)`
    width: fit-content;
  `,
  Typography: styled.span`
    display: flex;
    align-items: center;
    will-change: opacity;

    :hover {
      cursor: text;
      opacity: 0.7;
      transition-duration: var(--transition-duration);
    }
  `,
};

export default Styles;
