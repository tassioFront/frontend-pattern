export const reset = `
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        scroll-behavior: smooth;
        text-rendering: optimizelegibility;
        text-size-adjust: 100%;
        background-color: black;
        color: white;
    }

    body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
    }


    input.hide-clear[type=search]::-ms-clear,
    input.hide-clear[type=search]::-ms-reveal {
        display: none;
        height: 0;
        width: 0;
    }

    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
     -webkit-appearance:none;
    }

    input {
     -webkit-background-clip: text !important;
    }

    button {
      text-decoration: none;
      background-color: transparent;
      border: 1px solid transparent;
      cursor: pointer;
    }

    .grecaptcha-badge {
        visibility: hidden;
    }

    li {
        list-style-type: none;
    }

    img {
        border: 0;
        max-width: 100%;
    }

    a {
        all: unset;
        cursor: pointer;
    }   

    hr {
        width: 100%;
        opacity: 0.15;
    }

    /* Firefox */
    * {
      scrollbar-width: thin;
      scrollbar-color: var(--color-neutral-light-2) var(--color-neutral-dark-1);
    }

    /* Chrome, Edge and Safari */
    *::-webkit-scrollbar {
      height: var(--spacing-xsmall);
      width: var(--spacing-xsmall);
    }
    *::-webkit-scrollbar-track {
      border-radius: var(--spacing-xxsmall);
      background-color: var(--color-neutral-dark-1);
    }

    *::-webkit-scrollbar-track:hover {
      background-color: var(--color-neutral-dark-1);
    }

    *::-webkit-scrollbar-track:active {
      background-color: var(--color-neutral-dark-1);
    }

    *::-webkit-scrollbar-thumb {
      border-radius: var(--spacing-xsmall);
      background-color: var(--color-neutral-light-2);
    }

    *::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-neutral-light-2);
    }

    *::-webkit-scrollbar-thumb:active {
      background-color: var(--color-neutral-light-3);
    }
`;
