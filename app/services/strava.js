import fs from 'fs';
import request from 'request';
import cheerio from 'cheerio';

import * as Strava from 'strava-v3';
import * as StravaPassport from '../services/strava-passport';

let getActivities = (page, perPage, allFields) => {
  return new Promise((resolve, reject) => {
    Strava.athlete.listActivities({
      access_token: StravaPassport.getToken(),
      page: page || 1,
      per_page: perPage || 10
    }, (err, activities) => {
      if (err) {
        reject(err);
      } else {
        resolve(allFields ? activities : activities.map(activity => ({
          id: activity.id,
          name: activity.name,
          type: activity.type,
          startDate: activity.start_date,
          movingTime: activity.moving_time
        })));
      }
    });
  });
};

let getAllActivities = () => {
  return new Promise((resolve, reject) => {
    const perPage = 100;
    let fn = (curPage, allActivities) => {
      getActivities(curPage, perPage).then(
        activities => {
          if (!activities.length) {
            resolve(allActivities);
          } else {
            fn(curPage + 1, allActivities.concat(activities));
          }
        }
      ).catch(err => reject(err));
    };

    fn(1, [], );
  });
};

let saveActivityTcx = (activityId, email, password, user) => {
  return new Promise((resolve, reject) => {
    var jar, requestWCookie;
    if (!user.scrapingSession) {
      console.log(`user ${user} first time scraping`);
      // user not logged in using web scraping
      jar = request.jar();
      requestWCookie = request.defaults({jar});
      user.scrapingSession = {jar};

      requestWCookie(
        `http://www.strava.com/activities/${activityId}/export_tcx`,
        function(error, _, body) {
          let $ = cheerio.load(body);
          let authenticity_token = $('input[name="authenticity_token"]')
            .attr('value');
          let utf8 = $('input[name="utf8"]').attr('value');
          let plan = $('input[name="plan"]').attr('value');
          let msg = requestWCookie.post({
            url: 'https://www.strava.com/session',
            formData: {
              utf8,
              authenticity_token,
              plan,
              email,
              password
            },
            followAllRedirects: true
          }, (err, response, body) => {
            console.log('done scraping');
            resolve(body);
          });
        });
    } else {
      console.log(`user ${user} already authenticated`);
      jar = user.scrapingSession.jar;
      requestWCookie = request.defaults({jar});
      let msg = requestWCookie(
        `http://www.strava.com/activities/${activityId}/export_tcx`,
        (err, response, body) => {
          console.log('done scraping');
          resolve(body);
      });
    }
  });
};

export {
  getActivities, getAllActivities, saveActivityTcx
};
