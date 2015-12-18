import * as Strava from 'strava-v3';
import * as StravaPassport from '../services/strava-passport';

let getActivities = () => {
  return new Promise((resolve, reject) => {
    Strava.athlete.listActivities(
      {access_token: StravaPassport.getToken()},
      (err, payload) => {
        if (err) {
          reject(err);
        }
        resolve(payload);
      });
  });
};

export {getActivities};
