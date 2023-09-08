import styled from 'styled-components';

const Styles = {
  Wrapper: styled.div`
    background-color: transparent;
    border-radius: var(--spacing-base);
    height: var(--spacing-base);
    position: relative;
    width: 100%;
    overflow: hidden;

    & span {
      display: block;
      position: absolute;
      height: 100%;
    }
  `,
  PlaceHolder: styled.span`
    background-color: var(--color-neutral-light-2);
    opacity: 0.2;
    width: 100%;
  `,
  Content: styled.span<{ progress: string }>`
    background-color: var(--color-contextual-success-light-1);
    width: ${(props) => props.progress}%;
    transition: width 0.75s ease-out;
    will-change: width;
  `,
};

export default Styles;
