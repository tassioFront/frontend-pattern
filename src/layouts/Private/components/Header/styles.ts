import { lazy } from 'react';
import { media } from '@/styles/media';
import styled from 'styled-components';
const Header = lazy(async () => await import('@/components/Header/Header'));

const Styles = {
  Header: styled(Header)`
    align-items: center;
    display: flex;
    background-color: var(--color-neutral-dark-1);
    justify-content: space-between;
    padding: var(--spacing-xsmall) var(--spacing-small);

    ${media.greaterThan('mobileMax')`
      padding: var(--spacing-xxlarge) var(--spacing-medium);
    `}

    p {
      text-align: end;
    }
  `,
  Nav: styled.nav`
    display: flex;
    justify-content: center;
    gap: var(--spacing-xsmall);

    ${media.greaterThan('mobileMax')`
      gap: var(--spacing-small);
    `}
  `,
};

export default Styles;
