import passport from 'passport';
import {Strategy as StravaStrategy} from 'passport-strava-oauth2';
import Users from './users';

const oauthIds = {
  strava: {
    clientID: '9244',
    clientSecret: '94b8617916ead111be4ebf700ca1d610e2fb2ff0',
    callbackURL: 'http://127.0.0.1:3000/auth/strava/callback'
  }
};

let credentials;

let init = app => {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(userId, done) {
    Users[userId] = Users[userId] || { id: userId };
    done(null, Users[userId]);
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
