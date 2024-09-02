import { execSync } from 'child_process';
import { Octokit } from '@octokit/rest';
import fs from 'fs';
import path from 'path';

/* requirements
 * 0. Install Node.js
 * 1. Install @octokit/rest package as DevDependencies (npm install @octokit/rest --save-dev)
 * 2. Create a GitHub token with repo access and store it in GITHUB_TOKEN
 * 3. Set REPO_URL, COMBINED_BRANCH, MAIN_BRANCH, REPO_OWNER, REPO_NAME
 * 4. Run the script with node scripts/merge-dependabot.prs.mjs
 */

// Constants (update it according to your needs)
const REPO_URL = 'https://github.com/tassioFront/frontend-pattern.git';
const COMBINED_BRANCH = 'ci/combined-dependabot-updates';
const MAIN_BRANCH = 'main';
const GITHUB_TOKEN = 'YOUR_TOKEN';
const REPO_OWNER = 'tassioFront';
const REPO_NAME = 'frontend-pattern';
// Constants (update it according to your needs)

const colors = {
  reset: '\x1b[0m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// Fetch open Dependabot pull requests
async function getDependabotPRs() {
  console.log(
    `${colors.blue}Fetching open Dependabot pull requests...${colors.reset}`
  );
  const { data: pullRequests } = await octokit.pulls.list({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    state: 'open',
  });

  const dependabotPRs = pullRequests.filter(
    (pr) => pr.user.login === 'dependabot[bot]'
  );
  console.log(
    `${colors.green}Found ${dependabotPRs.length} Dependabot pull requests. 🤖 ${colors.reset}`
  );
  return dependabotPRs;
}

// Extract dependency updates from the pull requests (presents in package.json)
async function extractDependencies(prs) {
  console.log(
    `${colors.blue}Extracting dependencies from Dependabot pull requests...${colors.reset}`
  );
  const dependencies = {};

  const filePromises = prs.map((pr) =>
    octokit.pulls.listFiles({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      pull_number: pr.number,
    })
  );

  const filesArray = await Promise.all(filePromises);

  filesArray.flat().forEach(({ data: files }) => {
    files
      .filter((file) => file.filename === 'package.json')
      .forEach((file) => {
        const lines = file.patch.split('\n');
        lines.forEach((line) => {
          const match = line.match(/^\+\s+"([^"]+)":\s+"([^"]+)",?$/);
          if (match) {
            const [_, name, version] = match;
            dependencies[name] = version;
          }
        });
      });
  });

  console.log(
    `${colors.green}Dependencies extracted successfully.${colors.reset}`
  );
  return dependencies;
}

// Update package.json with new dependencies
function updatePackageJson(dependencies) {
  console.log(
    `${colors.blue}Updating package.json with new dependencies...${colors.reset}`
  );
  const packageJsonPath = path.resolve('package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  for (const [name, version] of Object.entries(dependencies)) {
    console.log(
      `${colors.yellow}Updating ${name} to ${version}${colors.reset}`
    );
    if (packageJson.dependencies && packageJson.dependencies[name]) {
      packageJson.dependencies[name] = version;
    } else if (
      packageJson.devDependencies &&
      packageJson.devDependencies[name]
    ) {
      packageJson.devDependencies[name] = version;
    }
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log(
    `${colors.green}package.json updated successfully.${colors.reset}`
  );
}

async function main() {
  console.log(`${colors.blue}Starting the process...${colors.reset}`);
  const repoName = path.basename(REPO_URL, '.git');
  const dependabotPRs = await getDependabotPRs();
  const dependencies = await extractDependencies(dependabotPRs);
  updatePackageJson(dependencies);
  console.log(`${colors.blue}Installing new dependencies...${colors.reset}`);
  execSync('yarn install');
  console.log(
    `${colors.blue}Creating new branch ${COMBINED_BRANCH}...${colors.reset}`
  );
  execSync(`git checkout -b ${COMBINED_BRANCH}`);

  /*
   * Uncomment if you want to commit, push changes and create the pull request automatically
   */

  // console.log(`${colors.blue}Committing and pushing changes...${colors.reset}`);
  // execSync('git add package.json yarn.lock');
  // execSync('git commit -m "Update dependencies from Dependabot PRs"');
  // execSync(`git push origin ${COMBINED_BRANCH}`);

  // Create pull request
  // console.log(`${colors.blue}Creating pull request...${colors.reset}`);
  // const { data: pr } = await octokit.pulls.create({
  //   owner: REPO_OWNER,
  //   repo: repoName,
  //   title: 'Combined Dependabot Updates',
  //   head: COMBINED_BRANCH,
  //   base: MAIN_BRANCH,
  //   body: 'This pull request combines all Dependabot updates for this month.',
  // });

  // console.log(`${colors.green}Pull request created: ${pr.html_url}${colors.reset}`);
}

main().catch((error) => {
  if (error.message.includes('@octokit/rest')) {
    console.error(
      `${colors.red}Please install @octokit/rest package as DevDependencies.${colors.reset}`
    );
    process.exit;
  }
  console.error(`${colors.red}${error}${colors.reset}`);
  process.exit(1);
});
