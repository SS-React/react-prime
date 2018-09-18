const inquirer = require('inquirer');
const chalk = require('chalk');
const glob = require('glob');
const cliFileMethods = require('./cliFileMethods.js');

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const fileDir = glob.sync('**/*.js', { ignore: 'node_modules/**' });

const cliQuestions = [
  {
    type: 'input', // type designates what type of prompt the user sees, creates a prompt that takes text as an answer
    name: 'projectName', // name is the property the answer to this prompt is saved as
    message: chalk.red('Input your project name'), // message is what the user sees on screen
  },
  {
    type: 'autocomplete',
    name: 'entryPoint',
    suggestOnly: true,
    message: chalk.red('Where is your entry point?'),
    source: cliFileMethods.searchFiles,
    validate(answer) {
      if (!fileDir.includes(answer)) {
        return 'Invalid entry point';
      }
      return true;
    },
  },
  {
    type: 'checkbox', // creates a list of items that can be toggled on or off
    name: 'features',
    message: 'What features would you like added to your project?',
    choices: [
      new inquirer.Separator('Toggle features on or off(stretch stuff)'),
      {
        name: 'Add Service Worker Children',
      },
      {
        name: 'Add indexDb caching',
      },
      {
        name: 'CodeSplitting with React Router',
      },
    ],
    validate(answer) {
      // checking to see if the user selected a drop down menu
      if (answer.length === 0) {
        return 'You must make a selection.';
      }
      return true;
    },
  },
  {
    type: 'list', // creates a selectable list of answers that is selectable with the arrow keys
    message: chalk.red('What functionality would you like to add to your project?'),
    name: 'mainFunctionalitySelector',
    choices: [
      {
        name: 'Serverside rendering with ServiceWorker Caching for offline functionality',
      },
      {
        name: 'Serverside rendering only',
      },
      {
        name: 'ServiceWorker caching for offline functionality',
      },
    ],
  },
  {
    type: 'list',
    message: chalk.red('Would you like to save the test file?'),
    name: 'testFileSave',
    choices: [
      {
        name: 'YES',
      },
      {
        name: 'NO',
      },
    ],
  },
];

module.exports = cliQuestions;
