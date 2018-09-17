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
    type: 'checkbox',  //creates a list of items that can be toggled on or off
    message: 'What features would you like to add to your project? (select multiple)',
    name: 'features',
    choices: [
      new inquirer.Separator('Toggle features on or off (stretch stuff)'),
      {
        name: 'Add service worker children',
      },
      {
        name: 'Add indexDb caching',
      },
      {
        name: 'Code splitting with React Router',
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
    type: 'list',  //creates a selectable list of answers that is selectable with the arrow keys
    message: 'What functionality would you like to add to your project? (select one)',
    name: 'mainFunctionalitySelector',
    choices: [
      {
        name: 'Server-side rendering only',
      },
      {
        name: 'Service worker caching for offline functionality',
      },
      {
        name: 'Server-side rendering with service worker caching for offline functionality',
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