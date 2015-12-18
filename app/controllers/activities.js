import * as StravaPassport from '../services/strava-passport';
import * as Strava from '../services/strava';

let controller = (app) => {
  app.get('/', StravaPassport.loggedIn, (req, res) => {
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
  });
};

export {controller};
