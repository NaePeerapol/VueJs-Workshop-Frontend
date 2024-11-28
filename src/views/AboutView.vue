<template>
  <v-container fluid class="profile-container">
    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card elevation="10" class="profile-card">
          <v-img src="../assets/black-painted.avif" height="275" class="profile-header-image">
            <v-overlay absolute>
              <div class="text-center">
                <h1 class="text-h3 white--text mb-2">Peerapol Chanviriyapreeda</h1>
                <h2 class="text-subtitle-1 grey--text text--lighten-1">
                  Intern Software Engineer | Full Stack Developer
                </h2>
              </div>
            </v-overlay>
          </v-img>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="4" class="text-center">
                <v-avatar size="250" class="profile-avatar">
                  <img src="../assets/profile_1.png" alt="Profile Picture">
                </v-avatar>
              </v-col>
              <v-col cols="12" md="8">
                <h3 class="text-h5 mb-3 black--text">About Me</h3>
                <v-row>
                  <v-col cols="6">
                    <p class="body-1 black--text">
                      😇 <span class="red--text">ชื่อ:</span> เนเน่ <br>
                      😍 <span class="red--text">วันเกิด:</span> 28 มกราคม 2542 <br>
                      🤩 <span class="red--text">เบอร์โทรศัพท์:</span> 083-082-5043 <br>
                    </p>
                  </v-col>
                  <v-col cols="6">
                    <p class="body-1 black--text">
                      😎 <span class="red--text">งานอดิเรก:</span> ดูหนัง ฟังเพลง เล่นเกม <br>
                      🥳 <span class="red--text">จุดแข็ง:</span> เป็นคนเรียนรู้ได้ไว เวลาจะหยิบจับอะไรแล้วรู้สึกว่าตัวเองเข้าใจและไปได้ไวกว่าคนอื่น <br>

                    </p>
                  </v-col>
                </v-row>

                <v-divider class="my-3"></v-divider>

                <v-row>
                  <v-col cols="6">
                    <v-icon color="primary fs" class="mr-2">mdi-code-tags</v-icon>
                    <strong class="black--text">Skills:</strong>
                    <div class="ml-4 black--text">
                      • Vue.js
                      • Node.js
                      • ExpressJs
                      • MySQL
                      • MongoDB
                      • MariaDB
                      • HTML
                      • CSS
                      • JavaScript
                      • PHP
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <v-icon color="primary fs" class="mr-2">mdi-graduation-cap</v-icon>
                    <strong class="black--text">Education:</strong>
                    <div class="ml-4 black--text">
                      • Bussiness Computer
                      • Kalasin University
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="" outlined class="mr-3 mb-2" @click="modal()">
              <v-icon left>mdi-security</v-icon>
              Social Media
            </v-btn>
            <v-btn color="primary" outlined class="mr-3 mb-2" href="https://github.com/NaePeerapol" target="_blank">
              <v-icon left>mdi-github</v-icon>
              GitHub
            </v-btn>
            <v-btn color="error" class="white--text mr-3 mb-2" href="https://peerapolportfolio.web.app/"
              target="_blank">
              <v-icon left>mdi-web</v-icon>
              My website
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog class="" v-model="dialog" max-width="300px" transition="dialog-transition">
      <v-card class="text-center" >
        <v-card-title primary-title class="modalHeader text-h4 white--text">
          Social Media
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="mb-1">
            <v-col cols="12 mt-3">
              <v-btn color="primary" outlined href="https://www.facebook.com/naeza55" target="_blank">
                <v-icon left>mdi-facebook</v-icon>
                Nae Peerapol
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-btn color="error" outlined href="https://www.instagram.com/nae.peerapol/" target="_blank">
                <v-icon left>mdi-instagram</v-icon>
                nae.peerapol
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'PersonalProfile',
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    modal() {
      this.dialog = true
    }
  }
}
</script>

<style scoped>
.profile-container {
  background-color: #f4f4f4;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.profile-card {
  border-radius: 15px;
  overflow: hidden;
}

.profile-header-image {
  position: relative;
}

.overlay-content {
  position: absolute;
  bottom: 20px;
  left: 20px;
  text-align: left;
}

.profile-avatar {
  border: 5px solid white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modalHeader {
  background-color: black;
  justify-content: center;
}
</style>