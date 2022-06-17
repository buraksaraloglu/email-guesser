import { isValidUrl, isValidFullName } from './validatiors';

interface ICase {
  given: string;
  expected: boolean;
}

const casifyIsValidUrl = (title: string, cases: ICase[]) => {
  if (cases.length === 0) {
    return;
  }

  for (const { given, expected } of cases) {
    it(`${given}: ${title}`, () => {
      expect(isValidUrl(given)).toEqual(expected);
    });
  }
};

const casifyIsValidFullName = (title: string, cases: ICase[]) => {
  if (cases.length === 0) {
    return;
  }

  for (const { given, expected } of cases) {
    it(`${given}: ${title}`, () => {
      expect(isValidFullName(given)).toEqual(expected);
    });
  }
};

describe('isValidUrl', () => {
  // truthy cases
  casifyIsValidUrl('should return true if URL is valid', [
    {
      given: 'babel.com',
      expected: true,
    },
    {
      given: 'https://babbel.com',
      expected: true,
    },
    {
      given: 'www.babbel.com',
      expected: true,
    },
    {
      given: 'https://www.babbel.com',
      expected: true,
    },
    {
      given: 'https://babbel.com/test?test=test',
      expected: true,
    },
    {
      given: 'https://babbel.com/test/test',
      expected: true,
    },
  ]);

  // falsy cases
  casifyIsValidUrl('should return false if URL is not valid', [
    {
      given: '',
      expected: false,
    },
    {
      given: '1234',
      expected: false,
    },
    {
      given: 'test...com',
      expected: false,
    },
    {
      given: 'http://.com',
      expected: false,
    },
    {
      given: 'babbel 👋',
      expected: false,
    },
  ]);
});

describe('isValidFullName', () => {
  // truthy cases
  casifyIsValidFullName('should return true if full name is valid', [
    {
      given: 'burak saraloglu',
      expected: true,
    },
    {
      given: 'burak test saraloglu',
      expected: true,
    },
    {
      given: 'burak test test saraloglu',
      expected: true,
    },
  ]);

  // falsy cases
  casifyIsValidFullName('should return false if full name is not valid', [
    {
      given: '',
      expected: false,
    },
    {
      given: 'burak',
      expected: false,
    },
    {
      given: '123',
      expected: false,
    },
    {
      given: '  ',
      expected: false,
    },
    {
      given: 'a 👋',
      expected: false,
    },
  ]);
});
