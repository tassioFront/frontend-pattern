import styled from 'styled-components';
import screenSizes from '@/styles/screenSizes';
import Header from '@/components/Header/Header';

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
  Header: styled(Header)`
    justify-content: center;
  `,
};

export default Styles;
