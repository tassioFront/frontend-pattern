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
    }

    .grecaptcha-badge {
        visibility: hidden;
    }

    li {
        list-style-type: none;
    }

    img {
        border: 0;
        height: auto;
        max-width: 100%;
    }
`;
