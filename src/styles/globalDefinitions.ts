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
    font: var(--title-headline-xlarge);
    letter-spacing: var(--title-headline-xlarge-letter);
    margin: var(--spacing-small);
  }

  h2 {
    font: var(--title-headline-medium);
    letter-spacing: var(--title-headline-medium-letter);
    margin: var(--spacing-xsmall);
  }

  h3 {
    font: var(--title-headline-small);
    letter-spacing: var(--title-headline-small-letter);
    margin: var(--spacing-xsmall);
  }

  p {
    font: var(--text-body-medium);
    letter-spacing: var(--text-body-medium-letter);
    margin-top: var(--spacing-xxsmall);
    margin-bottom: var(--spacing-xxsmall);

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
`;
