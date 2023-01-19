'use strict';

console.log('First Server');

// ***** Requires *****

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');


// **** Don't forget to require your starter JSON

// let data = require('./data/weather.json');


// ***** once express is in we need to use it
// ***** app === server
const app = express();



// ***** MIDDLEWARE
// ***** cors is a security guard that allows us to share resources across the internet
app.use(cors());


// ***** Define a port for server to run on
const PORT = process.env.PORT || 3002;

// ***** ENDPOINTS
// ***** Base endpoint - proof of life
// ***** 1st rg - endpoint in quotes
// ***** 2nd arg - callback which will execute when someone hits that point

// ***** Callback function - 2 parameters: request, response (req,res)
app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server');
});

app.get('/weather', getWeather);
app.get('/movies', getMovies);

// ***** Class to groom bulky data were moved to module





// ****** CATCH ALL ENDPOINT - NEEDS TO BE LAST DEFINED ENDPOINT

app.get('*', (request, response) => {
  response.status(404).send('This page does not exist');
});


// ***** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// *****Server Start

app.listen(PORT, () => console.log(`We are running on port: ${PORT}`));
