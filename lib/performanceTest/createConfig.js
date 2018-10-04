const createConfig = () => {
return `module.exports = {
  extends: 'lighthouse:default',
  settings: {
    throttlingMethod: 'devtools',
    onlyCategories: ['performance'],
  },
}`;
};

module.exports = createConfig;
