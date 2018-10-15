const inquirer = require('inquirer');
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation')

const {
  cliFileMethods, folderDir, fileList, htmlList,
} = require('./cliFileMethods');

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

const cliQuestions = [
  {
    type: 'autocomplete',
    name: 'static',
    suggestOnly: true,
    message: chalk.rgb(46, 255, 0)('Type the directory containing your bundle:'),
    source: cliFileMethods.searchFolders,
    validate(answer) {
      if (!folderDir.includes(answer)) {
        return chalk.rgb(255, 0, 0).bold('Invalid entry point');
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'startScript',
    message: chalk.rgb(46, 255, 0)('Type in the name of the npm script that starts your server:'),
    validate(answer) {
      if (answer.length === 0) {
        return chalk.rgb(255, 0, 0).bold('Enter a valid name');
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'port',
    message: chalk.rgb(46, 255, 0)('Type in the port number of your client side server:'),
    validate(answer) {
      if (answer.length === 0 || typeof JSON.parse(answer) !== 'number') {
        return chalk.rgb(255, 0, 0).bold('Enter a valid number');
      }
      return true;
    },
  },
  {
    type: 'autocomplete',
    name: 'component',
    suggestOnly: true,
    message: chalk.rgb(46, 255, 0)('Type the path of your root component:'),
    source: cliFileMethods.searchFiles,
    validate(answer) {
      if (!fileList.includes(answer)) {
        return chalk.rgb(255, 0, 0).bold('Invalid entry point');
      }
      return true;
    },
  },
  {
    type: 'autocomplete',
    name: 'rootHtml',
    suggestOnly: true,
    message: chalk.rgb(46, 255, 0)('Type the path of the /build HTML file containing the root div:'),
    source: cliFileMethods.searchHtml,
    validate(answer) {
      if (!htmlList.includes(answer)) {
        return chalk.rgb(255, 0, 0).bold('Invalid entry point');
      }
      return true;
    },
  },
];

module.exports = cliQuestions;
