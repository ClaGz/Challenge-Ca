const express = require('express');
const app = express();

const index = require('./routes/index');
const localizationRoute = require('./routes/localizationRoute');

app.use('/', index);
app.use('/localizations', localizationRoute);

module.exports = app;