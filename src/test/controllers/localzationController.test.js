const {
  resMock,
  validParsedRequestBody,
  localizationServiceMock,
  expectedValidResponseBody,
  localizationServiceGoogle400Mock,
  localizationServiceGoogle403Mock,
} = require("./mocks");

describe("LocalizationController", () => {
  test("Quando recebe request com 2 ou mais endereços válidos, deve retornar uma resposta de sucesso", async () => {
    expect.assertions(2);

    const localizationController = require("../../controllers/localizationController")(
      localizationServiceMock
    );

    const controllerResponse = await localizationController.post(
      validParsedRequestBody,
      resMock
    );

    return Promise.all([
      expect(controllerResponse.statusCode).toEqual(200),
      expect(controllerResponse.body).toEqual(expectedValidResponseBody),
    ]);
  });

  test("Quando recebe request com 1 endereço válido, deve retornar um erro com statusCode 400", async () => {
    expect.assertions(2);

    const localizationController = require("../../controllers/localizationController")(
      localizationServiceMock
    );
    const invalidRequest = {
      body: [validParsedRequestBody.body[0]],
    };
    const response = await localizationController.post(invalidRequest, resMock);
    return Promise.all([
      expect(response.statusCode).toBe(400),
      expect(response.message).toBe(
        "O valor de endereços precisa ser uma lista com dois ou mais itens"
      ),
    ]);
  });

  test("Quando recebe request com nenhum endereço válido, deve retornar um erro com statusCode 400", async () => {
    expect.assertions(2);

    const localizationController = require("../../controllers/localizationController")(
      localizationServiceMock
    );

    const invalidRequest = {
      body: [],
    };

    const response = await localizationController.post(invalidRequest, resMock);

    return Promise.all([
      expect(response.statusCode).toBe(400),
      expect(response.message).toBe(
        "O valor de endereços precisa ser uma lista com dois ou mais itens"
      ),
    ]);
  });

  test("Quando, ao fazer o request para a api do google, esta retorna 400. Deve retornar um erro com statusCode 400", async () => {
    expect.assertions(2);

    const localizationController = require("../../controllers/localizationController")(
      localizationServiceGoogle400Mock
    );

    const response = await localizationController.post(
      validParsedRequestBody,
      resMock
    );

    return Promise.all([
      expect(response.statusCode).toBe(400),
      expect(response.message).toBe(
        "Erro ao realizar request para o a API do Google."
      ),
    ]);
  });

  test("Quando, ao fazer o request para a api do google, esta retornar 403. Deve retornar um erro com statusCode 500", async () => {
    expect.assertions(2);

    const localizationController = require("../../controllers/localizationController")(
      localizationServiceGoogle403Mock
    );

    const response = await localizationController.post(
      validParsedRequestBody,
      resMock
    );

    return Promise.all([
      expect(response.statusCode).toBe(500),
      expect(response.message).toBe(
        "Ocorreu um erro interno ao tentar processar os endereços"
      ),
    ]);
  });
});
