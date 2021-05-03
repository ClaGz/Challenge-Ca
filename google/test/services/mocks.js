const validGoogleResponse = {
  results: [
    {
      address_components: [
        { long_name: '1', short_name: '1', types: ['street_number'] },
        {
          long_name: 'Avenida Rio Branco',
          short_name: 'Av. Rio Branco',
          types: ['route'],
        },
        {
          long_name: 'Centro',
          short_name: 'Centro',
          types: ['political', 'sublocality', 'sublocality_level_1'],
        },
        {
          long_name: 'Rio de Janeiro',
          short_name: 'Rio de Janeiro',
          types: ['administrative_area_level_2', 'political'],
        },
        {
          long_name: 'Rio de Janeiro',
          short_name: 'RJ',
          types: ['administrative_area_level_1', 'political'],
        },
        {
          long_name: 'Brazil',
          short_name: 'BR',
          types: ['country', 'political'],
        },
        {
          long_name: '20090-003',
          short_name: '20090-003',
          types: ['postal_code'],
        },
      ],
      formatted_address: 'Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil',
      geometry: {
        bounds: {
          northeast: { lat: -22.8967705, lng: -43.1797575 },
          southwest: { lat: -22.897878, lng: -43.1805343 },
        },
        location: { lat: 1, lng: 3 },
        location_type: 'ROOFTOP',
        viewport: {
          northeast: { lat: -22.8959752697085, lng: -43.1787969197085 },
          southwest: { lat: -22.8986732302915, lng: -43.1814948802915 },
        },
      },
      place_id: 'ChIJa8BFOVp_mQARx6BKGN0xHpM',
      types: ['premise'],
    },
  ],
  status: 'OK',
};

const emptyGoogleResponse = { results: [], status: 'ZERO_RESULTS' };

const httpRequestValidMOCK = {
  get: async (endpoint) => ({
    data: validGoogleResponse,
  }),
};

const httpRequestEmptyResponseMOCK = {
  get: async (endpoint) => ({
    data: emptyGoogleResponse,
  }),
};

const validParsedRequestBody = {
  city: 'Rio de Janeiro',
  state: 'RJ',
  number: '1',
  street: 'Av. Rio Branco',
  postalCode: ' 20090003',
  neighborhood: 'Centro',
};

module.exports = {
  httpRequestValidMOCK,
  validGoogleResponse,
  validParsedRequestBody,
  httpRequestEmptyResponseMOCK,
  emptyGoogleResponse,
};
