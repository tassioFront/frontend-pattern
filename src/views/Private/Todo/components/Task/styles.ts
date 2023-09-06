import styled from 'styled-components';

export default {
  Wrapper: styled.article<{ color: string }>`
    background-color: ${(props) => props.color};
    border-radius: 4px;
    height: 150px;
    padding: var(--spacing-xxsmall) var(--spacing-small);
    position: relative;
    max-width: 300px;
    min-width: 250px;
    cursor: pointer;
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  `,
  Content: styled.div`
    padding: var(--spacing-xsmall) 0;
  `,
  Footer: styled.div`
    bottom: 0;
    padding: var(--spacing-xxsmall) var(--spacing-xsmall);
    position: absolute;
    right: 0;
  `,
  Avatar: styled.span`
    padding: var(--spacing-xxsmall) var(--spacing-xsmall);
    border: 1px solid var(--color-brand-secondary-regular);
    border-radius: calc(2 * var(--spacing-xsmall));
    background-color: var(--color-brand-secondary-regular);
    color: white;
    display: block;
  `,
};
