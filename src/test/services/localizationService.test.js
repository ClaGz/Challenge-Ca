const {
  validAddresses,
  integrationServiceImplValidMock,
  integrationServiceImplWithErrorMock,
  expectedResponseFromProcessDistance,
  addressesGeoCodedWithoutGeometryField,
  addressesGeoCodedWithoutLocationField,
  validResponseFromResolveAddressesToGeoCoding,
} = require("./mocks");

describe("LocalizationService", () => {
  test("resolveAddressesToGeoCoding - Quando recebe uma lista de endereços válida, retorna uma lista com as localizações", async () => {
    expect.assertions(2);

    const localizationService = require("../../services/localizationService")(
      integrationServiceImplValidMock
    );

    const response = await localizationService.resolveAddressesToGeoCoding(
      validAddresses
    );

    return Promise.all([
      expect(response.length).toEqual(validAddresses.length),
      expect(response).toEqual(validResponseFromResolveAddressesToGeoCoding),
    ]);
  });

  test("resolveAddressesToGeoCoding - Quando recebe uma lista sem enredeços, retorna um erro", () => {
    expect.assertions(1);

    const localizationService = require("../../services/localizationService")(
      integrationServiceImplValidMock
    );

    return expect(
      localizationService.resolveAddressesToGeoCoding([])
    ).rejects.toThrowError("Não há endereços para serem processados");
  });

  test("resolveAddressesToGeoCoding - Quando a chamada da integração que busca a geolocalização dá erro, deve retornar o erro", () => {
    expect.assertions(1);

    const localizationService = require("../../services/localizationService")(
      integrationServiceImplWithErrorMock
    );

    return expect(
      localizationService.resolveAddressesToGeoCoding(validAddresses)
    ).rejects.toThrow();
  });

  test("processDistanceBeetweenCodedAddresses - Quando recebe uma lista de endereços geolocalizados válida, retorna uma lista com os endereços e com as distâncias ordenadas entre cada endereço", async () => {
    expect.assertions(1);

    const localizationService = require("../../services/localizationService")(
      integrationServiceImplValidMock
    );

    const flattened = validResponseFromResolveAddressesToGeoCoding.flatMap(
      (it) => it && it.results
    );

    const response = await localizationService.processDistanceBeetweenCodedAddresses(
      flattened
    );

    return Promise.all([
      expect(response).toEqual(expectedResponseFromProcessDistance),
    ]);
  });

  test("processDistanceBeetweenCodedAddresses - Quando recebe uma lista de endereços geolocalizados sem campo geometry, retorna um erro", async () => {
    expect.assertions(1);

    const localizationService = require("../../services/localizationService")(
      addressesGeoCodedWithoutGeometryField()
    );
    const flattened = validResponseFromResolveAddressesToGeoCoding.flatMap(
      (it) => it && it.results
    );

    return expect(() =>
      localizationService.processDistanceBeetweenCodedAddresses(flattened)
    ).toThrowError(
      "Impossível calcular a distância, pois temos endereços inválidos"
    );
  });

  test("processDistanceBeetweenCodedAddresses - Quando recebe uma lista de endereços geolocalizados sem campo location, retorna um erro", async () => {
    expect.assertions(1);

    const localizationService = require("../../services/localizationService")(
      addressesGeoCodedWithoutLocationField()
    );
    const flattened = validResponseFromResolveAddressesToGeoCoding.flatMap(
      (it) => it && it.results
    );

    return expect(() =>
      localizationService.processDistanceBeetweenCodedAddresses(flattened)
    ).toThrowError("Impossível calcular a distância sem origem ou destino");
  });
});
