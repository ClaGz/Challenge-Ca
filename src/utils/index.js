// const API_KEY = process.env.GOOGLE_API_KEY;
// const ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json`;

//JUST TESTING
const API_KEY = process.env.GOOGLE_API_KEY;
const ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${API_KEY}`;

const axios = require('axios');

module.exports = {
    httpRequest: require('./httpRequest')(axios, ENDPOINT, API_KEY),
    // httpRequestMock: require('./httpRequest')(axiosMock),
};