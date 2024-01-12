import styled from 'styled-components';

export default {
  Wrapper: styled.article`
    background-color: var(--color-neutral-light-1);
    border-radius: 4px;
    min-height: 120px;
    padding: var(--spacing-xxsmall) var(--spacing-small);
    position: relative;
    width: 100%;
    flex-shrink: 0;
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  `,
  Content: styled.div`
    padding: var(--spacing-xsmall) 0;
    cursor: pointer;
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
