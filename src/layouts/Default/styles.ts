import styled from 'styled-components';
import screenSizes from '@/styles/screenSizes';

const Styles = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    min-height: 100vh;
    width: 100%;
  `,
  Content: styled.main`
    max-width: ${screenSizes.desktopMax};
    margin: 0 auto;
    width: 100%;
    background-color: var(--color-neutral-light-5);
  `,
};

export default Styles;
