
const request = require('request-promise-native');

const fetchMyIP = () => {
    return request('https://api.ipify.org?format=json');
  };
  
const fetchCoordsByIP = (body) => {
    const ip = JSON.parse(body).ip;
    return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = (body) => {
    const coords = JSON.parse(body);
    const url = `http://api.open-notify.org/iss-pass.json?lat=${(coords.latitude).toString()}&lon=${(coords.longitude).toString()}`;
    return request(url);
  };

const nextISSTimesForMyLocation = () => {
    return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => body);
}
  
module.exports = { nextISSTimesForMyLocation };
