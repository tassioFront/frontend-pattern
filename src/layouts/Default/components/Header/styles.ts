import Header from '@/components/Header/Header';
import { media } from '@/styles/media';
import styled from 'styled-components';

const Styles = {
  Header: styled(Header)`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: var(--spacing-xsmall) var(--spacing-small);

    ${media.greaterThan('mobileMax')`
      padding: var(--spacing-xxlarge) var(--spacing-medium);
    `}
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
