const { BadRequest } = require('../errors');

const addressesMap = (address) => {
    const [ street, numberAndNeighborhood, cityAndState, postalCode ] = address.split(',');

    const cityAndStateArray = cityAndState.trim().split(' ');
    const state = cityAndStateArray.pop();
    const city = cityAndStateArray.join(' ');

    const [ number, neighborhood ] = numberAndNeighborhood.trim().split(' ');

    return {
        city, 
        state,
        number,
        street,
        postalCode,
        neighborhood,
    };
};

exports.validateRawRequest = (req, res, next) => {
    if (req.method !== 'POST') return next();

    const { body } = req;

    if(!Array.isArray(body)) throw new BadRequest("O request precisa ser uma lista");

    if(body.length <= 1) throw new BadRequest("O request precisa ter dois ou mais endereços");

    return next();
};

exports.transformToObject = (req, res, next) => {
    if (req.method !== 'POST') return next();
    
    const { body: addresses } = req;
    req.body = addresses.map(addressesMap);

    return next();
}

exports.validateTransformedBody = (req, res, next) => {
    if (req.method !== 'POST') return next();
    
    //TODO: usar o joi pra validar o corpo

    return next();
}

exports.errorHandler = (httpError, req, res, next) => {
    return res.status(httpError.statusCode).send(httpError.message);
};
