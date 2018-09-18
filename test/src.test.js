import { init, serve } from './../src/index.js';

describe('Testing ./src files', () => {
  describe('index.js', () => {
    test('should return an object', () => {
      expect(typeof init({})).toBe('object');
    });
    test('should properly assign input values', () => {
      const input = {
        html: './html',
        App: './App',
        id: 'root'
      };
      const result = init(input);
      expect(result.html).toBe('./html');
      expect(result.App).toBe('./App');
      expect(result.id).toBe('root');
    });
  });
});