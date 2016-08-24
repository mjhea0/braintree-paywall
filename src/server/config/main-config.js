(function (appConfig) {

  // *** main dependencies *** //
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');
  var session = require('express-session');
  var flash = require('connect-flash');
  var morgan = require('morgan');
  var nunjucks = require('nunjucks');

  // *** load environment variables *** //
  require('dotenv').config();

  appConfig.init = function (app, express) {

    // *** view engine *** //
    nunjucks.configure(
      path.join(__dirname, '..', 'views'), {
      express: app,
      autoescape: true
    });
    app.set('view engine', 'html');

    // *** config middleware *** //
    app.use(morgan('combined'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: true
    }));
    app.use(flash());
    app.use(express.static(path.join(__dirname, '..', '..', 'client')));

  };

})(module.exports);
