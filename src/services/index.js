const { googleAPIService } = require('../../google');
const localizationService = require('./localizationService')(googleAPIService);

module.exports = {
  localizationService,
};
