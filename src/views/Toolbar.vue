<template>
  <div>
    <v-app-bar color="black" height="70px" app fixed>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link.text"
          :to="link.route"
          class="mx-2"
          :color="link.color"
          rounded="xl"
          variant="text"
        >
          {{ link.text }}
        </v-btn>
      </v-row>
      <v-btn color="error" @click="logout()">ออกจากระบบ</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      User: "",
      User2: "",
      links: [
        { text: "Workshop 1", route: "/about", color: "white" },
        { text: "Workshop 2", route: "/grade", color: "white" },
        { text: "Workshop 3", route: "/shop", color: "white" },
        { text: "Order List", route: "/order", color: "info" },
      ],
    };
  },
  created() {
    this.User = localStorage.getItem("User");
    this.User2 = this.$cookies.get("User");
  },
  methods: {
    async logout() {
      if (confirm("ต้องการออกจากระบบใช่หรือไม่"))
        try {
          const token = localStorage.getItem("user-token");

          await axios.post(
            "http://localhost:3000/users/logout",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          localStorage.removeItem("user-token");
          this.$store.dispatch("logout");
        } catch (error) {
          console.error("Logout failed", error);
          if (error.response) {
            console.log(error.response.data);
            alert(error.response.data.error || "Logout failed");
          }
        }
    },
  },
};
</script>

<style scoped>
.v-main {
  padding-top: 70px;
}
</style>