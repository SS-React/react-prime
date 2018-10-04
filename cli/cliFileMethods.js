const fuzzy = require('fuzzy');
const glob = require('glob');

const cliFileMethods = {};

const folderDir = glob.sync('**/*/', { ignore: '**/node_modules/**' }).map((ele) => {
  const newDir = `${ele.slice(0, -1)}`;
  return newDir;
});
const fileList = glob.sync('**/*.{js,jsx}', { ignore: '**/node_modules/**', nodir: true });
const htmlList = glob.sync('**/*.html', { ignore: '**/node_modules/**' });

cliFileMethods.searchFolders = (answers, input) => {
  const userInput = input || '';

  return new Promise(((resolve) => {
    const fuzzyResult = fuzzy.filter(userInput, folderDir);
    resolve(
      fuzzyResult.map(ele => ele.original),
    );
  }));
};

cliFileMethods.searchFiles = (answers, input) => {
  const userInput = input || '';

  return new Promise(((resolve) => {
    const fuzzyResult = fuzzy.filter(userInput, fileList);
    resolve(
      fuzzyResult.map(ele => ele.original),
    );
  }));
};

cliFileMethods.searchHtml = (answers, input) => {
  const userInput = input || '';

  return new Promise(((resolve) => {
    const fuzzyResult = fuzzy.filter(userInput, htmlList);
    resolve(
      fuzzyResult.map(ele => ele.original),
    );
  }));
};

module.exports = {
  cliFileMethods,
  folderDir,
  fileList,
  htmlList,
};
