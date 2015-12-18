import passport from 'passport';
import {Strategy as StravaStrategy} from 'passport-strava-oauth2';
import oauthIds from './oauth';

let credentials;

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
