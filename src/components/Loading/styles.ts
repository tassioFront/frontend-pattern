import styled from 'styled-components';

const Styles = {
  Loading: styled.div<{ height: string }>`
    align-items: center;
    display: flex;
    justify-content: center;
    width: 100%;
    height: ${(props) => props.height};
  `,
};

export default Styles;
