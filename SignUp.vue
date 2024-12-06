<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Sign Up</button>
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
      email: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async signUp() {
      try {
        const response = await axios.post('http://localhost:8000/signup/', {
          username: this.username,
          password: this.password,
          email: this.email,
        });

        // If the backend returns a token, store it
        const token = response.data.access;  // Assuming the response contains an 'access' token

        if (token) {
          localStorage.setItem('token', token);
          this.successMessage = 'Sign-up successful! Please log in.';
        } else {
          this.successMessage = 'Sign-up successful!';
        }

        this.errorMessage = '';
      } catch (error) {
        this.errorMessage = error.response.data.error || 'Error signing up. Please try again.';
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
