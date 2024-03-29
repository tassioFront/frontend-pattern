import styled from 'styled-components';

export default {
  Wrapper: styled.article`
    background-color: var(--color-neutral-light-1);
    border-radius: 4px;
    cursor: pointer;
    flex-shrink: 0;
    min-height: 120px;
    padding: var(--spacing-xxsmall) var(--spacing-small);
    position: relative;
    width: 100%;
    animation: fadeIn 0.5s;

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `,
  Header: styled.div`
    align-items: baseline;
    display: flex;
    justify-content: space-between;

    & strong {
      cursor: grab;
      width: 100%;
    }
  `,
  Content: styled.div`
    padding: var(--spacing-xsmall) 0;
    height: fit-content;
  `,
  Footer: styled.div`
    bottom: 0;
    padding: var(--spacing-xxsmall) var(--spacing-xsmall);
    position: absolute;
    right: 0;
  `,
  Avatar: styled.span`
    align-items: center;
    color: white;
    display: flex;
    border-radius: 50%;
    height: 24px;
    width: 24px;
    background-color: var(--color-brand-secondary-regular);
    justify-content: center;
  `,
};
