'use strict';

console.log('First Server');

// ***** Requires *****

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const axios = require('axios');

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

app.get('/movies', async (request, response, next) =>{
  try {
    let city = request.query.city
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
    let movieData = await axios.get(url);
    // console.log('Movie Data', movieData);
    let groomMovie = movieData.data.results;
    // console.log('groom Movie', groomMovie);
    let dataToSend = groomMovie.map((movie) => new Movie(movie))
    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }



});


app.get('/weather', async (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;
    let weatherData = await axios.get(url);
    // console.log('Here is the weather data', weatherData);


    let groomWeather = weatherData.data.data;
   
    let dataToSend = groomWeather.map((day) => new Forecast(day));

    // console.log('second log', dataToSend);
    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }

});


// ***** Class to groom bulky data

class Forecast {
  constructor(cityObj) {
    this.date = cityObj.valid_date;
    this.description = cityObj.weather.description;
  }
}

class Movie {
  constructor(movieObj){
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.vote_average = movieObj.vote_average;
    this.vote_count = movieObj.vote_count;
    this.popularity = movieObj.popularity;
    this.release_date = movieObj.release_date;
  }
}


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
