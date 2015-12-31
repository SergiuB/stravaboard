import {
  expect
}
from 'chai';

import parseTcx from '../app/services/tcx2js.js';

var tcxXml =
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
     <Trackpoint>
      <AltitudeMeters>15.0</AltitudeMeters>
      <DistanceMeters>12.1</DistanceMeters>
      <HeartRateBpm>
       <Value>95</Value>
      </HeartRateBpm>
      <Cadence>120</Cadence>
      <Extensions>
       <TPX xmlns="http://www.garmin.com/xmlschemas/ActivityExtension/v2">
        <Speed>0.0</Speed>
        <Watts>103</Watts>
       </TPX>
      </Extensions>
     </Trackpoint>
     <Trackpoint>
      <Time>2015-11-04T07:41:40Z</Time>
      <DistanceMeters>18.1</DistanceMeters>
      <HeartRateBpm>
       <Value>95</Value>
      </HeartRateBpm>
      <Cadence>134</Cadence>
      <Extensions>
       <TPX xmlns="http://www.garmin.com/xmlschemas/ActivityExtension/v2">
        <Speed>0.0</Speed>
        <Watts>103</Watts>
       </TPX>
      </Extensions>
     </Trackpoint>
     <Trackpoint>
      <Time>2015-11-04T07:41:41Z</Time>
      <AltitudeMeters>15.0</AltitudeMeters>
      <HeartRateBpm>
       <Value>95</Value>
      </HeartRateBpm>
      <Cadence>117</Cadence>
      <Extensions>
       <TPX xmlns="http://www.garmin.com/xmlschemas/ActivityExtension/v2">
        <Speed>0.0</Speed>
        <Watts>90</Watts>
       </TPX>
      </Extensions>
     </Trackpoint>
     <Trackpoint>
      <Time>2015-11-04T07:41:42Z</Time>
      <AltitudeMeters>15.0</AltitudeMeters>
      <DistanceMeters>30.5</DistanceMeters>
      <HeartRateBpm>
      </HeartRateBpm>
      <Cadence>100</Cadence>
      <Extensions>
       <TPX xmlns="http://www.garmin.com/xmlschemas/ActivityExtension/v2">
        <Speed>6.1</Speed>
        <Watts>90</Watts>
       </TPX>
      </Extensions>
     </Trackpoint>
     <Trackpoint>
      <Time>2015-11-04T07:41:43Z</Time>
      <AltitudeMeters>15.0</AltitudeMeters>
      <DistanceMeters>36.3</DistanceMeters>
      <Cadence>106</Cadence>
      <Extensions>
       <TPX xmlns="http://www.garmin.com/xmlschemas/ActivityExtension/v2">
        <Speed>6.0</Speed>
        <Watts>92</Watts>
       </TPX>
      </Extensions>
     </Trackpoint>
     <Trackpoint>
      <Time>2015-11-04T07:41:44Z</Time>
      <AltitudeMeters>15.0</AltitudeMeters>
      <DistanceMeters>42.2</DistanceMeters>
      <HeartRateBpm>
       <Value>95</Value>
      </HeartRateBpm>
      <Extensions>
       <TPX xmlns="http://www.garmin.com/xmlschemas/ActivityExtension/v2">
        <Speed>6.0</Speed>
        <Watts>92</Watts>
       </TPX>
      </Extensions>
     </Trackpoint>
     <Trackpoint>
      <Time>2015-11-04T07:41:45Z</Time>
      <AltitudeMeters>15.0</AltitudeMeters>
      <DistanceMeters>48.1</DistanceMeters>
      <HeartRateBpm>
       <Value>95</Value>
      </HeartRateBpm>
      <Cadence>103</Cadence>
     </Trackpoint>
     <Trackpoint>
      <Time>2015-11-04T07:41:46Z</Time>
      <AltitudeMeters>15.0</AltitudeMeters>
      <DistanceMeters>54.2</DistanceMeters>
      <HeartRateBpm>
       <Value>95</Value>
      </HeartRateBpm>
      <Cadence>91</Cadence>
      <Extensions>
       <TPX xmlns="http://www.garmin.com/xmlschemas/ActivityExtension/v2">
        <Speed>6.0</Speed>
       </TPX>
      </Extensions>
     </Trackpoint>
    </Track>
   </Lap>
   <Lap StartTime="2015-11-04T08:40:42Z">
    <TotalTimeSeconds>322</TotalTimeSeconds>
    <DistanceMeters>1940.95</DistanceMeters>
    <MaximumSpeed>27000.0</MaximumSpeed>
    <Calories>0</Calories>
    <AverageHeartRateBpm>
     <Value>123</Value>
    </AverageHeartRateBpm>
    <MaximumHeartRateBpm>
     <Value>144</Value>
    </MaximumHeartRateBpm>
    <Intensity>Active</Intensity>
    <Cadence>81</Cadence>
    <TriggerMethod>Manual</TriggerMethod>
    <Track>
     <Trackpoint>
      <Time>2015-11-04T08:40:42Z</Time>
      <AltitudeMeters>16.6</AltitudeMeters>
      <DistanceMeters>28582.9</DistanceMeters>
      <HeartRateBpm>
       <Value>125</Value>
      </HeartRateBpm>
      <Cadence>66</Cadence>
      <Extensions>
       <TPX xmlns="http://www.garmin.com/xmlschemas/ActivityExtension/v2">
        <Speed>7.5</Speed>
        <Watts>41</Watts>
       </TPX>
      </Extensions>
     </Trackpoint>
     <Trackpoint>
      <Time>2015-11-04T08:40:43Z</Time>
      <AltitudeMeters>16.6</AltitudeMeters>
      <DistanceMeters>28589.1</DistanceMeters>
      <HeartRateBpm>
       <Value>125</Value>
      </HeartRateBpm>
      <Cadence>0</Cadence>
      <Extensions>
       <TPX xmlns="http://www.garmin.com/xmlschemas/ActivityExtension/v2">
        <Speed>7.1</Speed>
        <Watts>41</Watts>
       </TPX>
      </Extensions>
     </Trackpoint>
    </Track>
   </Lap>
  </Activity>
 </Activities>
</TrainingCenterDatabase>
`;

var tcxJs = {

};

describe('parseTcx', function() {
  it('converts a TCX string wit one lap and no trackpoints to JS object',
    function() {
      return expect(parseTcx(
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
        "activities": [{
          "id": "2015-11-04T07:41:38Z",
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
        }]
      });
    });
});


describe('parseTcx', function() {
  it(
    'converts a TCX string wit one lap (without any attributes) and 1 trackpoint to JS object',
    function() {
      return expect(parseTcx(
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
        "activities": [{
          "id": undefined,
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
        }]
      });
    });
});


describe('parseTcx', function() {
  it(
    'converts a TCX string wit one lap (without any attributes) and 1 empty trackpoint to JS object',
    function() {
      return expect(parseTcx(
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
        "activities": [{
          "id": undefined,
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
        }]
      });
    });
});
