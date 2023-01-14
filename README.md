# Node Backend API
This is the Node.js Express.js api that provides data to my personal website.
Here are the key enpoints, which can be reached at [https://atreyo-api.onrender.com](https://atreyo-api.onrender.com)/{endpoint}:
### /movies
Uses axios to call the TMDB api to retreive a list of movies and my ratings for them, then sorts the values by rating and returns the list.
### /shows
Uses axios to call the TMDB api to retreive a list of tv shows and my ratings for them, then sorts the values by rating and returns the list.
### /books
Uses the airtable library to retreive data from an airtable database containing information about books I've read and what I rate them.
