// API key and base URLs
const apiKey = "39d293b51ff8faa77ba06732b165d3e0";
const apiBaseUrl = "https://api.themoviedb.org/3";
const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

// DOM elements
const moviesGrid = document.getElementById("movies-grid");
const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const watchList = document.getElementById("watchlist");
const home = document.getElementById("home");

// Fetches currently playing movies and displays them
async function fetchMovies() {
    const response = await fetch(`${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`);
    const jsonResponse = await response.json();
    const movies = await Promise.all(
        jsonResponse.results.map(async (movie) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            ImdbId: await getMovieDetails(movie.id)
        }))
    );

    displayMovies(movies);
}

// Displays favorite movies
async function displayFavoriteMovies() {
    // Retrieve favorites from local storage or initialize an empty array
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const movies = await Promise.all(
    favorites.map(async (movieId) => {
      const response = await fetch(
        `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`
      );
      const movie = await response.json();
      const imdbId = await getMovieDetails(movieId);

      return {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        ImdbId: imdbId,
      };
    })
  );

  displayMovies(movies);
}

// Searches movies based on the provided movie name
async function searchMovies(movieName) {
  const response = await fetch(
    `${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${movieName}`
  );
  const jsonResponse = await response.json();
  const movies = await Promise.all(
    jsonResponse.results.map(async (movie) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      ImdbId: await getMovieDetails(movie.id),
    }))
  );
  displayMovies(movies);
}

// Displays movies on the web page
function displayMovies(movies) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
    moviesGrid.innerHTML = movies
      .map(movie => {
        const isFavorite = favorites.includes(String(movie.id));
        const buttonLabel = isFavorite ? "- WatchList" : "+ WatchList";
        const buttonClass = isFavorite ? "favorite-button active" : "favorite-button";
  
        return `<div class="movie-card">
            <img src="${imageBaseUrl}${movie.poster_path}" />
            <p>⭐️ ${movie.vote_average}</p>
            <button class="${buttonClass}" data-movie-id="${movie.id}">${buttonLabel}</button>
            <a href="https://www.imdb.com/title/${movie.ImdbId}/">
            <h1>${movie.title}</h1>
          </a>
          
        </div>`;
      })
      .join("");
  
    // Add event listeners to the favorite buttons
    const favoriteButtons = document.querySelectorAll(".favorite-button");
    favoriteButtons.forEach(button => {
      button.addEventListener("click", toggleFavorite);
    });
}

// Toggles the movie as favorite or removes it from favorites
function toggleFavorite(event) {
    const movieId = event.target.dataset.movieId;
    let favorites = JSON.parse(localStorage.getItem("favorites"))
        // Retrieve favorites from local storage or initialize empty array
        favorites = favorites || [];

        if (!favorites.includes(movieId)) {
          // Add movie to favorites
          favorites.push(movieId);
          event.target.classList.add("active");
          event.target.innerText = "- WatchList";
        } else {
          // Remove movie from favorites
          favorites = favorites.filter(id => id !== movieId);
          event.target.classList.remove("active");
          event.target.innerText = "+ WatchList";
        }
    
        // Update favorites in local storage
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    
    // Handles search form submission
    function searchSubmit(event) {
        event.preventDefault();
        const inputQuery = searchInput.value;
    
        if (inputQuery == "") {
          // If search input is empty, fetch currently playing movies
          fetchMovies();
          return;
        }
        // Search movies based on input query
        searchMovies(inputQuery);
    }
    
    // Fetches the IMDb ID of a movie
    async function getMovieDetails(movieId) {
        const response = await fetch(`${apiBaseUrl}/movie/${movieId}/external_ids?api_key=${apiKey}`);
        const jsonResponse = await response.json();
    
        return jsonResponse.imdb_id;
    }
    
    // Add event listeners
    searchForm.addEventListener("submit", searchSubmit);
    watchList.addEventListener("click", displayFavoriteMovies);
    home.addEventListener("click", fetchMovies);
    
    // Fetch currently playing movies on page load
    fetchMovies();
    