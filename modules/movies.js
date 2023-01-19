'use strict';

const axios = require('axios');

async function getMovies(request, response, next) {

  try {
    let city = request.query.city
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;
    let movieData = await axios.get(url);
    // console.log('Movie Data', movieData);
    let groomMovie = movieData.data.results;
    // console.log('groom Movie', groomMovie);
    let dataToSend = groomMovie.map((movie) => new Movie(movie));
    response.status(200).send(dataToSend);
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
