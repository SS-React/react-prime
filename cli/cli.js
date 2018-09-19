#!/usr/bin/env node

const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
const shell = require('shelljs');
const cliQuestions = require('./cliQuestions.js');
const getServerScript = require('../lib/serverScript.js');
const getWebpackScript = require('../lib/webpackScript.js');

// chalk adds color and weight ton cli fonts
console.log(chalk.rgb(46, 255, 0).bgBlack.bold(figlet.textSync('React First', {
  // chalk is setting the color etc. of large text and background, figlet is making the large text
  font: 'Big',
  horizontalLayout: 'default',
  verticalLayout: 'default',
})));

inquirer.prompt(cliQuestions).then((answers) => {
  // removes whitespace of the answer
  answers.projectName = answers.projectName.trim();

  // appends json to the name of project that the user specified
  const fileName = `${answers.projectName}.json`;
  fs.writeFileSync('primeServer.js', getServerScript(answers));
  fs.writeFileSync('primeWebpack.js', getWebpackScript());
  fs.readFile('package.json', 'utf8', (error, result) => {
    if (error) throw error;
    const tempObj = Object.assign({}, JSON.parse(result));
    tempObj.scripts['prime:build'] = 'webpack --config primeWebpack.js --watch';
    tempObj.scripts['prime:start'] = `nodemon primeServer.js`;
    fs.writeFileSync('package.json', JSON.stringify(tempObj, null, 2));
    shell.exec('npm run prime:start');
  });

  // if (answers.testFileSave === 'YES') {
  //   // writes the file to disk if answer is yes+
  //   fs.writeFile(fileName, JSON.stringify(answers, '', 2), 'utf8', (err) => {
  //     if (err) throw err;
  //     console.log('File Saved!');
  //   });
  // }
});
