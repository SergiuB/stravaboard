import {
  parseString
}
from 'xml2js';

import _ from 'lodash-node';

function getActivityJs(activity) {
  return {
    type: _.get(activity, 'Activity[0].$.Sport'),
    _id: _.get(activity, 'Activity[0].Id[0]'),
    laps: _.get(activity, 'Activity[0].Lap', []).map(
      lap => ({
        startTime: _.get(lap, '$.StartTime'),
        totalTimeSeconds: _.get(lap, 'TotalTimeSeconds[0]'),
        distanceMeters: _.get(lap, 'DistanceMeters[0]'),
        maximumSpeed: _.get(lap, 'MaximumSpeed[0]'),
        calories: _.get(lap, 'Calories[0]'),
        averageHeartRateBpm: _.get(lap, 'AverageHeartRateBpm[0].Value[0]'),
        maximumHeartRateBpm: _.get(lap, 'MaximumHeartRateBpm[0].Value[0]'),
        intensity: _.get(lap, 'Intensity[0]'),
        cadence: _.get(lap, 'Cadence[0]'),
        trackpoints: _.get(lap, 'Track[0].Trackpoint', []).map(
          tp =>
          ({
            time: _.get(tp, 'Time[0]'),
            altitudeMeters: _.get(tp, 'AltitudeMeters[0]'),
            distanceMeters: _.get(tp, 'DistanceMeters[0]'),
            heartRate: _.get(tp, 'HeartRateBpm[0].Value[0]'),
            cadence: _.get(tp, 'Cadence[0]'),
            speed: _.get(tp, 'Extensions[0].TPX[0].Speed[0]'),
            watts: _.get(tp, 'Extensions[0].TPX[0].Watts[0]')
          }))
      }))
  };
}

export default function buildActivityJs(xmlTcx, activityStrava) {
  return new Promise((resolve, reject) => {
    parseString(xmlTcx, (err, res) => {
      if (err || (!res && !activityStrava)) {
        reject(err ? err : 'TCX empty and no Strava data provided');
      } else {
        let tcxActivity = _.get(res, 'TrainingCenterDatabase.Activities[0]');
        let activityJs = tcxActivity ? getActivityJs(tcxActivity): {};
        if (activityStrava) {
          _.assign(activityJs, {
            _id: ""+activityStrava.id,
            name: activityStrava.name,
            type: activityStrava.type,
            distance: activityStrava.distance,
            movingTime: activityStrava.moving_time,
            elapsedTime: activityStrava.elapsed_time,
            totalElevationGain: activityStrava.total_elevation_gain,
            manual: activityStrava.manual
          });
        }
        resolve(activityJs);
      }
    });
  });
}
