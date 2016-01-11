import fs from 'fs';

import * as StravaPassport from '../services/strava-passport';
import * as Strava from '../services/strava';
import parseTcx from '../services/tcx2js';
import {Activity} from '../models/models';

function errorHandler (res) {
  return (err) => res.status(500).send(err);
}

let controller = (app) => {
  app.get('/', StravaPassport.loggedIn,
    (req, res) => res.render('index', {'title': 'Activities'})
  );

  app.get('/activities', StravaPassport.loggedIn, (req, res) => {
    let page = req.query.page;
    let perPage = req.query.perPage;
    let allFields = !!req.query.allFields;

    Strava.getActivities(page, perPage, allFields).then(
      activities => res.send(activities)
    ).catch(errorHandler(res));
  });

  app.get('/activities/saveTcx', StravaPassport.loggedIn, (req, res) => {
    Strava.getAllActivities()
      .then(activities => res.send(activities))
      .catch(errorHandler(res));
  });

  app.post('/activities/:id/saveTcx', StravaPassport.loggedIn, (req, res) => {
    const activityId = req.params.id;
    console.log('saving activity ' + activityId);
    Strava.saveActivityTcx(activityId, 'buciuc_sergiu@yahoo.com', 'sergiu123', req.user)
      .then(tcxXml => parseTcx(tcxXml))
      .then(tcxJs => {
        console.log('activity converted to JS');
        const activityJs = tcxJs.activities[0]; // assuming only one activity in tcx
        Activity.find({_id: activityJs._id}, (err, activities) => {
          if (activities.length) {
            res.status(500).send(`Activity ${activityJs._id} already in db`);
          } else {
            const activity = new Activity(activityJs);
            activity.save(function (err) {
              if (err) {
                console.log(err);
                res.status(500).send(`Error saving activity ${activityJs._id}.`);
              }
              res.sendStatus(200);
            });
          }
        });
      })
      .catch(errorHandler(res));
  });
};

export {
  controller
};
