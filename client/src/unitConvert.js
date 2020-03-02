
// converts strava default distance (m) to miles or km based on preference
const distConvert = (distance_units, distInMeters) => {
  let dist = distance_units === 'miles' ? (distInMeters / 1609.34) : distInMeters/1000;
  return dist.toFixed(1);
};

// time in secs to hours
const timeConvert = (timeInSecs) => {
  return (timeInSecs / 60 / 60).toFixed(1);
};

export { distConvert, timeConvert };