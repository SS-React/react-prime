/**
 * Function that returns a string to create a Google Lighthouse config file
 */

const createConfig = () => {
return `module.exports = {
  extends: 'lighthouse:default',
  settings: {
    throttlingMethod: 'devtools',
    onlyCategories: ['performance'],
  },
};`;
};

module.exports = createConfig;
