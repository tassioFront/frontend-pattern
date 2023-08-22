import styled from 'styled-components';
import Spinner from '../Spinner/Spinner';

const Styles = {
  Btn: styled.button`
    align-items: center;
    border-radius: var(--spacing-xxxlarge);
    cursor: pointer;
    display: inline-flex;
    font: var(--text-body-medium);
    justify-content: center;
    height: var(--spacing-xxxlarge);
    letter-spacing: var(--text-body-medium-letter);
    outline: 0;
    overflow: hidden;
    position: relative;
    transition-property: background-color;
    will-change: background-color;
    padding: var(--spacing-medium);
    transition-duration: var(--transition-duration);

    &.primary {
      &.shape--default {
        font-weight: var(--font-weight-medium);
        color: var(--color-neutral-white);
        background-color: var(--color-brand-primary-regular);

        :hover {
          background-color: var(--color-brand-primary-dark-1);
        }
      }

      &.shape--outlined {
        border-color: var(--color-brand-primary-regular);
        color: var(--color-brand-primary-dark-1);
        background-color: var(--color-neutral-white);

        :hover {
          background-color: var(--color-brand-primary-light-2);
        }
      }
    }

    &.secondary {
      &.shape--default {
        font-weight: var(--font-weight-medium);
        color: var(--color-neutral-white);
        background-color: var(--color-brand-secondary-regular);

        :hover {
          background-color: var(--color-brand-secondary-dark-1);
        }
      }

      &.shape--outlined {
        border-color: var(--color-brand-secondary-regular);
        color: var(--color-brand-secondary-dark-1);
        background-color: var(--color-neutral-white);

        :hover {
          background-color: var(--color-brand-secondary-light-2);
        }
      }

      &.shape--text {
        font-weight: var(--font-weight-medium);
        color: var(--color-brand-secondary-regular);
        background-color: transparent;

        :hover {
          color: var(--color-brand-secondary-dark-1);
          background-color: var(--color-brand-secondary-light-1);
        }
      }
    }

    :disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
  Children: styled.p`
    display: inherit;
    position: relative;
    white-space: nowrap;

    img {
      max-width: none;
    }

    &.isLoading {
      opacity: 0;
    }
  `,
  Spinner: styled(Spinner)`
    position: absolute;
  `,
};

export default Styles;
