#!/usr/bin/env node

/**
 * This file is used to execute the CLI for react-prime. It creates a /primessr directory
 * in the user's project that contains five files:
 * 1. index.js
 * 2. server.js
 * 3. returnHTML.js
 * 4. primeCompare.html, and
 * 5. primeServer.js
 */

const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');

const cliQuestions = require('./cliQuestions.js');
const createHTMLScript = require('../lib/returnHTML.js');
const createIndexScript = require('../lib/index.js');
const createServerScript = require('../lib/server.js');
const createCompareScript = require('../lib/performanceTest/createCompareHTML.js');
const createPrimeServer = require('../lib/performanceTest/createPrimeServer.js');
const createConfigScript = require('../lib/performanceTest/createConfig.js');

// chalk adds color and weight ton cli fonts
console.log((chalk.rgb(46, 255, 0).bgBlack.bold(figlet.textSync('React Prime', {
  // chalk is setting the color etc. of large text and background, figlet is making the large text
  font: 'Big',
  horizontalLayout: 'default',
  verticalLayout: 'default',
}))));

inquirer.prompt(cliQuestions).then((answers) => {
  // check is ssr folder exists if not create one
  if (!fs.existsSync('./primessr')) {
    fs.mkdirSync('./primessr');
    fs.mkdirSync('./primessr/performanceTest');
    fs.mkdirSync('./primessr/performanceTest/reports');
  }

  fs.readFile('package.json', 'utf8', (error, result) => {
    if (error) throw error;

    const tempObj = Object.assign({}, JSON.parse(result));
    tempObj.scripts['prime:compare'] = `npm run ${answers.startScript} & npm run prime:server & node ./primessr/performanceTest/primeServer.js`;
    tempObj.scripts['prime:server'] = 'NODE_ENV=production node ./primessr/index.js';
    tempObj.scripts['prime:CSRreport'] = `lighthouse --config-path=./primessr/performanceTest/custom-config.js --output html --output-path ./primessr/performanceTest/reports/csr-report.html http://localhost:${answers.port}`;
    tempObj.scripts['prime:SSRreport'] = 'lighthouse --config-path=./primessr/performanceTest/custom-config.js --output html --output-path ./primessr/performanceTest/reports/ssr-report.html http://localhost:8080';
    fs.writeFileSync('package.json', JSON.stringify(tempObj, null, 2));
  });

  fs.writeFileSync('./primessr/performanceTest/primeCompare.html', createCompareScript(answers));
  fs.writeFileSync('./primessr/performanceTest/primeServer.js', createPrimeServer());
  fs.writeFileSync('./primessr/performanceTest/custom-config.js', createConfigScript());
  fs.writeFileSync('./primessr/index.js', createIndexScript());
  fs.writeFileSync('./primessr/server.js', createServerScript(answers));
  fs.writeFileSync('./primessr/returnHTML.js', createHTMLScript(answers));

  console.log(chalk.blue('\n---------------Completed---------------\n'));
  console.log(chalk.blue('Run "npm run prime:compare" to see a comparison of your website'));
  console.log(chalk.blue('Or, run "npm run prime:server" to see an SSR version of your app\n\n'));
});
