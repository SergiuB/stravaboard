import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var lapSchema = new Schema({
  startTime: Date,
  totalTimeSeconds: Number,
  distanceMeters: Number,
  maximumSpeed: Number,
  calories: Number,
  averageHeartRateBpm: Number,
  maximumHeartRateBpm: Number,
  intensity: String,
  cadence: Number,
  trackpoints: [{
      time: Date,
      altitudeMeters: Number,
      distanceMeters:Number,
      heartRate: Number,
      cadence: Number,
      speed: Number,
      watts: Number
  }]
});

var activitySchema = new Schema({
  _id: String,
  type: String,
  name: String,
  distance: Number,
  movingTime: Number,
  elapsedTime: Number,
  totalElevationGain: Number,
  manual: Boolean,
  laps: [lapSchema]
});

var Lap = mongoose.model('Lap', lapSchema);
var Activity = mongoose.model('Activity', activitySchema);

export {Lap, Activity};
