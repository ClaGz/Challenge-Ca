const express = require('express');
const app = express();
app.use(express.json());

const { home, localizationRoute } = require('./routes');

app.use('/', home);
app.use('/localizations', localizationRoute);

//TODO: ver um prettier/lint
module.exports = app;
