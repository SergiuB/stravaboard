import fs from 'fs';
import http from 'http';
import request from 'request';
import cheerio from 'cheerio';

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

  app.post('/activities/:id/saveTcx', StravaPassport.loggedIn, (req, res) => {
    const activityId = req.params.id;
    var jar, requestWCookie;
    if (!req.user.scrapingSession) {
      // user not logged in using web scraping
      jar = request.jar();
      requestWCookie = request.defaults({jar});
      req.user.scrapingSession = {jar};

      requestWCookie(`http://www.strava.com/activities/${activityId}/export_tcx`, function(error, res, body) {
        var $ = cheerio.load(body);
        var authenticity_token= $('input[name="authenticity_token"]').attr('value');
        var utf8 = $('input[name="utf8"]').attr('value');
        var plan = $('input[name="plan"]').attr('value');
        requestWCookie.post({url:'https://www.strava.com/session', formData: {
          utf8,
          authenticity_token,
          plan,
          email: 'buciuc_sergiu@yahoo.com',
          password: 'sergiu123'
        },followAllRedirects: true}).pipe(fs.createWriteStream(`activity_${activityId}.tcx`));
      });
    } else {
      console.log(`user ${req.user} already authenticated`);
      jar = req.user.scrapingSession.jar;
      requestWCookie = request.defaults({jar});
      requestWCookie(`http://www.strava.com/activities/${activityId}/export_tcx`)
        .pipe(fs.createWriteStream(`activity_${activityId}.tcx`));
    }
  });
};

export {controller};
