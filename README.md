# JavaScript Movie App

This is a JavaScript Movie App that allows users to browse and search for movies using The Movie Database (TMDb) API. Users can view currently playing movies, search for movies by name, and add/remove movies to/from their watchlist.

## Features

- Display currently playing movies
- Search movies by name
- View movie details on IMDb
- Add movies to the watchlist
- Remove movies from the watchlist

## Setup

To use the JavaScript Movie App, follow these steps:

1. Obtain an API key from [The Movie Database (TMDb)](https://www.themoviedb.org/) by creating an account and generating an API key.
2. Replace the `apiKey` variable in `script.js` with your own API key.
3. Open the `index.html` file in a web browser.

## Usage

- On page load, the app fetches and displays the currently playing movies.
- Use the search input to search for movies by name.
- Click on the "WatchList" button to add or remove a movie from your watchlist.
- Click on the movie title to view the movie details on IMDb.
- Use the "Home" button to go back to the list of currently playing movies.

## Code Explanation

- The app utilizes the TMDb API to fetch movie data, including currently playing movies and movie details.
- The `fetchMovies()` function retrieves and displays the currently playing movies.
- The `displayFavoriteMovies()` function retrieves and displays the movies added to the watchlist.
- The `searchMovies()` function searches for movies based on the provided movie name.
- The `displayMovies()` function displays the movies on the web page, including movie posters, ratings, watchlist status, and IMDb links.
- The `toggleFavorite()` function adds or removes a movie from the watchlist and updates the UI accordingly.
- The `searchSubmit()` function handles the search form submission.
- The `getMovieDetails()` function fetches the IMDb ID of a movie.
- Event listeners are added to handle user interactions such as search submissions and watchlist clicks.


## Browser Compatibility

This JavaScript Movie App is compatible with modern web browsers that support JavaScript.
