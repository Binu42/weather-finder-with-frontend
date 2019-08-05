const request = require('request')

// function for fetching forcast of given latitude and longitude
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/99169618d3ded5d1ffb4bad7472c5864/'+ latitude + ',' + longitude + '?units=si&exclude=[hourly%20minutely]';

    request({ url, json: true }, (error, { body }) => {
        // this error if net connectiion is not there
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            // this error when user give some unknown place location
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + '  °C out. There is a ' + body.currently.precipProbability + '% chance of rain.' + "Today Highest Temperature is " + body.daily.data[0].temperatureHigh + '°C, Lowest Temperature is ' + body.daily.data[0].temperatureLow + '°C. Weekely summary is ' + body.daily.summary);
        }
    })
}

module.exports = forecast