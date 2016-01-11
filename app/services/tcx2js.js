import {
  parseString
}
from 'xml2js';

import _ from 'lodash-node';

export default function parseTcx(xmlTcx) {
  return new Promise((resolve, reject) => {
    parseString(xmlTcx, (err, res) => {
      if (err || !res) {
        reject(err ? err : 'TCX empty or not valid');
      } else {
        resolve({
          activities: res.TrainingCenterDatabase.Activities.map(
            activity => ({
              type: _.get(activity, 'Activity[0].$.Sport'),
              _id: _.get(activity, 'Activity[0].Id[0]'),
              laps: _.get(activity, 'Activity[0].Lap', []).map(
                lap => ({
                  startTime: _.get(lap, '$.StartTime'),
                  totalTimeSeconds: _.get(lap,
                    'TotalTimeSeconds[0]'),
                  distanceMeters: _.get(lap,
                    'DistanceMeters[0]'),
                  maximumSpeed: _.get(lap,
                    'MaximumSpeed[0]'),
                  calories: _.get(lap, 'Calories[0]'),
                  averageHeartRateBpm: _.get(lap,
                    'AverageHeartRateBpm[0].Value[0]'
                  ),
                  maximumHeartRateBpm: _.get(lap,
                    'MaximumHeartRateBpm[0].Value[0]'
                  ),
                  intensity: _.get(lap,
                    'Intensity[0]'),
                  cadence: _.get(lap,
                    'Cadence[0]'),
                  trackpoints: _.get(lap,
                    'Track[0].Trackpoint', []).map(
                    tp =>
                    ({
                      time: _.get(tp, 'Time[0]'),
                      altitudeMeters: _.get(tp,
                        'AltitudeMeters[0]'),
                      distanceMeters: _.get(tp,
                        'DistanceMeters[0]'),
                      heartRate: _.get(tp,
                        'HeartRateBpm[0].Value[0]'
                      ),
                      cadence: _.get(tp,
                        'Cadence[0]'),
                      speed: _.get(tp,
                        'Extensions[0].TPX[0].Speed[0]'
                      ),
                      watts: _.get(tp,
                        'Extensions[0].TPX[0].Watts[0]'
                      )
                    }))
                }))
            }))
        });
      }
    });
  });
}
