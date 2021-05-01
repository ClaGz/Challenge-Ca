const {
  BadRequest,
  InternalError,
  AddressInvalid,
  AddressInvalidLength,
} = require("../errors");

const { validateAddressesLength } = require("../utils");

//TODO: melhorar os logs
const localizationController = (localizationServiceImpl) => ({
  //FIXME: Validar timeout com requests muito grandes
  post: async (req, res, next) => {
    try {
      const { body: addresses } = req;

      validateAddressesLength(addresses);

      const geoCodedAddresses = await localizationServiceImpl.resolveAddressesToGeoCoding(
        addresses
      );

      //TODO: verificar se o endereço é o mesmo que foi passado

      //TODO: renomear
      const responseFromDistanceProcessor = localizationServiceImpl.processDistanceBeetweenCodedAddresses(
        geoCodedAddresses.flatMap((it) => it && it.results)
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
        message: "Ocorreu um erro interno ao tentar processar os endereços",
      };

      if (
        error.statusCode == 400 ||
        name === AddressInvalid.name ||
        name === AddressInvalidLength.name
      ) {
        response.statusCode = 400;
        response.message = error.message;
      }

      return res.status(response.statusCode).send(response);
    }
  },
});

module.exports = localizationController;
