class BadRequest extends Error {
    constructor(message) {
      super(message);
      this.name = "Bad Request";
      this.statusCode = "409";
    }
}
module.exports = BadRequest;
