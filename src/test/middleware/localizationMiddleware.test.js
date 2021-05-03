const { localizationMiddleware } = require('../../middlewares');
const methodMock = 'POST';
const bodyMock = [
  'Av. Rio Branco, 1 Centro, Rio de Janeiro RJ, 20090003',
  'Praça Mal. Âncora, 122 Centro, Rio de Janeiro RJ, 20021200',
  'Rua 19 de Fevereiro, 34 Botafogo, Rio de Janeiro RJ, 22280030',
  'Rua Riachuelo, 333 Santa Teresa, Rio de Janeiro RJ, 20230011',
];
const resMock = {};
const nextMock = () => {
  return true;
};

describe('LocalizationMiddleware', () => {
  test('validateRawRequest - Quando receber um POST válido, deve chamar o a callback para o próximo middleware', () => {
    expect.assertions(1);

    const req = {
      method: methodMock,
      body: bodyMock,
    };

    return expect(localizationMiddleware.validateRawRequest(req, resMock, nextMock)).toEqual(true);
  });

  test('validateRawRequest - Quando receber um POST com o body sem ser lista, deve lançar um erro', () => {
    expect.assertions(1);

    const req = {
      method: methodMock,
      body: {},
    };

    return expect(() => localizationMiddleware.validateRawRequest(req, resMock, nextMock)).toThrowError(
      'O request precisa ser uma lista',
    );
  });

  test('validateRawRequest - Quando receber um POST com o body com uma lista com menos de 2 endereços, deve lançar um erro', () => {
    expect.assertions(1);

    const req = {
      method: methodMock,
      body: ['Av. Rio Branco, 1 Centro, Rio de Janeiro RJ, 20090003'],
    };

    return expect(() => localizationMiddleware.validateRawRequest(req, resMock, nextMock)).toThrowError(
      'O request precisa ter dois ou mais endereços',
    );
  });

  test('validateRawRequest - Quando receber um POST com o body com uma lista com mais de 99 endereços, deve lançar um erro', () => {
    expect.assertions(1);

    const req = {
      method: methodMock,
      body: Array(100).fill('Av. Rio Branco, 1 Centro, Rio de Janeiro RJ, 20090003'),
    };

    return expect(() => localizationMiddleware.validateRawRequest(req, resMock, nextMock)).toThrowError(
      'O request precisa conter até 99 endereços',
    );
  });

  test('transformToObject - Quando receber um POST válido, deve alterar o body e chamar o callback para o próximo middleware', () => {
    expect.assertions(2);

    const req = {
      method: methodMock,
      body: ['Av. Rio Branco, 1 Centro, Rio de Janeiro RJ, 20090003'],
    };

    const callBackResponse = localizationMiddleware.transformToObject(req, resMock, nextMock);

    return Promise.all([
      expect(callBackResponse).toEqual(true),
      expect(req.body).toEqual([
        {
          city: 'Rio de Janeiro',
          state: 'RJ',
          street: 'Av. Rio Branco',
          number: '1',
          postalCode: ' 20090003',
          neighborhood: 'Centro',
        },
      ]),
    ]);
  });

  test('transformToObject - Quando receber um POST com o body tendo uma lista com um conteúdo inválido, deve lançar um erro', () => {
    expect.assertions(1);

    const req = {
      method: methodMock,
      body: [''],
    };

    return expect(() => localizationMiddleware.transformToObject(req, resMock, nextMock)).toThrowError(
      `Endereço inválido, pois o valor está vazio`,
    );
  });

  test('transformToObject - Quando receber um POST com o body tendo uma lista com um conteúdo inválido, deve lançar um erro', () => {
    expect.assertions(1);

    const req = {
      method: methodMock,
      body: [undefined],
    };

    return expect(() => localizationMiddleware.transformToObject(req, resMock, nextMock)).toThrowError(
      `Endereço inválido, pois o valor está vazio`,
    );
  });

  test('validateTransformedBody - Quando receber um POST com o body válido, deve chamar o callback para o próximo middleware', () => {
    expect.assertions(1);

    const req = {
      method: methodMock,
      body: [
        {
          city: 'Rio de Janeiro',
          state: 'RJ',
          street: 'Av. Rio Branco',
          number: '1',
          postalCode: ' 20090003',
          neighborhood: 'Centro',
        },
      ],
    };

    return expect(localizationMiddleware.validateTransformedBody(req, resMock, nextMock)).toEqual(true);
  });

  test('validateTransformedBody - Quando receber um POST com o body sem o campo city, deve lançar um erro', () => {
    expect.assertions(1);

    const req = {
      method: methodMock,
      body: [
        {
          state: 'RJ',
          street: 'Av. Rio Branco',
          number: '1',
          postalCode: ' 20090003',
          neighborhood: 'Centro',
        },
      ],
    };

    return expect(() => localizationMiddleware.validateTransformedBody(req, resMock, nextMock)).toThrowError(
      'O campo cidade é obrigatório',
    );
  });

  test('validateTransformedBody - Quando receber um POST com o body sem o campo state, deve lançar um erro', () => {
    expect.assertions(1);

    const req = {
      method: methodMock,
      body: [
        {
          city: 'Rio de Janeiro',
          street: 'Av. Rio Branco',
          number: '1',
          postalCode: ' 20090003',
          neighborhood: 'Centro',
        },
      ],
    };

    return expect(() => localizationMiddleware.validateTransformedBody(req, resMock, nextMock)).toThrowError(
      'O campo estado é obrigatório',
    );
  });

  test('validateTransformedBody - Quando receber um POST com o body sem o campo street, deve lançar um erro', () => {
    expect.assertions(1);

    const req = {
      method: methodMock,
      body: [
        {
          city: 'Rio de Janeiro',
          state: 'RJ',
          number: '1',
          postalCode: ' 20090003',
          neighborhood: 'Centro',
        },
      ],
    };

    return expect(() => localizationMiddleware.validateTransformedBody(req, resMock, nextMock)).toThrowError(
      'O campo rua é obrigatório',
    );
  });

  test('validateTransformedBody - Quando receber um POST com o body sem o campo número, deve lançar um erro', () => {
    expect.assertions(1);

    const req = {
      method: methodMock,
      body: [
        {
          city: 'Rio de Janeiro',
          state: 'RJ',
          street: 'Av. Rio Branco',
          postalCode: ' 20090003',
          neighborhood: 'Centro',
        },
      ],
    };

    return expect(() => localizationMiddleware.validateTransformedBody(req, resMock, nextMock)).toThrowError(
      'O campo número é obrigatório',
    );
  });

  test('validateTransformedBody - Quando receber um POST com o body com o campo neighborhood sem ser string, deve lançar um erro', () => {
    expect.assertions(1);

    const req = {
      method: methodMock,
      body: [
        {
          city: 'Rio de Janeiro',
          state: 'RJ',
          street: 'Av. Rio Branco',
          number: '1',
          postalCode: ' 20090003',
          neighborhood: 12,
        },
      ],
    };

    return expect(() => localizationMiddleware.validateTransformedBody(req, resMock, nextMock)).toThrowError(
      'O campo bairro deve ser string',
    );
  });

  test('validateTransformedBody - Quando receber um POST com o body com o campo CEP sem ser string, deve lançar um erro', () => {
    expect.assertions(1);

    const req = {
      method: methodMock,
      body: [
        {
          city: 'Rio de Janeiro',
          state: 'RJ',
          street: 'Av. Rio Branco',
          number: '1',
          postalCode: 20090003,
          neighborhood: 'Centro',
        },
      ],
    };

    return expect(() => localizationMiddleware.validateTransformedBody(req, resMock, nextMock)).toThrowError(
      'O campo CEP deve ser string',
    );
  });
});
