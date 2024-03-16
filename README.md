# Intro

This web system has been created to explore React functionalities and frontend patterns. Here you also find content about my journey as Developer, besides nice articles.

I hope you enjoy it and learn something new. 

[Access the online version here](https://frontend-pattern.vercel.app) or go to [my articles](https://frontend-pattern.vercel.app/articles) directly.

# Main Stack

- [React](https://react.dev/)
- [Vite]([https://react.dev/](https://vitejs.dev/guide/why.html))
- [Typescript](https://www.typescriptlang.org/)

# Requirements to run locally

To run the project locally, follow these steps:

1. Clone the project repository from GitHub.
2. Create a [Personal Access Token (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#personal-access-tokens-classic) on GitHib.
3. Create a .npmrc file in the root directory of the project.
4. Add the following line to the .npmrc file and replace '`YOUR_PAT_TOKEN` for the `PAT` you have created':
```bash
     //npm.pkg.github.com/:_authToken=YOUR_PAT_TOKEN
    @open-ish:registry=https://npm.pkg.github.com

    engine-strict = true
```
5. Install the required dependencies by running the command: yarn install

The project should now be able to run locally.

# Available Scripts

In the project directory, you can run:

- `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `yarn test`

- `yarn preview` (simulate a server by Vite)

- `yarn build`

# About author

Hi, I'm Tássio Jordão (TJ), a Chemical with Front-End experience. Actually, I'm a Frontend developer with some Chemistry knowledge. [See more here](https://frontend-pattern.vercel.app/about)
