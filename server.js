import express from 'express';
import swig from 'swig';
import serveStatic from 'serve-static';
import serveIndex from 'serve-index';

import * as StravaAuth from './auth';
import * as Strava from './strava';


export default function startServer() {
  const app = express();

  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', __dirname + '/public/views');
  app.use(serveStatic(__dirname + '/public'));
  app.use('/public', serveIndex(__dirname + '/public'));

  StravaAuth.init(app);
  app.get('/', (req, res) => {
    if (StravaAuth.isAuthenticated()) {
      Strava.getActivities().then(
        activities => res.render('index', {
          'title': 'Activities',
          'activities': JSON.stringify(activities.map(activity => ({
            id: activity.id,
            name: activity.name,
            type: activity.type,
            startDate: activity.start_date,
            movingTime: activity.moving_time
          })))
        })
      ).catch(err => res.send({
        'access token': StravaAuth.getToken(),
        err
      }));
    } else {
      res.redirect('/login');
    }
  });

  app.get('/login', (req, res) => res.render('login', {title: 'Login'}));
  app.get('/auth/strava', StravaAuth.authenticate);

  const server = app.listen(3000, () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log(`Listening on ${host}:${port}`);
  });
}
