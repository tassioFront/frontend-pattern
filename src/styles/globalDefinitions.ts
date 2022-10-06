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
    font: var(--title-headline-large);
    letter-spacing: var(--title-headline-large-letter);
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
  }

  strong {
    margin: var(--spacing-xxsmall);
  }
`;
