import {
  expect
}
from 'chai';

import buildActivityJs from '../app/services/tcx2js.js';

describe('buildActivityJs', function() {
  it('converts a TCX string with one lap and no trackpoints to JS object',
    function() {
      return expect(buildActivityJs(
        `
  <?xml version="1.0" encoding="UTF-8"?>
  <TrainingCenterDatabase xsi:schemaLocation="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd" xmlns:ns5="http://www.garmin.com/xmlschemas/ActivityGoals/v1" xmlns:ns3="http://www.garmin.com/xmlschemas/ActivityExtension/v2" xmlns:ns2="http://www.garmin.com/xmlschemas/UserProfile/v2" xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
   <Activities>
    <Activity Sport="Biking">
     <Id>2015-11-04T07:41:38Z</Id>
     <Lap StartTime="2015-11-04T07:41:38Z">
      <TotalTimeSeconds>1275</TotalTimeSeconds>
      <DistanceMeters>9276.9</DistanceMeters>
      <MaximumSpeed>36720.0</MaximumSpeed>
      <Calories>0</Calories>
      <AverageHeartRateBpm>
       <Value>119</Value>
      </AverageHeartRateBpm>
      <MaximumHeartRateBpm>
       <Value>144</Value>
      </MaximumHeartRateBpm>
      <Intensity>Active</Intensity>
      <Cadence>83</Cadence>
      <TriggerMethod>Manual</TriggerMethod>
     </Lap>
    </Activity>
   </Activities>
  </TrainingCenterDatabase>
  `
    )).to.eventually.deep.equal({
        "_id": "2015-11-04T07:41:38Z",
        "laps": [{
          "startTime": "2015-11-04T07:41:38Z",
          "averageHeartRateBpm": "119",
          "cadence": "83",
          "calories": "0",
          "distanceMeters": "9276.9",
          "intensity": "Active",
          "maximumHeartRateBpm": "144",
          "maximumSpeed": "36720.0",
          "totalTimeSeconds": "1275",
          "trackpoints": [],
        }],
        "type": "Biking"
    });
  });


  it(
    'converts a TCX string with one lap (without any attributes) and 1 trackpoint to JS object',
    function() {
      return expect(buildActivityJs(
        `
  <?xml version="1.0" encoding="UTF-8"?>
  <TrainingCenterDatabase xsi:schemaLocation="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd" xmlns:ns5="http://www.garmin.com/xmlschemas/ActivityGoals/v1" xmlns:ns3="http://www.garmin.com/xmlschemas/ActivityExtension/v2" xmlns:ns2="http://www.garmin.com/xmlschemas/UserProfile/v2" xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
   <Activities>
    <Activity>
     <Lap>
       <Track>
        <Trackpoint>
         <Time>2015-11-04T07:41:38Z</Time>
         <AltitudeMeters>15.0</AltitudeMeters>
         <DistanceMeters>6.1</DistanceMeters>
         <HeartRateBpm>
          <Value>95</Value>
         </HeartRateBpm>
         <Cadence>98</Cadence>
         <Extensions>
          <TPX xmlns="http://www.garmin.com/xmlschemas/ActivityExtension/v2">
           <Speed>0.0</Speed>
           <Watts>79</Watts>
          </TPX>
         </Extensions>
       </Trackpoint>
      </Track>
     </Lap>
    </Activity>
   </Activities>
  </TrainingCenterDatabase>
  `
    )).to.eventually.deep.equal({
        "_id": undefined,
        "laps": [{
          "startTime": undefined,
          "averageHeartRateBpm": undefined,
          "cadence": undefined,
          "calories": undefined,
          "distanceMeters": undefined,
          "intensity": undefined,
          "maximumHeartRateBpm": undefined,
          "maximumSpeed": undefined,
          "totalTimeSeconds": undefined,
          "trackpoints": [{
            "altitudeMeters": "15.0",
            "cadence": "98",
            "distanceMeters": "6.1",
            "heartRate": "95",
            "speed": "0.0",
            "time": "2015-11-04T07:41:38Z",
            "watts": "79"
          }]
        }],
        "type": undefined
    });
  });

  it(
    'converts a TCX string with one lap (without any attributes) and 1 empty trackpoint to JS object',
    function() {
      return expect(buildActivityJs(
        `
  <?xml version="1.0" encoding="UTF-8"?>
  <TrainingCenterDatabase xsi:schemaLocation="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd" xmlns:ns5="http://www.garmin.com/xmlschemas/ActivityGoals/v1" xmlns:ns3="http://www.garmin.com/xmlschemas/ActivityExtension/v2" xmlns:ns2="http://www.garmin.com/xmlschemas/UserProfile/v2" xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
   <Activities>
    <Activity>
     <Lap>
       <Track>
        <Trackpoint>
       </Trackpoint>
      </Track>
     </Lap>
    </Activity>
   </Activities>
  </TrainingCenterDatabase>
  `
    )).to.eventually.deep.equal({
        "_id": undefined,
        "laps": [{
          "startTime": undefined,
          "averageHeartRateBpm": undefined,
          "cadence": undefined,
          "calories": undefined,
          "distanceMeters": undefined,
          "intensity": undefined,
          "maximumHeartRateBpm": undefined,
          "maximumSpeed": undefined,
          "totalTimeSeconds": undefined,
          "trackpoints": [{
            "altitudeMeters": undefined,
            "cadence": undefined,
            "distanceMeters": undefined,
            "heartRate": undefined,
            "speed": undefined,
            "time": undefined,
            "watts": undefined
          }]
        }],
        "type": undefined
    });
  });

  it('builds an activity object based on TCX string with one activity (no laps) and Strava activity data object',
    function() {
      return expect(buildActivityJs(`<?xml version="1.0" encoding="UTF-8"?>
          <TrainingCenterDatabase xsi:schemaLocation="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd" xmlns:ns5="http://www.garmin.com/xmlschemas/ActivityGoals/v1" xmlns:ns3="http://www.garmin.com/xmlschemas/ActivityExtension/v2" xmlns:ns2="http://www.garmin.com/xmlschemas/UserProfile/v2" xmlns="http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
           <Activities>
            <Activity Sport="Biking">
             <Id>2015-11-04T07:41:38Z</Id>
            </Activity>
           </Activities>
          </TrainingCenterDatabase>
          `, {
            name: '1-2-3-4-3-2-1 minute intervals',
            id: 462327521,
            type: 'Rowing',
            distance: 7300,
            moving_time: 2220,
            elapsed_time: 2220,
            total_elevation_gain: 0,
            manual: true
          }))
          .to.eventually.deep.equal({
            _id: "462327521",
            name: '1-2-3-4-3-2-1 minute intervals',
            type: 'Rowing',
            distance: 7300,
            movingTime: 2220,
            elapsedTime: 2220,
            totalElevationGain: 0,
            manual: true,
            laps: []
          });
  });

  it('is rejected if empty TCX and no Strava activity data provided',
    function() {
      return expect(buildActivityJs('')).to.be.rejected;
    }
  );
});
