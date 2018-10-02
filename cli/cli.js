#!/usr/bin/env node

const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
const httpserver = require('http-server')
const shell = require('shelljs');

const cliQuestions = require('./cliQuestions.js');
const createCompareScript = require('../lib/performanceTest/createCompareHTML.js');
const createHTMLScript = require('../lib/returnHTML.js');
const createIndexScript = require('../lib/index.js');
const createServerScript = require('../lib/server.js');
const createPrimeServer = require('../lib/performanceTest/createPrimeServer.js');


// chalk adds color and weight ton cli fonts
console.log(chalk.rgb(46, 255, 0).bgBlack.bold(figlet.textSync('React Prime', {
  // chalk is setting the color etc. of large text and background, figlet is making the large text
  font: 'Big',
  horizontalLayout: 'default',
  verticalLayout: 'default',
})));

inquirer.prompt(cliQuestions).then((answers) => {
  // check is ssr folder exists if not create one
  if (!fs.existsSync('./primessr')) {
    fs.mkdirSync('./primessr');
    fs.mkdirSync('./primessr/performanceTest');
    fs.mkdirSync('./primessr/performanceTest/reports');
  }

  fs.writeFileSync('./primessr/performanceTest/primeCompare.html', createCompareScript(answers));
  fs.writeFileSync('./primessr/performanceTest/primeServer.js', createPrimeServer());
  fs.writeFileSync('./primessr/index.js', createIndexScript());
  fs.writeFileSync('./primessr/server.js', createServerScript(answers));
  fs.writeFileSync('./primessr/returnHTML.js', createHTMLScript(answers));
  
  fs.readFile('package.json', 'utf8', (error, result) => {
    if (error) throw error;

    const tempObj = Object.assign({}, JSON.parse(result));
    tempObj.scripts['prime:compare'] = `npm run ${answers.startScript} & npm run prime:server & node ./primessr/performanceTest/primeServer.js`;
    tempObj.scripts['prime:server'] = 'NODE_ENV=production node ./primessr/index.js';
    tempObj.scripts['prime:webpack'] = 'webpack --config primeWebpack.config.js';
    fs.writeFileSync('package.json', JSON.stringify(tempObj, null, 2));
  });

  console.log(chalk.rgb(0, 127, 255)(`\n---------------Completed---------------\n`));
  console.log(chalk.rgb(0, 127, 255)(`Run 'npm run prime:compare' to see a comparison of your website`));
  console.log(chalk.rgb(0, 127, 255)(`Or, run 'npm run prime:server' to see an SSR version of your app\n\n`));
});