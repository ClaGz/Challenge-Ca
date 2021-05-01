const { validateAddressesLength } = require("../utils");
const { AddressInvalidLength, AddressInvalid } = require("../errors");

//TODO: testar isso com valores simples
const calculateDistance = (from, to) => {
  const toLatInteger = Math.abs(Number.parseFloat(to.lat));
  const toLngInteger = Math.abs(Number.parseFloat(to.lng));
  const fromLatInteger = Math.abs(Number.parseFloat(from.lat));
  const fromLngInteger = Math.abs(Number.parseFloat(from.lng));

  const sqrtSum =
    Math.pow(fromLatInteger - toLatInteger, 2) +
    Math.pow(fromLngInteger - toLngInteger, 2);

  return Math.sqrt(sqrtSum, 2);
};

// TODO: Pensar melhor sobre onde deixar a ordenação
const orderDistances = (distanceList, asc = true) => {
  return distanceList.sort((currentDistance, nextDistance) => {
    const { distanceBetween: currentDistanceBetween } = currentDistance;
    const { distanceBetween: nextDistanceBetween } = nextDistance;

    if (currentDistanceBetween > nextDistanceBetween) {
      return 1;
    }
    if (currentDistanceBetween < nextDistanceBetween) {
      return -1;
    }

    return 0;
  });
};

const validate = (addressFrom, addressTo) => {
  if (!addressFrom.geometry || !addressTo.geometry)
    throw new AddressInvalid(
      "Impossível calcular a distância, pois temos endereços inválidos"
    );

  if (!addressFrom.geometry.location || !addressTo.geometry.location)
    throw new AddressInvalid(
      "Impossível calcular a distância sem origem ou destino"
    );
};

const localizationService = (integrationServiceImpl) => ({
  resolveAddressesToGeoCoding: (addresses) => {
    if (!Array.isArray(addresses))
      throw new AddressInvalidLength("Não há endereços para serem processados");

    console.log("Iniciando verificação dos endereços recebidos");

    return Promise.all(
      addresses.map((address) => {
        return integrationServiceImpl.getGeoLocalization(address);
      })
    );
  },

  processDistanceBeetweenCodedAddresses: (geoCodedAddresses) => {
    validateAddressesLength(geoCodedAddresses);

    const response = [];

    for (var i = 0; i < geoCodedAddresses.length; i++) {
      const addressFromI = geoCodedAddresses[i];
      const { formatted_address } = addressFromI;

      response.push({
        address: formatted_address,
        orderedDistanceList: [],
      });

      for (var y = 0; y < geoCodedAddresses.length; y++) {
        const addressFromY = geoCodedAddresses[y];

        validate(addressFromI, addressFromY);

        if (addressFromI.place_id !== addressFromY.place_id) {
          const distanceBetween = calculateDistance(
            addressFromI.geometry.location,
            addressFromY.geometry.location
          );

          response[i].orderedDistanceList.push({
            distanceBetween,
            to: addressFromY.formatted_address,
          });
        }
      }
      response[i].orderedDistanceList = orderDistances(
        response[i].orderedDistanceList
      );
    }
    return response;
  },
});

module.exports = localizationService;
