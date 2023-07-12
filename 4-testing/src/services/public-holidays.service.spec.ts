import axios from 'axios';

import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays
} from './public-holidays.service';

const mockAPIHolidayResponse = [{
  counties: null,
  countryCode: "NL",
  date: "2023-04-07",
  fixed: false,
  global: true,
  launchYear: null,
  localName: "Goede Vrijdag",
  name: "Good Friday",
  types: [
    "Public",
  ],
}, {
  counties: null,
  countryCode: "NL",
  date: "2023-04-09",
  fixed: false,
  global: true,
  launchYear: null,
  localName: "Eerste Paasdag",
  name: "Easter Sunday",
  types: [
    "Public",
  ],
}];

const mockShortenedHolidays = [{
  date: '2023-04-07',
  localName: 'Goede Vrijdag',
  name: 'Good Friday',
}, {
  date: '2023-04-09',
  localName: 'Eerste Paasdag',
  name: 'Easter Sunday',
}];

describe('Public Holidays Service Unit Tests', () => {
  describe('getListOfPublicHolidays', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return data with shortened holidays', async () => {

      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: mockAPIHolidayResponse }));
      const result = await getListOfPublicHolidays(2023, 'NL');

      expect(result).toStrictEqual(mockShortenedHolidays);
    });

    it('should return empty array in case of request error', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(false));
      const result = await getListOfPublicHolidays(2023, 'DE');

      expect(result).toStrictEqual([]);
    });
  });

  describe('checkIfTodayIsPublicHoliday', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return true if today is public holiday', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({status: 200}));
      const result = await checkIfTodayIsPublicHoliday('DE');

      expect(result).toStrictEqual(true);
    });

    it('should return false if today is not public holiday', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({status: 204}));
      const result = await checkIfTodayIsPublicHoliday('DE');

      expect(result).toStrictEqual(false);
    });

    it('should return false in case of request error', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(false));
      const result = await checkIfTodayIsPublicHoliday('DE');

      expect(result).toStrictEqual(false);
    });
  });

  describe('getNextPublicHolidays', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return array of shortened next public holidays', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({data: mockAPIHolidayResponse}));
      const result = await getNextPublicHolidays('NL');

      expect(result).toStrictEqual(mockShortenedHolidays);
    });

    it('should return empty array in case of request error', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(false));
      const result = await getNextPublicHolidays('DE');

      expect(result).toStrictEqual([]);
    });
  });
});

