import { media } from '@/styles/media';
import screenSizes from '@/styles/screenSizes';
import styled from 'styled-components';

const Styles = {
  Footer: styled.footer`
    align-items: center;
    display: flex;
    flex-direction: column;
    max-width: ${screenSizes.desktopMax};
    margin: auto;
    padding: var(--spacing-medium) var(--spacing-base);
    text-align: center;
    width: 100%;

    ${media.greaterThan('tablet')`
      padding: var(--spacing-xxlarge) var(--spacing-medium);
    `}
  `,
  SocialMedia: styled.div`
    align-self: end;
    display: flex;
    font-size: var(--spacing-xlarge);
    padding-bottom: var(--spacing-giant);
    gap: var(--spacing-small);
  `,
};

export default Styles;
