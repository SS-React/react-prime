import getServerScript from '../lib/serverScript'
import getWebpackScript from '../lib/webpackScript';

describe(`Testing ./lib files`, () => {
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
      expect(typeof getWebpackScript(1)).toBe('string');
    });
    test(`should process user input`, () => {
      const compare = getWebpackScript('a');
      const entryFile = compare.match(/entry: path.join\(__dirname, '..\/a'\)/).join(' ');
      expect(entryFile).toBe(`entry: path.join(__dirname, '../a')`);
    });
  });
});