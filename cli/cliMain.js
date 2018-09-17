const inquirer = require('inquirer');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
const cliQuestions = require('./cliQuestions.js');

const answersList = [];


// inquirer.registerPrompt('checkbox-plus', require('inquirer-checkbox-plus-prompt')); // regiesters checkboxPlus plugin allowing pretty drop down menus

// console.log(figlet.fontsSync()); // gives list of available fonts

// chalk adds color and weight ton cli fonts
console.log(chalk.rgb(46, 255, 0).bgBlack.bold(figlet.textSync('React First', {
  // chalk is setting the color etc. of large text and background, figlet is making the large text
  font: 'Big',
  horizontalLayout: 'default',
  verticalLayout: 'default',
})));

inquirer.prompt(cliQuestions.getProjectInfo).then((answers) => {
  // removes whitespace of the answer
  answers.projectName = answers.projectName.trim();

  // appends json to the name of project that the user specified
  const fileName = `${answers.projectName}.json`;

  answersList.push(answers);
  // console.log(answers);

  if (answers.testFileSave === 'YES') {
    // writes the file to disk if answer is yes+
    fs.writeFile(fileName, JSON.stringify(answersList[0], '', 2), 'utf8', (err) => {
      if (err) throw err;
      console.log('File Saved!');
    });
  }
});
