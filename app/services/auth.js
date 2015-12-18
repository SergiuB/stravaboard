import passport from 'passport';
import {Strategy as StravaStrategy} from 'passport-strava-oauth2';

let credentials;

const oauthIds = {
  strava: {
    clientID: '9244',
    clientSecret: '94b8617916ead111be4ebf700ca1d610e2fb2ff0',
    callbackURL: 'http://127.0.0.1:3000/auth/strava/callback'
  }
};

let init = app => {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new StravaStrategy({
    clientID: oauthIds.strava.clientID,
    clientSecret: oauthIds.strava.clientSecret,
    callbackURL: oauthIds.strava.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
      credentials = {accessToken, profile};
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  ));

  app.use(passport.initialize());
  app.use(passport.session());
};

let isAuthenticated = () => !!credentials;
let getToken = () => isAuthenticated() ? credentials.accessToken: undefined;

let loggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

export {init, getToken, loggedIn};
