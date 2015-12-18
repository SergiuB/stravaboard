import passport from 'passport';

let controller = (app) => {
  app.get('/auth/strava/callback',
    passport.authenticate('strava', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

  app.get('/auth/strava', passport.authenticate('strava'));
};

export {controller};
