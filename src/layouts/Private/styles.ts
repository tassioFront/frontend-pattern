import styled from 'styled-components';
import screenSizes from '@/styles/screenSizes';

const Styles = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    max-width: ${screenSizes.desktopMax};
    margin: auto;
    min-height: 100vh;
    width: 100%;
  `,
};

export default Styles;
