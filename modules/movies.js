'use strict';

const axios = require('axios');

let cache = {};

async function getMovies(request, response, next) {

  try {
    let city = request.query.city;

    // ***** Create key
    let key = `${city}Movie`;

    if (cache[key] && (Date.now() - cache[key].timeStamp) < 10000) {
      console.log('Movie Cache hit!');
      response.status(200).send(cache[key].data);
    } else {

      console.log('No Movie Cache');
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
      let movieData = await axios.get(url);
      let groomMovie = movieData.data.results;
      let dataToSend = groomMovie.map((movie) => new Movie(movie));

      cache[key] = {
        data: dataToSend,
        timeStamp: Date.now()
      };


      response.status(200).send(dataToSend);

    }

  } catch (error) {
    next(error);
  }

}

class Movie {
  constructor(movieObj) {
    this.title = movieObj.title;
    this.overview = movieObj.overview;
    this.vote_average = movieObj.vote_average;
    this.vote_count = movieObj.vote_count;
    this.popularity = movieObj.popularity;
    this.release_date = movieObj.release_date;
  }
}

module.exports = getMovies;
