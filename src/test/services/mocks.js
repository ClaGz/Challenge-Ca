const keys = {
  rioBranco: 200900031,
  riachuelo: 20230011243,
  pracaMal: 20021200122,
};
const geoCodedAddresses = {};
geoCodedAddresses[keys.rioBranco] = {
  results: [
    {
      address_components: [
        { long_name: "1", short_name: "1", types: ["street_number"] },
        {
          long_name: "Avenida Rio Branco",
          short_name: "Av. Rio Branco",
          types: ["route"],
        },
        {
          long_name: "Centro",
          short_name: "Centro",
          types: ["political", "sublocality", "sublocality_level_1"],
        },
        {
          long_name: "Rio de Janeiro",
          short_name: "Rio de Janeiro",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Rio de Janeiro",
          short_name: "RJ",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Brazil",
          short_name: "BR",
          types: ["country", "political"],
        },
        {
          long_name: "20090-003",
          short_name: "20090-003",
          types: ["postal_code"],
        },
      ],
      formatted_address:
        "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil",
      geometry: {
        bounds: {
          northeast: { lat: -22.8967705, lng: -43.1797575 },
          southwest: { lat: -22.897878, lng: -43.1805343 },
        },
        location: { lat: 1, lng: 3 },
        location_type: "ROOFTOP",
        viewport: {
          northeast: { lat: -22.8959752697085, lng: -43.1787969197085 },
          southwest: { lat: -22.8986732302915, lng: -43.1814948802915 },
        },
      },
      place_id: "ChIJa8BFOVp_mQARx6BKGN0xHpM",
      types: ["premise"],
    },
  ],
  status: "OK",
};
geoCodedAddresses[keys.riachuelo] = {
  results: [
    {
      address_components: [
        { long_name: "243", short_name: "243", types: ["street_number"] },
        {
          long_name: "Rua Riachuelo",
          short_name: "R. Riachuelo",
          types: ["route"],
        },
        {
          long_name: "Santa Teresa",
          short_name: "Santa Teresa",
          types: ["political", "sublocality", "sublocality_level_1"],
        },
        {
          long_name: "Rio de Janeiro",
          short_name: "Rio de Janeiro",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Rio de Janeiro",
          short_name: "RJ",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Brazil",
          short_name: "BR",
          types: ["country", "political"],
        },
        {
          long_name: "20230-011",
          short_name: "20230-011",
          types: ["postal_code"],
        },
      ],
      formatted_address:
        "R. Riachuelo, 243 - Santa Teresa, Rio de Janeiro - RJ, 20230-011, Brazil",
      geometry: {
        bounds: {
          northeast: { lat: -22.9131563, lng: -43.19103390000001 },
          southwest: { lat: -22.9134882, lng: -43.1914643 },
        },
        location: { lat: 5, lng: 6 },
        location_type: "ROOFTOP",
        viewport: {
          northeast: { lat: -22.9119732697085, lng: -43.1899001197085 },
          southwest: { lat: -22.9146712302915, lng: -43.1925980802915 },
        },
      },
      place_id: "ChIJC6qJUXJ_mQARcYkV8kebgU0",
      types: ["premise"],
    },
  ],
  status: "OK",
};
geoCodedAddresses[keys.pracaMal] = {
  results: [
    {
      address_components: [
        {
          long_name: "122",
          short_name: "122",
          types: ["street_number"],
        },
        {
          long_name: "Praça Marechal Âncora",
          short_name: "Praça Mal. Âncora",
          types: ["route"],
        },
        {
          long_name: "Centro",
          short_name: "Centro",
          types: ["political", "sublocality", "sublocality_level_1"],
        },
        {
          long_name: "Rio de Janeiro",
          short_name: "Rio de Janeiro",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Rio de Janeiro",
          short_name: "RJ",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Brazil",
          short_name: "BR",
          types: ["country", "political"],
        },
        {
          long_name: "20021-200",
          short_name: "20021-200",
          types: ["postal_code"],
        },
      ],
      formatted_address:
        "Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil",
      geometry: {
        location: {
          lat: 8,
          lng: 9,
        },
        location_type: "ROOFTOP",
        viewport: {
          northeast: {
            lat: -22.9026118197085,
            lng: -43.1690046197085,
          },
          southwest: {
            lat: -22.9053097802915,
            lng: -43.1717025802915,
          },
        },
      },
      place_id: "ChIJn3Nx_eOBmQARSsqe9fhWRcI",
      plus_code: {
        compound_code:
          "3RWH+CV Centro, Rio de Janeiro - State of Rio de Janeiro, Brazil",
        global_code: "589R3RWH+CV",
      },
      types: ["street_address"],
    },
  ],
  status: "OK",
};

const validResponseFromResolveAddressesToGeoCoding = [
  geoCodedAddresses[keys.rioBranco],
  geoCodedAddresses[keys.riachuelo],
  geoCodedAddresses[keys.pracaMal],
];

const addressesGeoCodedWithoutGeometryField = () => {
  return validResponseFromResolveAddressesToGeoCoding.map((item) => {
    const copy = { ...item };
    copy.results[0].geometry = { ...item.results[0].geometry };
    copy.results[0].geometry = undefined;

    return copy;
  });
};

const addressesGeoCodedWithoutLocationField = () => {
  return validResponseFromResolveAddressesToGeoCoding.map((item) => {
    const copy = { ...item };
    copy.results[0].geometry = { ...item.results[0].geometry };
    copy.results[0].geometry.location = undefined;

    return copy;
  });
};

const integrationServiceImplValidMock = {
  getGeoLocalization: (address) => {
    return geoCodedAddresses[
      Number.parseInt(`${address.postalCode}${address.number}`)
    ];
  },
};

const integrationServiceImplWithErrorMock = {
  getGeoLocalization: (address) => {
    throw new Error("Erro ao buscar as geolocalizações.");
  },
};

const validAddresses = [
  {
    city: "Rio de Janeiro",
    state: "RJ",
    number: "1",
    street: "Av. Rio Branco",
    postalCode: " 20090003",
    neighborhood: "Centro",
  },
  {
    city: "Rio de Janeiro",
    state: "RJ",
    number: "243",
    street: "Rua Riachuelo",
    postalCode: " 20230011",
    neighborhood: "Santa",
  },
  {
    city: "Rio de Janeiro",
    state: "RJ",
    number: "122",
    street: "Pra%C3%A7a Mal. %C3%82ncora",
    postalCode: " 20021200",
    neighborhood: "Centro",
  },
];

const expectedResponseFromProcessDistance = [
  {
    address:
      "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil",
    orderedDistanceList: [
      {
        distanceBetween: 5,
        to:
          "R. Riachuelo, 243 - Santa Teresa, Rio de Janeiro - RJ, 20230-011, Brazil",
      },
      {
        distanceBetween: 9.219544457292887,
        to:
          "Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil",
      },
    ],
  },
  {
    address:
      "R. Riachuelo, 243 - Santa Teresa, Rio de Janeiro - RJ, 20230-011, Brazil",
    orderedDistanceList: [
      {
        distanceBetween: 4.242640687119285,
        to:
          "Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil",
      },
      {
        distanceBetween: 5,
        to:
          "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil",
      },
    ],
  },
  {
    address:
      "Praça Mal. Âncora, 122 - Centro, Rio de Janeiro - RJ, 20021-200, Brazil",
    orderedDistanceList: [
      {
        distanceBetween: 4.242640687119285,
        to:
          "R. Riachuelo, 243 - Santa Teresa, Rio de Janeiro - RJ, 20230-011, Brazil",
      },
      {
        distanceBetween: 9.219544457292887,
        to:
          "Av. Rio Branco, 1 - Centro, Rio de Janeiro - RJ, 20090-003, Brazil",
      },
    ],
  },
];

module.exports = {
  validAddresses,
  integrationServiceImplValidMock,
  integrationServiceImplWithErrorMock,
  expectedResponseFromProcessDistance,
  addressesGeoCodedWithoutGeometryField,
  addressesGeoCodedWithoutLocationField,
  validResponseFromResolveAddressesToGeoCoding,
};
