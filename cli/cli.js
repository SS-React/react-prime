#!/usr/bin/env node

const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
const httpserver = require('http-server');
const shell = require('shelljs');

const cliQuestions = require('./cliQuestions.js');
const createCompareScript = require('../lib/createCompareHTML.js');
const createReduxHTMLScript = require('../lib/returnReduxHTML.js');
const createHTMLScript = require('../lib/returnHTML.js');
const createIndexScript = require('../lib/index.js');
const createServerScript = require('../lib/server.js');
const createPrimeServer = require('../lib/createPrimeServer.js');




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
  }

  // fs.writeFileSync('./primessr/primeServer.js', getServerScript(answers));
  // fs.writeFileSync('./primessr/primeWebpack.js', getWebpackScript());
  fs.writeFileSync('./primessr/primeCompare.html', createCompareScript());
  fs.writeFileSync('./primessr/index.js', createIndexScript());
  fs.writeFileSync('./primessr/server.js', createServerScript(answers));
  fs.writeFileSync('./primessr/primeServer.js', createPrimeServer());
  fs.readFile('primeLogo.png', (err, data) => {
  fs.writeFile(`./primessr/${answers.static}`, data, 'binary', (err) => {
      if (err) {
        console.log('image did not load')
      } else {
        console.log('image loaded')
      }
    });
  });
  
  if (answers.hasRedux === 'Yes') {
    fs.writeFileSync('./primessr/returnReduxHTML.js', createReduxHTMLScript(answers));
  } else {
    fs.writeFileSync('./primessr/returnHTML.js', createHTMLScript(answers));
  }


  fs.readFile('package.json', 'utf8', (error, result) => {
    if (error) throw error;


    const tempObj = Object.assign({}, JSON.parse(result));
    tempObj.scripts['prime:compare'] = `npm run ${answers.startScript} & npm run prime:server & node ./primessr/primeServer.js`;
    tempObj.scripts['prime:server'] = 'NODE_ENV=production node ./primessr/index.js';

    // tempObj.scripts['prime:build'] = 'webpack --config primeWebpack.js --mode production';
    // tempObj.scripts['prime:start'] = 'node build/primeBundle.js';
    fs.writeFileSync('package.json', JSON.stringify(tempObj, null, 2));
    // shell.exec('npm run prime:build');
    // shell.exec('npm run prime:start');
  });

  if (answers.choiceInstall === 'Server-side rendering only') {
    // console.log('Starting server...');
    // startServer();
  } else if (answers.choiceInstall === 'Service worker caching for offline functionality') {
    // console.log('Installing Service Worker...');
    // installWorker();
  } else {
    // console.log('Starting server and installing Service Worker');
    // installWorker();
    // startServer();
  }

  // if (answers.htmlTest === yes)
});
