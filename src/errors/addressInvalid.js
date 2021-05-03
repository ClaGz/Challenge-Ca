class AddressInvalid extends Error {
  constructor(message) {
    super(message);
    this.name = 'AddressInvalid';
  }
}
module.exports = AddressInvalid;
