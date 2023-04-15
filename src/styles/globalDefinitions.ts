import { defaultLinkStyles } from '@/components/BtnLink/styles';
import screenSizes from './screenSizes';

export const globalDefinitions = `
  #root, main {
    width: 100%;
  }

  main {
    max-width: ${screenSizes.desktopMax};
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: auto;
  }

  h1 {
    font: var(--title-headline-xxlarge);
    letter-spacing: var(--title-headline-xxlarge-letter);
    margin: var(--spacing-small);
  }

  h2 {
    font: var(--title-headline-large);
    letter-spacing: var(--title-headline-large-letter);
    margin: var(--spacing-xsmall);
  }

  h3 {
    font: var(--title-headline-medium);
    letter-spacing: var(--title-headline-medium-letter);
    margin: var(--spacing-xsmall);
  }

  h4 {
    font: var(--title-headline-xsmall);
    letter-spacing: var(--title-headline-xsmall-letter);
    margin: var(--spacing-xxsmall);
  }

  p {
    font: var(--text-body-medium);
    letter-spacing: var(--text-body-medium-letter);
    margin-top: var(--spacing-xsmall);
    margin-bottom: var(--spacing-xsmall);

    @media (min-width: ${screenSizes.tablet}) {
      margin-top: var(--spacing-small);
      margin-bottom: var(--spacing-small);
    }
  }

  strong {
    margin: var(--spacing-xxsmall);
  }
  
  em {
    font-weight: var(--font-weight-medium);
    font-style: normal;
  }

  a {
    ${defaultLinkStyles}
  }
`;
