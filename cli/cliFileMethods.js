const fuzzy = require('fuzzy');
const glob = require('glob');

const cliFileMethods = {};

const folderDir = glob.sync('**/*/', { ignore: '**/node_modules/**' }).map((ele) => {
  const newDir = `${ele.slice(0, -1)}`;
  return newDir;
});
const fileList = glob.sync('**/*.{js,jsx}', { ignore: '**/node_modules/**', nodir: true });
const htmlList = glob.sync('**/*.html', { ignore: '**/node_modules/**' });
// ---------------------------------------------------------------------------------------
// NOTE: this was an attempt to read from the user's package.json
// const packageJson = require('../package.json');

// const startScriptArr = Object.keys(packageJson.scripts);
// console.log(htmlList);
// console.log(startScriptArr);
// ---------------------------------------------------------------------------------------

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

// cliFileMethods.startScriptArr = (answers, input) => {
//   const userInput = input || '';

//   return new Promise(((resolve) => {
//     const fuzzyResult = fuzzy.filter(userInput, startScriptArr);
//     resolve(
//       fuzzyResult.map(ele => ele.original),
//     );
//   }));
// };

module.exports = {
  cliFileMethods,
  folderDir,
  fileList,
  htmlList,
  // startScriptArr,
};
