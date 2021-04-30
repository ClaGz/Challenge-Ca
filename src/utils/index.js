//TODO Config os default do AXIOS;
const axios = require('axios');

module.exports = {
    httpRequest: require('./httpRequest')(axios),
    // httpRequestMock: require('./httpRequest')(axiosMock),
};