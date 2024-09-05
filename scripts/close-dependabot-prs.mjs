import { Octokit } from '@octokit/rest';
import readline from 'readline';

/* requirements
 * 0. Install Node.js
 * 1. Install @octokit/rest package as DevDependencies (npm install @octokit/rest --save-dev)
 * 2. Create a GitHub token with repo access and store it in GITHUB_TOKEN
 * 3. Set REPO_URL, REPO_OWNER, REPO_NAME
 * 4. Run the script with node scripts/close-dependabot-prs.mjs
 */

// Constants (update it according to your needs)
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
  dependabotPRs.forEach((pr) => {
    console.log(`${colors.yellow}${pr.title}${colors.reset}`);
  });
  return dependabotPRs;
}

// Close Dependabot pull requests
async function closeDependabotPRs(prs) {
  console.log(
    `${colors.blue}Closing Dependabot pull requests...${colors.reset}`
  );

  for (const pr of prs) {
    await octokit.pulls.update({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      pull_number: pr.number,
      state: 'closed',
    });
    console.log(
      `${colors.yellow}Closed PR #${pr.number}: ${pr.title}${colors.reset}`
    );
  }

  console.log(
    `${colors.green}All Dependabot pull requests have been closed.${colors.reset}`
  );
}

// Prompt user for confirmation
function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y');
    });
  });
}

async function main() {
  console.log(`${colors.blue}Starting the process...${colors.reset}`);
  const dependabotPRs = await getDependabotPRs();

  if (dependabotPRs.length === 0) {
    console.log(
      `${colors.green}No open Dependabot pull requests found.${colors.reset}`
    );
    return;
  }

  const confirm = await promptUser(
    `${colors.blue}Do you want to close all open Dependabot pull requests? (yes/no): ${colors.reset}`
  );
  if (confirm) {
    await closeDependabotPRs(dependabotPRs);
  } else {
    console.log(
      `${colors.blue}Operation cancelled by the user.${colors.reset}`
    );
  }
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
