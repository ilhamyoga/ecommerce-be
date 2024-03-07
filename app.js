'use strict';

const config  = require('./src/config');

// EXPRESS
const express = require('express');
const app     = express();

// LOGGER FOR DEV
const logger = require('morgan');
app.use(logger('dev'));

// I/O
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// COOKIE PARSER
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// HEADER HELMET
const helmet = require('helmet');
app.use(helmet());

// ROUTES
const route = require('./src/routes/v1');
app.route = route(app)

// ERROR HANDLER
const errorHandler = require('./src/middlewares/error');
app.use(errorHandler);

// listen to server with specified port
app.listen(config.port, () => {
  console.log("Server listening at port : " + config.port);
});
