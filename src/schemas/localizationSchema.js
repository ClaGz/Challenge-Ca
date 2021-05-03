const Joi = require('joi');

module.exports = Joi.object({
  postalCode: Joi.string().error(() => new Error('O campo CEP deve ser string')),
  neighborhood: Joi.string().error(() => new Error('O campo bairro deve ser string')),
  city: Joi.string()
    .required()
    .error(() => new Error('O campo cidade é obrigatório')),
  number: Joi.string()
    .required()
    .error(() => new Error('O campo número é obrigatório')),
  street: Joi.string()
    .required()
    .error(() => new Error('O campo rua é obrigatório')),
  state: Joi.string()
    .max(2)
    .required()
    .error(() => new Error('O campo estado é obrigatório')),
});
