module.exports = () => {
return `module.exports = {
  extends: 'lighthouse:default',
  settings: {
    throttlingMethod: 'devtools',
    onlyCategories: ['performance'],
  },
}`;
};