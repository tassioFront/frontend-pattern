import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Styles = {
  Link: styled(Link)`
    border-bottom: 1px solid transparent;
    color: var(--color-brand-primary-dark-1);
    cursor: pointer;
    font-weight: var(--font-weight-medium);
    padding: var(--spacing-small) var(--spacing-xsmall);
    text-decoration: none;
    will-change: border-bottom-color color;

    &.primary {
      color: var(--color-brand-primary-dark-1);

      &:hover,
      &:focus,
      &:active {
        color: var(--color-brand-primary-light-1);
        border-bottom-color: var(--color-brand-primary-light-1);
      }
    }

    &.secondary {
      color: var(--color-brand-secondary-dark-1);

      &:hover,
      &:focus,
      &:active {
        color: var(--color-brand-secondary-light-1);
        border-bottom-color: var(--color-brand-secondary-light-1);
      }
    }

    &:hover,
    &:focus,
    &:active {
      transition-duration: var(--transition-duration);
    }
  `,
};

export default Styles;
