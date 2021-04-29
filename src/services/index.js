const { httpRequest } = require('../utils');
const API_KEY = process.env.GOOGLE_API_KEY;
const ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json`;

const googleAPIService = require('./googleAPIService')(httpRequest, ENDPOINT, API_KEY);
const localizationService = require('./localizationService')(googleAPIService);

module.exports = {
    googleAPIService,
    localizationService,
    // localizationServiceMock: require('./localizationService')(httpRequestMock),
};