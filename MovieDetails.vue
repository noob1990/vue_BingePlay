<template>
  <div class="movie-details-container" v-if="movie">
    <h2>{{ movie.title }}</h2>

    <div class="movie-details">
      <img
        :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
        alt="Movie Poster"
        class="movie-poster"
      />
      <div class="movie-info">
        <p><strong>Overview:</strong> {{ movie.overview }}</p>
        <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
        <p><strong>Rating:</strong> {{ movie.vote_average }} / 10</p>
        
        <!-- Add to Watchlist Button -->
        <button v-if="isAuthenticated" @click="addToWatchlist" class="watchlist-button">Add to Watchlist</button>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movie: null,  // Store movie details
      error: null,  // Error handling
      isAuthenticated: false,  // Check if the user is authenticated
    };
  },
  async mounted() {
    const movieId = this.$route.params.id;
    this.fetchMovieDetails(movieId);
    this.checkAuthentication();  // Check if the user is authenticated
  },
  methods: {
    // Fetch movie details from API
    async fetchMovieDetails(movieId) {
      const apiKey = '6ae5bd9b271bceee451ec5fc107a29da'; 
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

      try {
        const response = await axios.get(url);
        this.movie = response.data; // Store the movie data in the component
      } catch (error) {
        this.error = 'Error fetching movie details. Please try again later.';
      }
    },
    
    // Check if user is authenticated (based on token in localStorage)
    checkAuthentication() {
      const token = localStorage.getItem('token');
      this.isAuthenticated = token ? true : false;
    },
    
    // Add movie to the watchlist
    async addToWatchlist() {
      if (!this.isAuthenticated) {
        this.error = 'You must be signed in to add movies to your watchlist.';
        return;
      }

      const apiUrl = 'http://localhost:8000/watchlist/add/';
      const movieData = {
        tmdb_id: this.movie.id,
        title: this.movie.title,
        poster_path: this.movie.poster_path,
        overview: this.movie.overview,
      };

      try {
        const response = await axios.post(apiUrl, movieData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        alert('Movie added to watchlist!');
      } catch (error) {
        this.error = 'Error adding movie to watchlist. Please try again later.';
      }
    },
  },
};
</script>

<style scoped>
.movie-details-container {
  padding: 20px;
}

.movie-details {
  display: flex;
  margin-top: 20px;
}

.movie-poster {
  width: 300px;
  height: auto;
  margin-right: 20px;
}

.movie-info {
  max-width: 600px;
}

.movie-info p {
  font-size: 1.2rem;
  margin: 10px 0;
}

.movie-info strong {
  font-weight: bold;
}

.watchlist-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 10px;
  border-radius: 5px;
}

.watchlist-button:hover {
  background-color: #45a049;
}
</style>
