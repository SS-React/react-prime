const inquirer = require('inquirer');

const cliQuestions = {};

cliQuestions.getProjectInfo = [
  {
    type: 'input', // type designates what type of prompt the user sees, creates a prompt that takes text as an answer
    name: 'projectName', // name is the property the answer to this prompt is saved as
    message: 'Input your project name', // message is what the user sees on screen
    validate(answer) {
      // if a user typed nothing or only spaces, make the user type again
      if (answer.length === 0 || answer.trim().length === 0) {
        return 'You must type your project name';
      }
      return true;
    },
  },
  {
    type: 'checkbox', // creates a list of items that can be toggled on or off
    message: 'What features would you like added to your project?',
    name: 'features',
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
        return 'You must make a selection';
      }
      return true;
    },
  },
  {
    type: 'list', // creates a selectable list of answers that is selectable with the arrow keys
    message: 'What functionality would you like to add to your project?',
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
    message: 'Would you like to save the test file?',
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
