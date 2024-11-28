<template>
  <div class="login-page">
    <div class="login-box">
      <h1>Welcome Back</h1>
      <p>Please login to continue</p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model.trim="username"
            placeholder="Enter your username"
            required
            :disabled="isLoading"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
            :disabled="isLoading"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="toggle-password"
          >
            {{ showPassword ? "Hide" : "Show" }}
          </button>
        </div>

        <div class="form-group remember-me">
          <input
            type="checkbox"
            id="rememberMe"
            v-model="rememberMe"
            :disabled="isLoading"
          />
          <label for="rememberMe">Remember me</label>
        </div>

        <button type="submit" :disabled="isLoading">
          {{ isLoading ? "Logging in..." : "Login" }}
        </button>
      </form>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
      errorMessage: "",
      isLoading: false,
      showPassword: false,
    };
  },
  methods: {
    async handleLogin() {
      if (this.username.length < 3) {
        this.errorMessage = "Username must be at least 3 characters.";
        return;
      }

      if (this.password.length < 6) {
        this.errorMessage = "Password must be at least 6 characters.";
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3000/users/login",
          {
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe,
          },
          {
            timeout: 5000,
          }
        );

        this.$router.push("/about");
        this.$store.dispatch("setToken", response.data.token);
      } catch (error) {
        if (error.response) {
          this.errorMessage =
            error.response.data.error || "An error occurred during login.";
        } else if (error.request) {
          this.errorMessage = "Unable to connect to the server.";
        } else {
          this.errorMessage = "An unexpected error occurred.";
        }
      }
    },
  },
};
</script>

<style scoped>
/* General Styles */
body {
  margin: 0;
  font-family: "Arial", sans-serif;
  background: linear-gradient(135deg, #74b9ff, #0984e3);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #333;
}

/* Login Page */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
}

/* Login Box */
.login-box {
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 30px 20px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #2d3436;
}

p {
  font-size: 14px;
  color: #636e72;
  margin-bottom: 20px;
}

/* Form */
form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-size: 14px;
  color: #2d3436;
  margin-bottom: 5px;
  display: block;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #dfe6e9;
  border-radius: 5px;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #0984e3;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  color: white;
  background: #0984e3;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:disabled {
  background: #b2bec3;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background: #74b9ff;
}

.toggle-password {
  background: none;
  border: none;
  color: #0984e3;
  cursor: pointer;
  font-size: 14px;
  margin-top: 5px;
  text-decoration: underline;
}

.toggle-password:hover {
  color: #74b9ff;
}

/* Remember Me */
.remember-me {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remember-me input {
  margin-right: 10px;
}

/* Error Message */
.error-message {
  margin-top: 15px;
  color: #d63031;
  font-size: 14px;
}
</style>
