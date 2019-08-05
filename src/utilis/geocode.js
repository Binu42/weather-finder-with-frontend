const request = require('request');

// function for finding latitude and longitude of given place
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2JpbnU0MiIsImEiOiJjanlpN2F1NTAwN2Q2M2NueHIwejdlMDFmIn0.fswJto5sPhUkQjxQAC-FRw&limit=1';
    request({
        url: url,
        json: true
    }, (error, {body}) => {
        // when there is no connection with api
        if (error) {
            callback('unable to connect to Location Service.', undefined);
        } else if (body.features.length === 0) {
            // when no place exist for the address
            callback('Location does not exit. try anyother place', undefined);
        } else {
            var features = body.features[0];
            callback(undefined, {
                latitude: features.center[1],
                longitude: features.center[0],
                location: features.place_name
            })
        }
    })
}

module.exports = geoCode;