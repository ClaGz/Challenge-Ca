//TODO Config os default do AXIOS;
const axios = require("axios");

const httpRequest = require("./utils/httpRequest")(axios);
const API_KEY = process.env.GOOGLE_API_KEY;
const ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json`;

const googleAPIService = require("./services/googleAPIService")(
  httpRequest,
  ENDPOINT,
  API_KEY
);

module.exports = {
  googleAPIService,
  GoogleBadRequest: require("./errors/googleBadRequest"),
  GoogleRequestDenied: require("./errors/googleRequestDenied"),
};
