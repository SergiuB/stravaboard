import * as StravaPassport from '../services/strava-passport';
import * as Strava from '../services/strava';

let controller = (app) => {

  app.get('/', StravaPassport.loggedIn, (req, res) => {
    Strava.getActivities().then(
      activities => res.render('index', {
        'title': 'Activities',
        'activities': JSON.stringify(activities)
      })
    ).catch(err => res.status(500).send({
      'access token': StravaAuth.getToken(),
      err
    }));
  });

  app.get('/activities', StravaPassport.loggedIn, (req, res) => {
    let page = req.query.page;
    let perPage = req.query.perPage;

    Strava.getActivities(page, perPage).then(
      activities => res.send(activities)
    ).catch(err => res.status(500).send({
      err
    }));
  });

  app.get('/activities/saveTcx', StravaPassport.loggedIn, (req, res) => {
    Strava.getAllActivities()
      .then(activities => res.send(activities))
      .catch(err => res.status(500).send(err));
  });

  app.post('/activities/:id/saveTcx', StravaPassport.loggedIn, (req, res) => {
    const activityId = req.params.id;
    console.log('saving activity ' + activityId);
    Strava.saveActivityTcx(activityId, req.user).then(
      () => res.end()
    ).catch(err => res.status(500).send({
      err
    }));
  });
};

export {
  controller
};
