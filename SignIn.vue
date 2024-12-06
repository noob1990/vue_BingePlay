<template>
  <div>
    <h2>Sign In</h2>
    <form @submit.prevent="signIn">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Sign In</button>
    </form>

    <div v-if="errorMessage" class="error">
      <p>{{ errorMessage }}</p>
    </div>

    <div v-if="successMessage" class="success">
      <p>{{ successMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async signIn() {
      try {
        const response = await axios.post('http://localhost:8000/signin/', {
          username: this.username,
          password: this.password,
        });
        const token = response.data.access;

        // Store the token in localStorage
        localStorage.setItem('token', token);

        this.successMessage = 'Sign-in successful!';
        this.errorMessage = '';

        // Redirect the user to the homepage
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = error.response.data.error || 'Invalid credentials. Please try again.';
        this.successMessage = '';
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 1.2rem;
  text-align: center;
}

.success {
  color: green;
  font-size: 1.2rem;
  text-align: center;
}
</style>
