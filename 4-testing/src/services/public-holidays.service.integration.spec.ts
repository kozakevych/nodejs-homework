import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays
} from './public-holidays.service';

import { LIST_OF_PUBLIC_HOLIDAYS_MOCK } from '../testing/list-of-public-holidays-mock';
import { LIST_OF_NEXT_PUBLIC_HOLIDAYS_MOCK } from '../testing/list-of-next-public-holidays-mock';

describe('Public Holidays Service Integration Tests', () => {
  describe('getListOfPublicHolidays', () => {
    it('should return data with shortened holidays', async () => {
      const result = await getListOfPublicHolidays(2023, 'NL');

      expect(result).toStrictEqual(LIST_OF_PUBLIC_HOLIDAYS_MOCK);
    });
  });

  describe('checkIfTodayIsPublicHoliday', () => {
    it('should return false if today is not public holiday', async () => {
      const result = await checkIfTodayIsPublicHoliday('DE');

      expect(result).toStrictEqual(false);
    });
  });

  describe('getNextPublicHolidays', () => {
    it('should return array of shortened next public holidays', async () => {
      const result = await getNextPublicHolidays('NL');

      expect(result).toStrictEqual(LIST_OF_NEXT_PUBLIC_HOLIDAYS_MOCK);
    });
  });
});

