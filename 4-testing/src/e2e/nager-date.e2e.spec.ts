import request from 'supertest';

const NAGER_DATE_API = "https://date.nager.at";

describe('Nager API', () => {
  describe('/api/v3/Version', () => {
    it('should name and version', async () => {
      const { status, body } = await request(NAGER_DATE_API).get('/api/v3/Version');
  
      expect(status).toEqual(200);
      expect(body).toEqual({
        version: expect.any(String),
        name: 'Nager.Date'
      })
    });
  });

  describe('/api/v3/LongWeekend', () => {
    it('should return 200 and list of long weekends for given country', async () => {
      const year = 2020;
      const country = 'NL';
      const { status, body } = await request(NAGER_DATE_API).get(`/api/v3/LongWeekend/${year}/${country}`);
  
      expect(status).toEqual(200);
      body.forEach((holiday: any) => {
        expect(holiday).toEqual({
          startDate: expect.any(String),
          endDate: expect.any(String),
          dayCount: expect.any(Number),
          needBridgeDay: expect.any(Boolean),
        });
      });
    });
  });

  describe('/api/v3/CountryInfo', () => {
    it('should return 200 and country info for given country', async () => {
      const country = 'NL';
      const { status, body } = await request(NAGER_DATE_API).get(`/api/v3/CountryInfo/${country}`);
  
      expect(status).toEqual(200);
      expect(body).toEqual({
        commonName: expect.any(String),
        officialName: expect.any(String),
        countryCode: expect.any(String),
        region: expect.any(String),
        borders: expect.any(Array),
      });
    });
  });
});
