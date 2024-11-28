<template>
  <v-container fluid fill-height class="centered-container">
    <v-layout justify-center align-center>
      <v-flex xs12 sm8 md4>
        <v-card elevation="10" class="loginCard">
          <v-card-title class="justify-center headline text-h3 mb-3">
            Vue.Js Workshop
          </v-card-title>

          <v-card-text>
            <v-alert v-if="errorMessage" class="error-message text-center mb-4">
              {{ errorMessage }}
            </v-alert>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="username"
                label="กรุณากรอกชื่อผู้ใช้"
                type="text"
                :rules="userRule"
                required
                outlined
                dense
                :disabled="isLoading"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="กรุณากรอกรหัสผ่าน"
                :type="showPassword ? 'text' : 'password'"
                :rules="Rule"
                required
                outlined
                dense
                :disabled="isLoading"
              ></v-text-field>

              <v-btn
                color="secondary"
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? "Hide" : "Show" }}
              </v-btn>

              <v-checkbox
                label="Remember Me"
                v-model="rememberMe"
                value=""
                :disabled="isLoading"
              ></v-checkbox>

              <v-btn
                color="secondary"
                block
                type="submit"
                large
                :disabled="isLoading"
              >
                {{ isLoading ? "Logging in..." : "เข้าสู่ระบบ" }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
      showPassword: false,
      isLoading: false,
    };
  },
  methods: {
  async handleLogin() {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        {
          username: this.username,
          password: this.password,
          rememberMe: this.rememberMe,
        }
      )

      this.$store.dispatch("setToken", response.data.token)

      this.$router.push("/about")
    } catch (error) {
      this.errorMessage = error.response?.data?.error || "เข้าสู่ระบบไม่สำเร็จ"
    }
  }
},
};
</script>

<style scoped>
.centered-container {
  height: 100vh;
  /* background: linear-gradient(135deg, #d8d8d8 0%, #494949 100%); */
  background: black;
}
.loginCard {
  border-radius: 20px;
  padding: 20px;
}
.error-message {
  margin-top: 15px;
  color: #d63031;
  font-size: 20px;
}
</style>