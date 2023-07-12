import { validateInput, shortenPublicHoliday } from './helpers';
import { PublicHoliday, PublicHolidayShort } from './types';

const publicHolidayMock: PublicHoliday = {
  date: '2020',
  localName: 'mock local name',
  name: 'mock name',
  countryCode: 'CODE MOCK',
  fixed: false,
  global: true,
  counties: ['AA', 'BB'],
  launchYear: 1100,
  types: ['']
};

describe('helpers', () => {
  describe('validateInput method', () => {
    it('should throw an error if provided country is not in the list', () => {
      const inputWithInvalidCountry = {year: 2020, country: 'JP'};
      const expectedErrorMessage = 'Country provided is not supported, received: JP';
      
      expect(() => validateInput(inputWithInvalidCountry)).toThrow(new Error((expectedErrorMessage)));
    });

    it('should throw an error if provided year is not current year', () => {
      const inputWithInvalidYear = {year: 2020, country: 'DE'};
      const expectedErrorMessage = 'Year provided not the current, received: 2020';
      
      expect(() => validateInput(inputWithInvalidYear)).toThrow(new Error((expectedErrorMessage)));
    });

    it('should return true if country and year are valid', () => {
      const inputWithValidArgs = {year: 2023, country: 'NL'};
      
      expect(validateInput(inputWithValidArgs)).toBe(true);
    });
  });

  describe('shortenPublicHoliday method', () => {
    it('should return shortened public holiday object', () => {
      const expectedResult: PublicHolidayShort = {
        date: '2020',
        localName: 'mock local name',
        name: 'mock name',
      };
      
      expect(shortenPublicHoliday(publicHolidayMock)).toStrictEqual(expectedResult);
    });
  });
});
