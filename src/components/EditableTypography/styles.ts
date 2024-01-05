import styled from 'styled-components';
import Typography from '../Typography/Typography';
import TextInput from '../TextInput/TextInput';

const Styles = {
  TextInput: styled(TextInput)`
    width: fit-content;
  `,
  Typography: styled(Typography)`
    will-change: opacity;

    :hover {
      cursor: text;
      opacity: 0.75;
      transition-duration: var(--transition-duration);
    }
  `,
};

export default Styles;
