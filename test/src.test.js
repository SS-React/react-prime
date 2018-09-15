import getServerScript from './../src/serverScript'
import getWebpackScript from './../src/webpackScript';

describe(`Testing ./src files`, () => {
  describe(`serverScript.js`, () => {
    test(`should return a string`, () => {
      expect(typeof getServerScript({})).toBe('string');
    });
    test(`should process user input`, () => {
      const testObj = {
        component: 'app',
        static: 'build'
      };
      const compare = getServerScript(testObj);
      const component = compare.match(/import App from 'app'/).join(' ');
      const stat = compare.match(/app.use\(express.static\('build'\)\)/).join(' ');
      expect(component).toBe(`import App from '${testObj.component}'`);
      expect(stat).toBe(`app.use(express.static('${testObj.static}'))`);
    });
  });
  describe(`webpackScript.js`, () => {
    test(`should return a string`, () => {
      expect(typeof getWebpackScript(1, 1)).toBe('string');
    });
    test(`should process user input`, () => {
      const compare = getWebpackScript('a', 'b');
      const entryFile = compare.match(/entry: path.join\(__dirname, '..\/a'\)/).join(' ');
      const outputFile = compare.match(/filename: 'b'/).join(' ');
      expect(entryFile).toBe(`entry: path.join(__dirname, '../a')`);
      expect(outputFile).toBe(`filename: 'b'`);
    });
  });
});