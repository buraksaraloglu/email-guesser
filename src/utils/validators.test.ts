import { isValidUrl, isValidFullName } from './validatiors';

describe('isValidUrl', () => {
  const caseTitle = 'isValidUrl($given) !== $expected';
  test.each([
    { given: 'babbel.com', expected: true },
    { given: 'https://babbel.com', expected: true },
    { given: 'www.babbel.com', expected: true },
    { given: 'https://www.babbel.com', expected: true },
    { given: 'https://babbel.com/test?test=test', expected: true },
    { given: 'https://babbel.com/test/test', expected: true },
  ])(caseTitle, ({ given, expected }) => {
    expect(isValidUrl(given)).toEqual(expected);
  });

  test.each([
    { given: '', expected: false },
    { given: '1234', expected: false },
    { given: 'test...com', expected: false },
    { given: 'http://.com', expected: false },
    { given: 'babbel 👋', expected: false },
  ])(caseTitle, ({ given, expected }) => {
    expect(isValidUrl(given)).toEqual(expected);
  });
});

describe('isValidFullName', () => {
  const caseTitle = 'isValidFullName($given) !== $expected';

  // truthy cases
  test.each([
    { given: 'burak saraloglu', expected: true },
    { given: 'burak test saraloglu', expected: true },
    { given: 'burak test test saraloglu', expected: true },
  ])(caseTitle, ({ given, expected }) => {
    expect(isValidFullName(given)).toEqual(expected);
  });

  // falsy cases
  test.each([
    { given: '', expected: false },
    { given: 'test', expected: false },
    { given: 'test 123', expected: false },
    { given: '     ', expected: false },
    { given: '👋', expected: false },
  ])(caseTitle, ({ given, expected }) => {
    expect(isValidFullName(given)).toEqual(expected);
  });
});
