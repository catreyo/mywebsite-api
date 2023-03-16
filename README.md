# Node Backend API
This is the Node.js Express.js api that provides data to my personal website.
Here are the key enpoints, which can be reached at [https://atreyo-api.onrender.com](https://atreyo-api.onrender.com)/{endpoint}:
### /movies
Uses airtable to retreive a list of movie ids the corresponding ratings for them. The ids are used in the client to populate movie data.
### /shows
Uses airtable to retreive a list of show ids the corresponding ratings for them. The ids are used in the client to populate show data.
### /books
Uses airtable to retreive a list of books, including metadata, and the rating associated with each.