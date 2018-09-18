const fuzzy = require('fuzzy');
const glob = require('glob');

const cliFileMethods = {};

const folderDir = glob.sync('**/*/', { ignore: 'node_modules/**' }).map((ele) => {
  const newDir = `./${ele.slice(0, -1)}`;
  return newDir;
});
const fileList = glob.sync('**/*', { ignore: 'node_modules/**', nodir: true });
const htmlList = glob.sync('**/*.html', { ignore: 'node_modules/**' });
// cliFileMethods.getFileStructure = glob.sync('**/*.js', { ignore: 'node_modules/**' });

cliFileMethods.searchFolders = (answers, input) => {
  input = input || '';
  return new Promise(((resolve) => {
    setTimeout(() => {
      const fuzzyResult = fuzzy.filter(input, folderDir);
      resolve(
        fuzzyResult.map((ele) => ele.original),
      );
    });
  }));
};

cliFileMethods.searchFiles = (answers, input) => {
  input = input || '';
  return new Promise(((resolve) => {
    setTimeout(() => {
      const fuzzyResult = fuzzy.filter(input, fileList);
      resolve(
        fuzzyResult.map((ele) => ele.original),
      );
    });
  }));
};

cliFileMethods.searchHtml = (answers, input) => {
  input = input || '';
  return new Promise(((resolve) => {
    setTimeout(() => {
      const fuzzyResult = fuzzy.filter(input, htmlList);
      resolve(
        fuzzyResult.map((ele) => ele.original),
      );
    });
  }));
};

module.exports = {
  cliFileMethods,
  folderDir,
  fileList,
  htmlList,
}