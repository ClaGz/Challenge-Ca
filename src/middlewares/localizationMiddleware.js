const { BadRequest } = require('../errors');
const { LocalizationSchema } = require('../schemas');
const API_MIN_ADDRESSES = 1;
const API_MAX_ADDRESSES = 99;

const addressesMap = (address) => {
  if (!address) throw new BadRequest(`Endereço inválido, pois o valor está vazio`);

  const [street, numberAndNeighborhood, cityAndState, postalCode] = encodeURI(address).replace(/%20/g, ' ').split(',');

  const cityAndStateArray = cityAndState && cityAndState.trim().split(' ');
  const state = cityAndStateArray && cityAndStateArray.pop();
  const city = cityAndStateArray && cityAndStateArray.join(' ');

  const numberAndNeighborhoodArray = numberAndNeighborhood && numberAndNeighborhood.trim().split(' ');
  let number = numberAndNeighborhoodArray && numberAndNeighborhoodArray.shift();
  number = number && number.trim();
  const neighborhood = numberAndNeighborhoodArray && numberAndNeighborhoodArray.join(' ');

  return {
    city,
    state,
    number,
    street,
    postalCode,
    neighborhood,
  };
};

const validateRawRequest = (req, res, next) => {
  if (req.method !== 'POST') return next();

  const { body } = req;

  if (!Array.isArray(body)) throw new BadRequest('O request precisa ser uma lista');
  if (body.length <= API_MIN_ADDRESSES) throw new BadRequest('O request precisa ter dois ou mais endereços');

  //Limite da conta do google. Teste com valores altos mostraram que posso tomar erro da API deles.
  //you have exceeded your rate-limit for this API.
  if (body.length > API_MAX_ADDRESSES) throw new BadRequest('O request precisa conter até 99 endereços');

  return next();
};

const transformToObject = (req, res, next) => {
  if (req.method !== 'POST') return next();

  const { body: addresses } = req;
  req.body = addresses.map(addressesMap);

  return next();
};

const validateTransformedBody = (req, res, next) => {
  if (req.method === 'POST')
    req.body.forEach((address) => {
      const { error } = LocalizationSchema.validate(address);
      if (error) throw new BadRequest(error);
    });
  return next();
};

const errorHandler = (httpError, req, res, next) => {
  const statusCode = httpError.statusCode || 500;
  return res.status(statusCode).send(httpError.message);
};

module.exports = {
  errorHandler,
  transformToObject,
  validateRawRequest,
  validateTransformedBody,
};
