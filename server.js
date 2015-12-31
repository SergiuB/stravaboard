import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import swig from 'swig';
import serveStatic from 'serve-static';
import serveIndex from 'serve-index';
import session from 'express-session';
import passport from 'passport';
import fs from 'fs';

import * as StravaPassport from './app/services/strava-passport';

const app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/public/views');
app.use(serveStatic(__dirname + '/public'));
app.use('/public', serveIndex(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({
  secret: 'myapp',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

StravaPassport.init(app);

// dynamically include routes (Controller)
fs.readdirSync('./app/controllers').forEach(function(file) {
  if (file.substr(-3) == '.js') {
    var route = require('./app/controllers/' + file);
    route.controller(app);
  }
});

const server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log(`Listening on ${host}:${port}`);
});
