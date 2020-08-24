const path = require('path');
const express = require('express');
const router = require('./routes');
const settings = require('./settings');

const app = express();
app.set('views', `${__dirname}/templates`);
app.set('view engine', 'ejs');
app.set('view cache', false);
app.set('env', settings.ENV_NAME);

app.use(express.static('../../build'));
app.use('/vendor', express.static(path.join(__dirname, '../vendor')));
app.use(router);

module.exports = app;
