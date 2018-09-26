#!/usr/bin/env node

const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');

const cliQuestions = require('./cliQuestions.js');
const getServerScript = require('../lib/serverScript.js');
const getWebpackScript = require('../lib/webpackScript.js');
const createCompareHtml = require('../lib/createHtml.js');

// chalk adds color and weight ton cli fonts
console.log(chalk.rgb(46, 255, 0).bgBlack.bold(figlet.textSync('React Prime', {
  // chalk is setting the color etc. of large text and background, figlet is making the large text
  font: 'Big',
  horizontalLayout: 'default',
  verticalLayout: 'default',
})));

inquirer.prompt(cliQuestions).then((answers) => {
  // removes whitespace of the answer
  const projectName = answers.projectName.trim();

  // appends json to the name of project that the user specified
  const fileName = `${projectName}.json`;

  //check is ssr folder exists if not create one
  if (!fs.existsSync('./primessr')) {
    fs.mkdirSync('./primessr');
  }

  fs.writeFileSync('./primessr/primeServer.js', getServerScript(answers));
  fs.writeFileSync('./primessr/primeWebpack.js', getWebpackScript());

  fs.readFile(answers.parseJson, 'utf8', (error, result) => {
    if (error) throw error;

    const tempObj = Object.assign({}, JSON.parse(result));

    tempObj.scripts['prime:build'] = 'webpack --config primeWebpack.js --watch';
    tempObj.scripts['prime:start'] = `nodemon build/primeBundle.js`;

    fs.writeFileSync('package.json', JSON.stringify(tempObj, null, 2));
    // shell.exec('npm run prime:build');
    // shell.exec('npm run prime:start');
  });

  if (answers.choiceInstall === 'Server-side rendering only') {
    console.log('Starting server...');
    // startServer();
  } else if (answers.choiceInstall === 'Service worker caching for offline functionality') {
    console.log('Installing Service Worker...');
    // installWorker();
  } else {
    console.log('Starting server and installing Service Worker');
    // installWorker();
    // startServer();
  }

  // if (answers.htmlTest === yes)
});
