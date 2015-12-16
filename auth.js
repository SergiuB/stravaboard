import passport from 'passport';
import {Strategy as StravaStrategy} from 'passport-strava-oauth2';
import oauthIds from './oauth';

let credentials;

let init = app => {
  passport.serializeUser(function(user, done) {
    done(null, user);
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
      console.log("strava: ", accessToken, profile, done);
      credentials = {accessToken, profile};
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  ));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/strava/callback',
    passport.authenticate('strava', { failureRedirect: '/login' }),
    (req, res) => {
      console.log('success!');
      // Successful authentication, redirect home.
      res.redirect('/');
    });
};

let authenticate = passport.authenticate('strava');
let isAuthenticated = () => !!credentials;
let getToken = () => isAuthenticated() ? credentials.accessToken: undefined;


export {init, authenticate, isAuthenticated, getToken};
