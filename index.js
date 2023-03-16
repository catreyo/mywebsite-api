require('dotenv').config();

const express = require("express");

var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.AIRTABLE_API_KEY
});
var base = Airtable.base('appAHV7tmLu00dtqm');

const PORT = process.env.PORT || 4000;

const app = express();

app.get("/movies", (req, res) => {
  base('Movies').select({
    view: 'Grid view'
  }).firstPage(function(err, records) {
    if (err) { console.error(err); return; }
    var movies  = records.map((element) => ({
      id: element.fields.id,
      visuals: element.fields.visuals,
      plot: element.fields.plot,
      enjoyment: element.fields.enjoyment,
      score: element.fields.score
    }))
    // For local development
    //res.set({'Access-Control-Allow-Origin': '*'}).send(movies);
    // For production deploy
    res.send(movies);
  });
});

app.get("/shows", (req, res) => {
  base('Shows').select({
    view: 'Grid view'
  }).firstPage(function(err, records) {
    if (err) { console.error(err); return; }
    var shows  = records.map((element) => ({
      id: element.fields.id,
      visuals: element.fields.visuals,
      plot: element.fields.plot,
      enjoyment: element.fields.enjoyment,
      score: element.fields.score
    }))
    // For local development
    //res.set({'Access-Control-Allow-Origin': '*'}).send(shows);
    // For production deploy
    res.send(shows);
  });
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