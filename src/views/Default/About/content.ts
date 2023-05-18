import { Techs } from '@/enums/techs';

interface IChallenges {
  title: string;
  desc: string[];
  tags?: string[];
}
export interface IContent {
  techs: string[];
  challenges: IChallenges[];
}
const linkBtnFromString = (text: string, link: string): string =>
  `<a href="${link}" class="secondary">${text}</a>`;
const highlighText = (text: string): string => `<b>${text}</b>`;

export const techs: IContent['techs'] = [
  Techs.HTML,
  Techs.CSS,
  Techs.JS,
  Techs.TS,
  Techs.Vue,
  Techs.Nuxt,
  Techs.React,
  Techs.RA,
  Techs.Sass,
  Techs.Vuetify,
  Techs.Jest,
  Techs.Nx,
  Techs.AD,
  Techs.GHA,
  Techs.AS,
  Techs.SA,
  Techs.SWA,
  Techs.Amplify,
  Techs.Sentry,
  Techs.SC,
  Techs.Akamai,
];

export const challenges: IContent['challenges'] = [
  {
    title: 'Becoming a Developer',
    desc: [
      `In 2018, I was working with Sensory analysis (at the time, I was a chemical), 
    doing manual and repeated things mainly in Excel. I wasn't happy with that, 
    so ${highlighText('I decided to study ways to do my job automatically')}. 
    Proactively, I found online VBA courses and started doing macros. 
    That was a game-changer in my professional life. 
    I also started studying FrontEnd stuff (HMTL, JS, CSS, and Vue) and using it - even if it wasn't in my job description at that time.`,
    ],
    tags: [Techs.HTML, Techs.CSS, Techs.JS, Techs.Vue],
  },
  {
    title: 'First job - Recipe website',
    desc: [
      `In Jun 2019, I got my first opportunity as a FrontEnd Developer ${linkBtnFromString(
        'at this recipe website',
        'https://cybercook.com.br/'
      )}, which was an amazing achievement for me. No experience and no college, just what I have learned online. ${highlighText(
        'My challenge was to face a real system and work with other developers, besides was my first experience in a Startup'
      )}.`,
      `Even with all those new things, I got my place at the company and became the main Vue Developer fastly.`,
    ],
    tags: [
      Techs.HTML,
      Techs.CSS,
      Techs.JS,
      Techs.Vue,
      Techs.Sass,
      Techs.Vuetify,
    ],
  },
  {
    title: 'Second (and current) job - B2B Marketplace',
    desc: [
      `In Mar 2020, I got my second (and current) opportunity as a FrontEnd Developer (${linkBtnFromString(
        'At Juntos Somos Mais',
        'https://loja.juntossomosmais.com.br/'
      )} - or just JSM). At that moment, my challenge was to get into a more stable company with a legacy project created by a third-party company. Let's split it to explain:`,
      `1st: Before I got in, the JSM contracted a third-party company to create the project (which is a B2B marketplace);`,
      `2nd: The third-party company didn't have a cultural fit with JSM and the project wasn't created using their principles and beliefs. As result, we had a legacy 6 months project - a lot of bugs and a lot of people without the JSM's culture.`,

      `So, when I got here, ${highlighText(
        "my challenge wasn't just coding, as a junior JSM developer I also needed to bring the JSM's culture inside the project"
      )}.`,

      `Nowadays, we have a project ${highlighText(
        '5x times bigger and with a great culture and focus on quality'
      )}.`,
    ],
    tags: [Techs.Vue, Techs.TS, Techs.React, Techs.Sentry, Techs.RA],
  },
  {
    title: 'TypeScript and Unit tests',
    desc: [
      `When I got here, I had 3 big code challenges:`,
      `- The code itself (a complex business logic in a not consistent and stable code);`,
      `- Unit test;`,
      `- Typescript`,
      `Can you imagine working on a legacy project with bad typescript and Jest configurations? And more: small experience as a developer, either no experience with Typescript or with jest. What a challenge, doesn't it?`,
      `${highlighText(
        'I faced the challenge of seeing an infinite error log terminal (ts errors) and a project with zero coverage although had jest'
      )}.`,
      `To face it and keep delivering, we decide to use the step-by-step strategy: we configured the husky and lint to complain of changed files, forcing the developers to change those files. We created a CI/CD at Azure to make people were creating tests and adding stuff that would not crash the build.`,
      `The exciting point: nowadays, I'm a reference for Typescript and Unit tests in my Job.`,
      `Fun fact: I told the interviewer I didn't know how to test during the interview (and that was true, I was honest).`,
    ],
    tags: [Techs.TS, Techs.Jest],
  },
  {
    title: 'Migration to a cross-team',
    desc: [
      `After 2 years of creating new features and solving bugs (at JSM), I decided to get another challenge: work in a cross-team (ProductOps) to explore more (learn) things about systems issues:`,
      `- Frontend architecture;`,
      `- Infrastructure;`,
      `- DevOps`,
      `${highlighText(
        'My goal was to become a more independent developer and explore issues that (usually) FrontEnd developers do not take care of'
      )}. And also, to get next to people with years and years of experience. It was totally outside my comfort zone, I got happy the team accepted giving me this amazing opportunity,`,
    ],
    tags: [
      Techs.AD,
      Techs.AS,
      Techs.SWA,
      Techs.Amplify,
      Techs.GHA,
      Techs.Sentry,
      Techs.SC,
    ],
  },
  {
    title: 'Migration to monorepo: getting in touch with Nx',
    desc: [
      `Once I got in the ProductOps team my first challenge was to investigate our structure. In that time, we had a normal repository using Vue CLI and our team was growing up.`,
      `My responsibility was to bring ideas to face this new challenge in our team. A lot of things started becoming topics in our meetings: polyrepo, monorepo, micro FrontEnd, and so on.`,
      `After I have done POCs, we decide to move to monorepo and implement Nx in our project. ${highlighText(
        'The challenge was mine: I needed to change the engine of a plane in flying (no breaks, no impacts on product teams)'
      )}.`,
      `I'm glad to say it was a successful implementation and now Nx makes part of ecosystem. It makes me proud because I have done without impact the product teams, so we keep delivering business stuff while I was changing the whole project structure.`,
      `It's possible to see our reasons in ${linkBtnFromString(
        'this report created by me',
        'https://github.com/open-ish/studying-nx#studyingnx-real-case'
      )}.`,
    ],
    tags: [Techs.Nx],
  },
  {
    title: 'Facing server rewriting: SSG and SPA together?',
    desc: [
      `Another nice challenge I have faced was configuring a server to work with distinct build systems: Single Page Application and Server Static Generation. First, let's explain what happens:`,
      `1st: We have a SPA split in Private routes and Public ones (we only must index Public ones, obviously);`,
      `2nd: We wanted to improve the performance and indexation (SEO) of our Public routes;`,
      `Once said that we had the idea of using Nx to create a new application with Nuxt (which gives us the possibility to use SSG), but not just it... as Nx controls the build for each system, we decided to inject the SPA-built files into the SSG-built structure, what makes our SPA becomes a route inside of the Nuxt (in simple words, a new directory inside of Nuxt (l  et's call it as /app). Great, with this approach we do not need either a new server or a subdomain. It was easy with Nx.`,
      `But the challenge was: ${highlighText(
        'our server and its layers (Akamai, in our case) needed to change their behavior regarding the route accessed by the user'
      )}. So, if the URL does not have /app, the application should behave as SSG, but and if the URL has the /app, the application should behave as a SPA.`,
      `Server, Akamai, and Nx were configured successfully.`,
    ],
    tags: [Techs.AS, Techs.SWA, Techs.Akamai, Techs.SA, Techs.Nuxt, Techs.Vue],
  },
  {
    title: 'CDN and Avaibilitty',
    desc: [
      `Not everybody knows, but front-end applications (mainly SPAs) might have an ${linkBtnFromString(
        'Unexpected token error',
        'https://answers.netlify.com/t/support-guide-why-do-i-see-uncaught-syntaxerror-unexpected-token-errors-how-can-i-use-chunking-or-versioning-for-my-assets-at-netlify/124'
      )}.`,
      `To overcome this challenge, I had to configure our system build to use a CDN created by my teammates. Besides solving latency problems (putting our code on servers worldwide), this CDN also keeps old files available to make users using old versions will not be impacted.`,
      `That was a nice challenge to face, I could explore more webpack configurations.`,
    ],
    tags: [Techs.Akamai, Techs.SA],
  },
  {
    title: 'Migration to Vite',
    desc: [
      `I also faced the challenge of changing the bundler of the B2B JSM project, which was using Webpack 4 + Vue 2 + TypeScript + Nx.`,
      `I'm glad to say ${highlighText(
        'it was another delivery without any impact'
      )} on the product teams, so we kept delivering business stuff while I was changing the whole project building configuration.`,
      `${highlighText('The strategy was (in simple words)')}:`,
      `1. Five tasks to delivering;`,
      `2. Create a reference branch from master (it makes sense on our gitflow) on the first task, let's call it build/add-vite. The idea was to use this branch as base in pull request: coworkers could see exactly what was delivered (step by step).;`,
      `3. Create other branches from build/add-vite (like build/add-ejs-plugin) and open the pull request. The same was done in each task;`,
      `4. Merge the ready build/add-vite branch into an HTTPS environment, and validate;`,
      `5. Go to production and monitoring from Sentry.`,
      `${highlighText('The result:')}`,
      `Webpack 4: ~3min56 in the first run and ~1min17 after changes`,
      `Vite: ~13s (${highlighText(
        '~94,5% faster'
      )}) in the first run and ~1s (${highlighText(
        '~99% faster'
      )}) after changes`,
    ],
    tags: [Techs.Vite],
  },
];
