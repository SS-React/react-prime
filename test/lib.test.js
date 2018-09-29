import createIndexScript from '../lib/index';
import createServerScript from '../lib/server';
import createCompareScript from '../lib/createCompareHTML';
import createHTMLScript from '../lib/returnHTML';
import createReduxHTMLScript from '../lib/returnReduxHTML';
import createPrimeServer from '../lib/createPrimeServer';
// import app from '../lib/tempserver';

const fs = require('fs');
const path = require('path');
const request = require('supertest');

describe(`Testing ./lib files`, () => {
  const inputObj = {
    static: 'build',
    component: 'App.js',
    store: 'createStore.js'
  };
  
  const mkdir = () => {
    if (!fs.existsSync('./test/testFiles')) {
      fs.mkdirSync('./test/testFiles');
    }
  }

  const deleteFile = () => {
    fs.unlinkSync(path.join(__dirname, './testFiles/index.js'));
    fs.unlinkSync(path.join(__dirname, './testFiles/server.js'));
    fs.unlinkSync(path.join(__dirname, './testFiles/primeCompare.html'));
    fs.unlinkSync(path.join(__dirname, './testFiles/returnHTML.js'));
    fs.unlinkSync(path.join(__dirname, './testFiles/returnReduxHTML.js'));
  };

  beforeAll(() => {
    mkdir();
    deleteFile();
  });

  describe(`index.js`, () => {
    test(`should return a string`, () => {
      expect(typeof createIndexScript()).toBe('string');
    });
    test(`output string should match contents of file created from the string`, () => {
      fs.writeFileSync(path.join(__dirname, './testFiles/index.js'), createIndexScript());
      fs.readFileSync(path.join(__dirname, './testFiles/index.js'), (err, data) => {
        expect(createIndexScript()).toBe(data);
      });
    });
  });
  describe(`server.js`, () => {
    test(`should return a string`, () => {
      expect(typeof createServerScript(inputObj)).toBe('string');
    });
    test(`output string should match contents of file created from the string`, () => {
      fs.writeFileSync(path.join(__dirname, './testFiles/server.js'), createServerScript(inputObj));
      fs.readFileSync(path.join(__dirname, './testFiles/server.js'), (err, data) => {
        expect(createServerScript(inputObj)).toBe(data);
      });
    });
  });
  describe(`primeCompare.html`, () => {
    test(`should return a string`, () => {
      expect(typeof createCompareScript()).toBe('string');
    });
    test(`output string should match contents of file created from the string`, () => {
      fs.writeFileSync(path.join(__dirname, './testFiles/primeCompare.html'), createCompareScript());
      fs.readFileSync(path.join(__dirname, './testFiles/primeCompare.html'), (err, data) => {
        expect(createCompareScript()).toBe(data);
      });
    });
  });
  describe(`returnHTML.js`, () => {
    test(`should return a string`, () => {
      expect(typeof createHTMLScript(inputObj)).toBe('string');
    });
    test(`output string should match contents of file created from the string`, () => {
      fs.writeFileSync(path.join(__dirname, './testFiles/returnHTML.js'), createHTMLScript(inputObj));
      fs.readFileSync(path.join(__dirname, './testFiles/returnHTML.js'), (err, data) => {
        expect(createHTMLScript(inputObj)).toBe(data);
      });
    });
  });
  describe(`returnReduxHTML.js`, () => {
    test(`should return a string`, () => {
      expect(typeof createReduxHTMLScript(inputObj)).toBe('string');
    });
    test(`output string should match contents of file created from the string`, () => {
      fs.writeFileSync(path.join(__dirname, './testFiles/returnReduxHTML.js'), createReduxHTMLScript(inputObj));
      fs.readFileSync(path.join(__dirname, './testFiles/returnReduxHTML.js'), (err, data) => {
        expect(createReduxHTMLScript(inputObj)).toBe(data);
      });
    });
  });
  describe(`createPrimeServer.js`, () => {
    test(`should return a string`, () => {
      expect(typeof createPrimeServer()).toBe('string');
    });
    test(`output string should match contents of file created from the string`, () => {
      fs.writeFileSync(path.join(__dirname, './testFiles/primeServer.js'), createPrimeServer());
      fs.readFileSync(path.join(__dirname, './testFiles/primeServer.js'), (err, data) => {
        expect(createPrimeServer()).toBe(data);
      });
    });
  });
  xdescribe(`tempserver.js`, () => {
    test(`should start the server on port 5000`, () => {
      request(app)
        .get('/')
        .expect(200, done)       
    });
  });
});
