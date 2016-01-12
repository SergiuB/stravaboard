import fs from 'fs';

import * as StravaPassport from '../services/strava-passport';
import * as Strava from '../services/strava';
import buildActivityJs from '../services/tcx2js';
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
    const activityStrava = req.body;
    Activity.find({_id: activityId}, (err, activities) => {
      if (activities.length) {
        res.status(500).send(`Activity ${activities[0].name} already in db.`);
      } else {        
        Strava.saveActivityTcx(activityId, 'buciuc_sergiu@yahoo.com', 'sergiu123', req.user)
          .then(tcxXml => buildActivityJs(tcxXml, activityStrava))
          .then(activityJs => {
            const activity = new Activity(activityJs);
            activity.save(function (err) {
              err ? res.status(500).send(`Error saving activity ${activityJs.name}.`)
                : res.sendStatus(200);
            });
          })
          .catch(errorHandler(res));
      }
    });

  });
};

export {
  controller
};
