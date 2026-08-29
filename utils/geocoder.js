const nodeGeocoder = require("node-geocoder");
const options = {
    provider: "openstreetmap",
    limit:1,
    email: "harshal010@gmail.com"
};
module.exports = nodeGeocoder(options);