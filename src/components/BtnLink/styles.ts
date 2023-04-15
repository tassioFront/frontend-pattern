import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const defaultLinkStyles = `
border-bottom: 1px solid transparent;
cursor: pointer;
font-weight: var(--font-weight-medium);
text-align: center;
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
`;
const Styles = {
  Link: styled(Link)`
    ${defaultLinkStyles}
    align-items: center;
    border-bottom: 1px solid transparent;
    display: flex;
    gap: var(--spacing-xxsmall);
    font-weight: var(--font-weight-medium);
    padding: var(--spacing-small) var(--spacing-xsmall);
    text-decoration: none;
    will-change: border-bottom-color color;
  `,
};

export default Styles;
