const fuzzy = require('fuzzy');
const glob = require('glob');

const fileDir = glob.sync('**/*.js', { ignore: 'node_modules/**' });

const cliFileMethods = {};

// cliFileMethods.getFileStructure = glob.sync('**/*.js', { ignore: 'node_modules/**' });

cliFileMethods.searchFiles = (answers, input) => {
  input = input || '';
  return new Promise(((resolve) => {
    setTimeout(() => {
      const fuzzyResult = fuzzy.filter(input, fileDir);
      resolve(
        fuzzyResult.map((ele) => ele.original),
      );
    });
  }));
};


module.exports = cliFileMethods;
