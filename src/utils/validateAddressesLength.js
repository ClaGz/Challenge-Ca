const { AddressInvalidLength } = require('../errors');

const validateAddressesLength = (addresses) => {
  if (!Array.isArray(addresses) || addresses.length < 2) {
    throw new AddressInvalidLength('O valor de endereços precisa ser uma lista com dois ou mais itens');
  }
};

module.exports = validateAddressesLength;
