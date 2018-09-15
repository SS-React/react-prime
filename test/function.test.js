import func from './../lib/testFunc';

describe('invoke the function', () => {
  test('squares the number', () => {
    expect(func(2)).toBe((4));
  });
});