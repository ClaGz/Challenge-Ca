const {
  httpRequestValidMOCK,
  httpRequestEmptyResponseMOCK,
  validGoogleResponse,
  validParsedRequestBody,
  emptyGoogleResponse,
} = require('./mocks');
const baseEndpoint = 'testEndpoint';
const API_KEY = 'testKey';

describe('GoogleAPIService', () => {
  test('getGeoLocalization - Quando recebe um endereço válida, deve retornar uma lista com endereços e suas geolocalizações', async () => {
    expect.assertions(1);

    const googleAPIService = require('../../services/googleAPIService')(httpRequestValidMOCK, baseEndpoint, API_KEY);
    const response = await googleAPIService.getGeoLocalization(validParsedRequestBody);

    return expect(response).toEqual(validGoogleResponse);
  });

  test('getGeoLocalization - Quando recebe um endereço sem city, deve retornar uma lista com endereços e suas geolocalizações', async () => {
    expect.assertions(1);

    const googleAPIService = require('../../services/googleAPIService')(
      httpRequestEmptyResponseMOCK,
      baseEndpoint,
      API_KEY,
    );

    const response = await googleAPIService.getGeoLocalization(undefined);

    return expect(response).toEqual(emptyGoogleResponse);
  });
});
