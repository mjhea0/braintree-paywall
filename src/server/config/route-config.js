(function (routeConfig) {

  routeConfig.init = function (app) {

    // *** routes *** //
    var routes = require('../routes/index');

    // *** register routes *** //
    app.use('/', routes);

  };

})(module.exports);
