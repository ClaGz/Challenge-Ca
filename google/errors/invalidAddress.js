class InvalidAddress extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidAddress';
  }
}
module.exports = InvalidAddress;
