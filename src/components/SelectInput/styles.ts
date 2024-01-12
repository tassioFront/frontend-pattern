import styled from 'styled-components';

const Styles = {
  Wrapper: styled.div`
    display: flex;
    flex-flow: column;
    padding: var(--spacing-xsmall) 0;
  `,
  Label: styled.label`
    color: var(--text-color);
    font: var(--text-caption);
    margin-bottom: var(--spacing-xxsmall);
    white-space: nowrap;
  `,
  Select: styled.select`
    appearance: none;
    background: var(--color-neutral-regular);
    cursor: pointer;
    border: 2px solid var(--color-neutral-light-2);
    border-radius: var(--border-radius);
    color: var(--text-color);
    font: var(--text-body-medium);
    letter-spacing: var(--text-body-medium-letter);
    outline: 0;
    padding: var(--spacing-xxsmall);
    position: relative;
    z-index: var(--zindex-1);
    will-change: border;
    transition-duration: var(--transition-duration);

    &:hover {
      border: 2px solid var(--color-brand-primary-dark-1);
    }

    &:disabled,
    &[disabled] {
      background: var(--color-neutral-light-3);

      & {
        color: var(--color-neutral-dark-1);
      }
    }
  `,
};

export default Styles;
