'use strict';

const axios = require('axios');

async function getWeather(request, response, next) {

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
}



class Forecast {
  constructor(cityObj) {
    this.date = cityObj.valid_date;
    this.description = cityObj.weather.description;
  }
}




module.exports = getWeather;
