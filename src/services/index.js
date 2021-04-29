const { httpRequest } = require('../utils');

module.exports = {
    localizationService: require('./localizationService')(httpRequest),
    // localizationServiceMock: require('./localizationService')(httpRequestMock),
};