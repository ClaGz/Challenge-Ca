const { AddressInvalid, AddressInvalidLength } = require('../errors');
const { validateAddressesLength } = require('../utils');

const validateGeoCodedAddresses = (geoCodedAddresses) => {
  const onlyEmptyResults = geoCodedAddresses.filter((geoCodedAddress) => {
    const { results } = geoCodedAddress || {};
    return !(Array.isArray(results) && results.length);
  });

  if (geoCodedAddresses.length - onlyEmptyResults.length < 2)
    throw new AddressInvalidLength(
      'A quantidade de endereços encontrados foi menor que a quantidade necessária para que as distâncias pudessem ser traçadas',
    );
};

const localizationController = (localizationServiceImpl) => ({
  post: async (req, res, next) => {
    try {
      console.log('LocalizationController - Iniciando o processamento dos endereços.');
      const { body: addresses } = req;

      validateAddressesLength(addresses);

      const geoCodedAddresses = await localizationServiceImpl.resolveAddressesToGeoCoding(addresses);

      validateGeoCodedAddresses(geoCodedAddresses);

      const responseFromDistanceProcessor = localizationServiceImpl.processDistanceBeetweenCodedAddresses(
        geoCodedAddresses.flatMap((it) => it && it.results),
      );

      return res.status(200).send({
        statusCode: 200,
        body: responseFromDistanceProcessor,
      });
    } catch (error) {
      console.error(error);

      const { name } = error;

      const response = {
        statusCode: 500,
        message: 'Ocorreu um erro interno ao tentar processar os endereços',
      };

      if (error.statusCode == 400 || name === AddressInvalid.name || name === AddressInvalidLength.name) {
        response.statusCode = 400;
        response.message = error.message;
      }

      return res.status(response.statusCode).send(response);
    }
  },
});

module.exports = localizationController;
