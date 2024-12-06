import { createApp } from 'vue';
import App from './App.vue';  // Main App component
import { createRouter, createWebHistory } from 'vue-router';  // Vue Router
import axios from 'axios';  // Axios for HTTP requests
import MoviesPage from './components/MoviesPage.vue';  // Movies list component
import MovieDetails from './components/MovieDetails.vue';  // Movie details component
import SignIn from './components/SignIn.vue';  // Sign-in component
import SignUp from './components/SignUp.vue';  // Sign-up component
import Watchlist from './components/Watchlist.vue';

// Define routes for the application
const routes = [
  { path: '/', component: MoviesPage },
  { path: '/signin', component: SignIn },
  { path: '/signup', component: SignUp },
  { path: '/movie/:id', name: 'MovieDetails', component: MovieDetails, props: true },  // Dynamic route for movie details
  {path: '/watchlist' , component: Watchlist}
];

// Create the Vue app
const app = createApp(App);

// Set axios globally
app.config.globalProperties.$http = axios;

// Create and use the router
const router = createRouter({
  history: createWebHistory(),  // HTML5 history mode for clean URLs
  routes,
});
export default router;
// Use Vue Router
app.use(router);

// Mount the app to the DOM
app.mount('#app');
