


// fetchISSFlyOverTimes API is removed online, can't request anymore.



/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {

  const request = require('request');
  const webAddr = 'https://api.ipify.org?format=json';

  request(webAddr, (error, response, body) => {
  
    if (error) {
      callback(error, undefined);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const data = JSON.parse(body);
    callback(null, data.ip);
        
  });
};
  

const fetchCoordsByIP = function(ip, callback) {

  const request = require('request');
  const key = '1c3d0cb0-4fda-11ec-b523-bd03e8eeb3e8';
  const webAddr = `https://api.freegeoip.app/json/${ip}?apikey=${key}`;

  request(webAddr, (error, response, body) => {
    
    if (error) {
      callback(error, undefined);
      return;
    }
  
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching fetchCoordsByIP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
      
    const data = JSON.parse(body);
    const res = { latitude: data.latitude, longitude: data.longitude };
    callback(null, res);
          
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      console.log("IP fetching didn't work!");
      callback(error, null);
      return;
    }
      
    console.log('IP fetching worked! Returned IP:' , ip);
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        console.log("Coords fetching didn't work!");
        callback(error, null);
        return;
      }
        
      console.log('Coords fetching worked! Returned Coords:' , coords);
      fetchISSFlyOverTimes(coords, (error, time) => {
        if (error) {
          console.log("ISS fetching didn't work!");
          callback(error, null);
          return;
        }
          
        console.log('ISS fetching worked! Returned ISS:' , time);
        callback(null, time);
      });
    });
      
  });

};


module.exports = { nextISSTimesForMyLocation };