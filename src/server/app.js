// *** dependencies *** //
var express = require('express');

var appConfig = require('./config/main-config.js');
var routeConfig = require('./config/route-config.js');
var errorConfig = require('./config/error-config.js');

// *** express instance *** //
var app = express();

// *** config *** //
appConfig.init(app, express);
routeConfig.init(app);
errorConfig.init(app);

module.exports = app;
