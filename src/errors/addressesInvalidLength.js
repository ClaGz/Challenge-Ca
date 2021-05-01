class AddressInvalidLength extends Error {
  constructor(message) {
    super(message);
    this.name = "AddressInvalidLength";
  }
}
module.exports = AddressInvalidLength;
