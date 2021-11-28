

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, body) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(body);
});
