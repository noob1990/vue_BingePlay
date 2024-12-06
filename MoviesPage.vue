<template>
  <div class="movies-container">
    <h2>Movies</h2>

    <!-- Movies Grid -->
    <div class="movies-grid">
      <div v-for="movie in movies" :key="movie.id" class="movie-card" @click="goToMovieDetails(movie.id)">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt="Movie Poster"
          class="movie-poster"
        />
        <h3 class="movie-title">{{ movie.title }}</h3>
        <p class="movie-overview">{{ movie.overview.substring(0, 100) }}...</p>
      </div>
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-spinner">Loading...</div>

    <!-- Error Message -->
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],      // Store the list of movies
      loading: false,  // Loading state
      error: null      // Error state
    };
  },
  created() {
    this.fetchMovies();  // Fetch movies when the component is created
  },
  methods: {
    // Fetch movies from the API
    async fetchMovies() {
      this.loading = true;
      this.error = null;

      const apiKey = '6ae5bd9b271bceee451ec5fc107a29da'; 
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

      try {
        const response = await axios.get(url);
        this.movies = response.data.results; // Assign the movie data to the movies array
      } catch (err) {
        this.error = 'Error fetching movies. Please try again later.'; // Error handling
      } finally {
        this.loading = false; 
      }
    },

    // Navigate to the movie details page
    goToMovieDetails(movieId) {
      this.$router.push({ name: 'MovieDetails', params: { id: movieId } });
    }
  }
};
</script>

<style scoped>
.movies-container {
  padding: 20px;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.movie-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-poster {
  width: 100%;
  height: auto;
}

.movie-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px;
}

.movie-overview {
  font-size: 0.9rem;
  margin: 0 10px 10px;
  color: #555;
}

.loading-spinner {
  text-align: center;
  font-size: 1.5rem;
  color: #333;
}

.error-message {
  text-align: center;
  font-size: 1.2rem;
  color: red;
}
</style>
