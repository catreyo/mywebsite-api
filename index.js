require('dotenv').config();

const express = require("express");
const axios = require("axios");

var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});
var base = Airtable.base('appAHV7tmLu00dtqm');

const PORT = process.env.PORT || 4000;

const app = express();

app.get("/movies", (req, res) => {
  axios.get('https://api.themoviedb.org/4/account/63aa272cb3316b007a8c0722/movie/rated', {
    params: {
      page: req.query.page
    },
    headers: {
      Authorization: 'Bearer ' + process.env.TMDB_BEARER
    }
  })
  .then((response) => {
    var movies = {max_pages: response.data.total_pages}
    movies.data = response.data.results.map((element) => ({
      title: element.title,
      year: element.release_date.split('-')[0],
      rating: element.account_rating.value,
      image: 'https://image.tmdb.org/t/p/w500' + element.poster_path
    })).sort((a, b) => parseInt(b.rating) - parseInt(a.rating))
    res.send(movies)
  })
  .catch((err) => console.log(err));
});

app.get("/shows", (req, res) => {
  axios.get('https://api.themoviedb.org/4/account/63aa272cb3316b007a8c0722/tv/rated', {
    params: {
      page: req.query.page
    },
    headers: {
      Authorization: 'Bearer ' + process.env.TMDB_BEARER
    }
  })
  .then((response) => {
    var movies = {max_pages: response.data.total_pages}
    movies.data = response.data.results.map((element) => ({
      title: element.name,
      year: element.first_air_date.split('-')[0],
      rating: element.rating,
      image: 'https://image.tmdb.org/t/p/w500' + element.poster_path
    })).sort((a, b) => parseInt(b.rating) - parseInt(a.rating))
    res.send(movies)
  })
  .catch((err) => console.log(err));
});

app.get("/books", (req, res) => {
  base('Books').select({
    view: 'Grid view'
  }).firstPage(function(err, records) {
    if (err) { console.error(err); return; }
    var books  = records.map((element) => ({
      title: element.fields.Title,
      year: element.fields.Year,
      author: element.fields.Author,
      rating: element.fields.Rating,
      image: element.fields.Image
    }))
    res.send(books);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});