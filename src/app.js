const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();

// importing of forecast and geocode
const forecast = require("./utilis/forecast");
const geocode = require("./utilis/geocode");

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// for home route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Binu Kumar'
    });
});

// for about route
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Binu Kumar'
    });
});

// for help route
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Binu Kumar'
    });
});

// for weather route
app.get('/weather', (req, res) => {
    // accepting location to find geocode using query not post...
    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        // if there is not error than finding weather condition
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            // sending location and forcast of fetched weather
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

// route for 404 error including help
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Binu Kumar',
        errorMessage: 'Help article not found.'
    });
});

// route for 404 error
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Binu Kumar',
        errorMessage: 'Page not found.'
    });
});

// application listening at port 3000 or deployed port
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up on port 3000.')
});