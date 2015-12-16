import express from 'express';
import passport from 'passport';
import {Strategy as StravaStrategy} from 'passport-strava-oauth2';

import oauthIds from './oauth';

export default function startServer() {
  const app = express();
    // serialize and deserialize
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
      process.nextTick(function () {
        return done(null, profile);
      });
    }
  ));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', (req, res) => res.send('Hello World'));

  app.get('/auth/strava',
    passport.authenticate('strava'));

  app.get('/auth/strava/callback',
    passport.authenticate('strava', { failureRedirect: '/login' }),
    (req, res) => {
      console.log('success!');
      // Successful authentication, redirect home.
      res.redirect('/');
    });

  const server = app.listen(3000, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log(`Listening on ${host}:${port}`);
  })
}
