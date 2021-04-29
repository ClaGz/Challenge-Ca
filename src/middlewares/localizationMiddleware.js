const { BadRequest } = require('../errors');

exports.validate = (req, res, next) => { 
    const { body } = req;

    if(!Array.isArray(body)) throw new BadRequest("O request precisa ser uma lista");

    if(body.length <= 1) throw new BadRequest("O request precisa ter dois ou mais endereços");

    //TODO: usar o joi pra validar o corpo
    return next();
};

exports.errorHandler = (httpError, req, res, next) => {
    return res.status(httpError.statusCode).send(httpError.message);
};
