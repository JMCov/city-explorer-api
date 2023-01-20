'use strict';

console.log('Server Online');

// ***** Requires *****

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');
const app = express();



// ***** MIDDLEWARE
// ***** cors is a security guard that allows us to share resources across the internet
app.use(cors());


const PORT = process.env.PORT || 3002;


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
