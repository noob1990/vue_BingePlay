<template>
  <header class="header">
    <nav class="nav">
      <!-- Logo -->
      <div class="logo">
        <h1>BingePlay</h1>
      </div>

      <!-- Navigation Links -->
      <ul class="nav-links">
        <router-link to="/" class="nav-button">Movies</router-link>
        <router-link to="/watchlist" class="nav-button">My List</router-link>
      </ul>

      <!-- Authentication Links -->
      <div class="auth-links">
        <!-- Show Sign Up and Sign In buttons if not authenticated -->
        <router-link v-if="!isAuthenticated" to="/signup" class="auth-button">Sign Up</router-link>
        <router-link v-if="!isAuthenticated" to="/signin" class="auth-button">Sign In</router-link>

        <!-- Show Sign Out button if authenticated -->
        <button v-if="isAuthenticated" @click="signOut" class="auth-button">Sign Out</button>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isAuthenticated: false, // Set to false initially
    };
  },
  created() {
    // Check localStorage to see if the user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated = true; // If token exists, user is authenticated
    }
  },
  methods: {
    signOut() {
      localStorage.removeItem('token'); // Remove the token from localStorage
      this.isAuthenticated = false; // Set authentication status to false
      this.$router.push('/'); // Redirect to home page after logout
    }
  }
};
</script>

<style scoped>
/* Styles for the header */
.header {
  background-color: #111;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.logo h1 {
  color: #fff;
  font-size: 2rem;
  margin: 0;
}

.nav-links {
  list-style-type: none;
  display: flex;
  gap: 20px;
  margin: 0;
}

.nav-button {
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.3s;
}

.nav-button:hover {
  color: #e74c3c;
}

.auth-links {
  display: flex;
  gap: 10px;
}

.auth-button {
  color: #fff;
  padding: 8px 16px;
  background-color: #4CAF50;
  border-radius: 4px;
  font-size: 1.1rem;
  transition: background-color 0.3s;
  cursor: pointer;
}

.auth-button:hover {
  background-color: #45a049;
}

.auth-button:active {
  background-color: #388e3c;
}
</style>
