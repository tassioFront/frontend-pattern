import styled from 'styled-components';

const Styles = {
  Wrapper: styled.div`
    align-items: center;
    display: flex;
    cursor: pointer;

    &:not(:hover) ::before {
      opacity: 0.2;
      will-change: opacity;
    }

    &:hover ::before {
      transition-duration: var(--transition-duration);
      opacity: 1;
    }
  `,
};

export default Styles;
