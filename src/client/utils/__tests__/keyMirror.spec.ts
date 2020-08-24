import keyMirror from '../keyMirror';

describe('keyMirror', () => {
  const input = [
    'TEST_1',
    'test 2',
    'Another-Test',
    'http://example.com',
  ];

  it('returns object sanitized', () => {
    const expected = {
      TEST_1: 'TEST_1',
      TEST_2: 'TEST_2',
      ANOTHER_TEST: 'ANOTHER_TEST',
      HTTP_EXAMPLE_COM: 'HTTP_EXAMPLE_COM',
    };
    const res = keyMirror(input);
    expect(res).toEqual(expected);
  });

  it('returns object with input preserved', () => {
    const expected = {
      TEST_1: 'TEST_1',
      'test 2': 'test 2',
      'Another-Test': 'Another-Test',
      'http://example.com': 'http://example.com',
    };
    const res = keyMirror(input, true);
    expect(res).toEqual(expected);
  });
});
