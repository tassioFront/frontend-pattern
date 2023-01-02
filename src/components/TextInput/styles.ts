import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Wrapper: styled.div`
    display: flex;
    flex-flow: column;
    padding: var(--spacing-xsmall) 0;

    ${media.greaterThan('tablet')`
        padding: var(--spacing-small) 0;
    `}
  `,
  Label: styled.label`
    color: var(--color-neutral-light-1);
    font: var(--text-caption);
    margin-bottom: var(--spacing-xxsmall);
  `,
  Input: styled.input`
    appearance: none;
    background: var(--color-neutral-regular);
    border: 2px solid var(--color-neutral-light-2);
    border-radius: var(--border-radius);
    color: var(--text-color);
    font: var(--text-body-medium);
    letter-spacing: var(--text-body-medium-letter);
    outline: 0;
    padding: var(--spacing-small);
    position: relative;
    width: 100%;
    z-index: var(--zindex-1);
    will-change: border;
    transition-duration: var(--transition-duration);

    &:focus,
    &:hover {
      border: 2px solid var(--color-brand-primary-dark-1);
    }

    &:placeholder {
      color: var(--color-neutral-dark-3);
    }

    &:disabled,
    &[disabled] {
      background: var(--color-neutral-light-3);

      &,
      &::placeholder {
        color: var(--color-neutral-dark-1);
      }
    }
  `,
};

export default Styles;
