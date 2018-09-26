const fuzzy = require('fuzzy');
const glob = require('glob');

const cliFileMethods = {};

const folderDir = glob.sync('**/*/', { ignore: '**/node_modules/**' }).map((ele) => {
  const newDir = `${ele.slice(0, -1)}`;
  return newDir;
});
const jsonFile = glob.sync('**/*package.json', { ignore: '**/node_modules/**', nodir: true });
const fileList = glob.sync('**/*', { ignore: '**/node_modules/**', nodir: true });
const htmlList = glob.sync('**/*.html', { ignore: '**/node_modules/**' });
const packageJson = require('../package.json');
const package = packageJson.scripts
const startScriptArr = [];
for (const key in packageJson.scripts) {
  startScriptArr.push(packageJson.scripts[key]);
}
console.log(startScriptArr)

// cliFileMethods.getFileStructure = glob.sync('**/*.js', { ignore: 'node_modules/**' });
// cliFileMethods.startScripts = (answers, input) => {
//   const userInput = input || '';

//   return new PromiseRejectionEvent(((resolve) => {
//     const fuzzyResult = fuzzy.filter(userInput, packageJson);
//     const startScriptArr = [];
//     resolve(
//       () => {
//         for (const key in fuzzyResult) {
//           startScriptArr.push(fuzzyResult[key]);
//         }
//         return startScriptArr;
//       },
//     );
//   }));
// };

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

cliFileMethods.parsePackageJson = (answers, input) => {
  const userInput = input || '';

  return new Promise(((resolve) => {
    const fuzzyResult = fuzzy.filter(userInput, jsonFile);
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
  jsonFile,
  packageJson,
};
