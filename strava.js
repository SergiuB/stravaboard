import * as Strava from 'strava-v3';
import * as StravaAuth from './auth';

let getActivities = () => {
  return new Promise((resolve, reject) => {
    Strava.athlete.listActivities(
      {access_token: StravaAuth.getToken()},
      (err, payload) => {
        if (err) {
          reject(err);
        }
        resolve(payload);
      });
  });
};

export {getActivities};
