const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const { Strategy } = require('passport-discord');
const config = require('../config');
const renderTemplate = require('./utils/renderTemplate');

module.exports = async (client) => {
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.engine('html', ejs.renderFile);
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '/views'));
  app.use(express.static(path.join(__dirname, '/public')));
  app.use(session({
    secret: config.CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  }));

  app.use(cors());

  app.use(require('./middlewares/userLocale'));
  app.use(async function(req, res, next) {
    req.client = client;
    next();
  });

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  passport.use(new Strategy({
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    callbackURL: config.CALLBACK_URL,
    scope: [ 'identify' ],
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      return done(null, profile);
    });
  }));

  app.use('/', require('./routes/index'));
  app.use('/dashboard', require('./routes/dashboard'));
  app.use('/auth', require('./routes/auth'));
  app.use('/api', require('./routes/api'));

  app.get('*', (req, res) => {
    renderTemplate(res, req, '404.ejs', {});
  });
  app.use((err, req, res, next) => {
    console.error(err.stack);
    renderTemplate(res, req, '500.ejs', {});
  });

  app.listen(config.port, () => {
    console.log(`Web Server now online on port ${config.port}`);
  });
};