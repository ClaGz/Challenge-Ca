const GoogleBadRequest = require('../../../google/errors/googleBadRequest');
const GoogleRequestDenied = require('../../../google/errors/googleRequestDenied');

const validParsedRequestBody = {
  body: [
    {
      city: 'Rio de Janeiro',
      state: 'RJ',
      number: '1',
      street: 'Av. Rio Branco',
      postalCode: ' 20090003',
      neighborhood: 'Centro',
    },
    {
      city: 'Rio de Janeiro',
      state: 'RJ',
      number: '333',
      street: 'Rua Riachuelo',
      postalCode: ' 20230011',
      neighborhood: 'Santa',
    },
  ],
};

const validResponseFromResolveAddressesToGeoCoding = [
  {
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
          location: { lat: -22.8973551, lng: -43.1802782 },
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
  },
  {
    results: [
      {
        address_components: [
          { long_name: '333', short_name: '333', types: ['street_number'] },
          {
            long_name: 'Rua Riachuelo',
            short_name: 'R. Riachuelo',
            types: ['route'],
          },
          {
            long_name: 'Santa Teresa',
            short_name: 'Santa Teresa',
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
            long_name: '20230-011',
            short_name: '20230-011',
            types: ['postal_code'],
          },
        ],
        formatted_address: 'R. Riachuelo, 333 - Santa Teresa, Rio de Janeiro - RJ, 20230-011, Brazil',
        geometry: {
          bounds: {
            northeast: { lat: -22.9131563, lng: -43.19103390000001 },
            southwest: { lat: -22.9134882, lng: -43.1914643 },
          },
          location: { lat: -22.9133384, lng: -43.1911683 },
          location_type: 'ROOFTOP',
          viewport: {
            northeast: { lat: -22.9119732697085, lng: -43.1899001197085 },
            southwest: { lat: -22.9146712302915, lng: -43.1925980802915 },
          },
        },
        place_id: 'ChIJC6qJUXJ_mQARcYkV8kebgU0',
        types: ['premise'],
      },
    ],
    status: 'OK',
  },
];

const validResponseForProcessDistanceBeetweenCodedAddresses = [
  {
    address: 'Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil',
    orderedDistanceList: [
      {
        distanceBetween: 0.019340634862903657,
        to: 'R. Riachuelo, 333 - Santa Teresa, Rio de Janeiro - RJ, 20230-011, Brazil',
      },
    ],
  },
  {
    address: 'R. Riachuelo, 333 - Santa Teresa, Rio de Janeiro - RJ, 20230-011, Brazil',
    orderedDistanceList: [
      {
        distanceBetween: 0.019340634862903657,
        to: 'Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil',
      },
      {
        distanceBetween: 0.03754469400408019,
        to: 'R. Dezenove de Fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, 22280-030, Brazil',
      },
    ],
  },
];

const localizationServiceMock = {
  resolveAddressesToGeoCoding: async () => validResponseFromResolveAddressesToGeoCoding,
  processDistanceBeetweenCodedAddresses: () => validResponseForProcessDistanceBeetweenCodedAddresses,
};

const localizationServiceNoneAddressesFoundMock = {
  resolveAddressesToGeoCoding: async () => [validResponseFromResolveAddressesToGeoCoding[0]],
};

const localizationServiceGoogle403Mock = {
  resolveAddressesToGeoCoding: async () => {
    throw new GoogleRequestDenied(
      'You must use an API key to authenticate each request to Google Maps Platform APIs. For additional information, please refer to http://g.co/dev/maps-no-account',
    );
  },
  processDistanceBeetweenCodedAddresses: () => validResponseForProcessDistanceBeetweenCodedAddresses,
};

const localizationServiceGoogle400Mock = {
  resolveAddressesToGeoCoding: async () => {
    throw new GoogleBadRequest('Erro ao realizar request para o a API do Google.');
  },
  processDistanceBeetweenCodedAddresses: () => validResponseForProcessDistanceBeetweenCodedAddresses,
};

const resMock = {
  status: (statusCode) => {
    return {
      send: (response) => {
        return response;
      },
    };
  },
};

const expectedValidResponseBody = [
  {
    address: 'Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil',
    orderedDistanceList: [
      {
        distanceBetween: 0.019340634862903657,
        to: 'R. Riachuelo, 333 - Santa Teresa, Rio de Janeiro - RJ, 20230-011, Brazil',
      },
    ],
  },
  {
    address: 'R. Riachuelo, 333 - Santa Teresa, Rio de Janeiro - RJ, 20230-011, Brazil',
    orderedDistanceList: [
      {
        distanceBetween: 0.019340634862903657,
        to: 'Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil',
      },
      {
        distanceBetween: 0.03754469400408019,
        to: 'R. Dezenove de Fevereiro, 34 - Botafogo, Rio de Janeiro - RJ, 22280-030, Brazil',
      },
    ],
  },
];

module.exports = {
  resMock,
  validParsedRequestBody,
  expectedValidResponseBody,
  localizationServiceMock,
  localizationServiceGoogle400Mock,
  localizationServiceGoogle403Mock,
  localizationServiceNoneAddressesFoundMock,
};
